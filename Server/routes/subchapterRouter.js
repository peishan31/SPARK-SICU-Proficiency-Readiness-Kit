import express from 'express';
import Chapter from '../models/ChapterModel.js';
import User from '../models/UserModel.js';
import querystring from 'querystring';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
const subchapterRouter = express.Router();
import jwt_decode from 'jwt-decode';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: 'auto',
}

// @description: Get health status of subchapter chapter route
// @route GET chapter/:chapterId/subchapter/health
// Working!
subchapterRouter.get("/health", async (req, res) => {
    try {
        res.send("Subhapter Route Healthy")
    } catch (error) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

// @description: Get get all subchapters for a chapter by chapterId
// @route GET chapter/:chapterId/subchapter/
// Working!
subchapterRouter.get("/", async (req, res) => {
    try {
        const chapterId = req.chapterId;
        const chapter = await Chapter.findById(chapterId);
        const subchapters = chapter.subchapters;
        // console.log(subchapters)
        res.status(200).json(subchapters)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

// @description: Get subchapter by subchapter title
// @route GET chapter/:chapterId/subchapter/:subchapterTitle
// Working!
subchapterRouter.get('/:subchapterId', async (req, res) => {
    try {
        const chapterId = req.chapterId;
        const subchapterId = req.params.subchapterId;
        const chapter = await Chapter.findById(chapterId);
        const subchapters = chapter.subchapters;
        
        const subchapterResult = subchapters
        .filter(subchapter => subchapter._id == subchapterId)
        .map((finalResult) => {
            return {
                ...finalResult._doc,
                "chapterId": chapter._id,
                "chapterIcon": chapter.chapterIcon,
                "chapterTitle": chapter.title,
            }
        })
        
        if (subchapterResult.length > 0) { 
            return res.status(200).json(subchapterResult[0]);
        }
        return res.status(404).json({ msg: 'Subchapter not found' });
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

const checkAdmin = function (req, res, next) {
    let token = req.cookies['session-token'];
    let decoded = jwt_decode(token);
    let id = decoded['sub'];
        
    const currentUser = User.findOne({googleId: id}, 
        function (err, obj) {
            if (err) {
                console.error(err.message)
                return res.status(500).send('Server Error')
            }

            if (obj.userType != "senior") {
                console.log("Unauthorized")
                return res.status(401).send("Unauthorized");
            } else {
                return next()
            }
        });
}

// @description: Add subchapter to chapter by chapter Id
// @route PUT chapter/:chapterId/subchapter/
// Working!
subchapterRouter.put("/", async (req, res) => {
    console.log("add subchapter")
    try {
        let { subchapterTitle, thumbnail, content, lastModifiedUserID } = req.body;

        if (subchapterTitle.length === 0 || subchapterTitle == undefined || subchapterTitle == "" || 
            thumbnail.length===0 || thumbnail == undefined || thumbnail == "" ||  
            content.length===0 || content == undefined || content == "") { 
                return res.status(404).json({ msg: 'Fields cannot be empty' })
        }
        // upload image to cloudinary then get the url and save it to the database
        const addImageResult = await addImage(thumbnail);

        if (addImageResult == false)  {
            return res.status(500).json({ msg: 'Error uploading image to cloudinary. Please choose another image or try again.' });
        }

        thumbnail = addImageResult.thumbnail;
        const thumbnailPublicId = addImageResult.thumbnailPublicId;

        const date = new Date();
        const lastModifiedDateTime = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
        let lastModifiedUsername = await User.findOne({googleId: lastModifiedUserID}).then(user => ({name: user.name}));
        lastModifiedUsername = lastModifiedUsername.name;
        // Save subchapter to database
        const newSubchapter = {
            subchapterTitle,
            thumbnailPublicId,
            thumbnail,
            content,
            lastModifiedDateTime,
            lastModifiedUserID,
            lastModifiedUsername
        }
        console.log("********",newSubchapter);        
        const chapterId = req.chapterId;
        let chapter = await Chapter.findByIdAndUpdate(
            { _id: chapterId },
            { $push: { subchapters: newSubchapter } },
        );

        // get latest subchapter id by running chapter again because the previous one is not updated
        chapter = await Chapter.findById(chapterId);
        const subchapterId = chapter.subchapters[chapter.subchapters.length - 1]._id;
        return res.status(200).json(subchapterId)
    } catch (err) {
        console.error(err.message)
        return res.status(500).send('Server Error')
    }
});

// @description: Edit subchapter to chapter by chapter Id
// @route PUT chapter/:chapterId/subchapter/
// Working!
subchapterRouter.put("/:subchapterId", async (req, res) => {
    console.log("edit subchapter")
    try {

        const chapterId = req.chapterId;
        let subchapterId = req.params.subchapterId;

        if (!chapterId || !subchapterId) { 
            return res.status(404).json({ msg: 'Missing chapter and/or subchapter id' });
        }
        
        let { subchapterTitle, thumbnail, content, selectedChapter, lastModifiedUserID} = req.body;
        // let token = req.cookies['session-token'];
        // let decoded = jwt_decode(token);
        // let lastModifiedUserID = decoded['sub'];
        // console.log("lastModifiedUserID", token);
        
        let thumbnailPublicId = "";

        // edit subchapter
        if (subchapterTitle.length === 0 || subchapterTitle == undefined || subchapterTitle == "" || 
            content.length===0 || content == undefined || content == "") { 
                return res.status(404).json({ msg: 'Fields cannot be empty' })
        }
        // upload image to cloudinary then get the url and save it to the database
        if (thumbnail != "") {
            await deleteImage(chapterId, subchapterId);
            const addImageResult = await addImage(thumbnail);

            if (addImageResult == false)  {
                return res.status(500).json({ msg: 'Error uploading image to cloudinary. Please choose another image or try again.' });
            }
            thumbnail = addImageResult.thumbnail;
            thumbnailPublicId = addImageResult.thumbnailPublicId;
        } else { // if no image is uploaded, get the old image from the database
            let chapter = await Chapter.findById(chapterId);
            thumbnail = chapter.subchapters.find(subchapter => subchapter._id == subchapterId).thumbnail;
            thumbnailPublicId = chapter.subchapters.find(subchapter => subchapter._id == subchapterId).thumbnailPublicId;
        }        
        
        // const date = new Date();
        // const lastModifiedDateTime = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

        // const date = new Date();
        // const timeZone = 'Asia/Singapore'; // Change this to the appropriate timezone
        // const lastModifiedDateTime = date.toLocaleString('en-US', { timeZone });

        const date = new Date();
        const timeZoneOffset = 8; // Singapore timezone offset is UTC+8
        const timeZoneOffsetInMs = timeZoneOffset * 60 * 60 * 1000;
        const lastModifiedDateTime = new Date(date.getTime() + timeZoneOffsetInMs).toLocaleString('en-US', { timeZone: 'Asia/Singapore' });


        let lastModifiedUsername = await User.findOne({googleId: lastModifiedUserID}).then(user => ({name: user.name}));
        lastModifiedUsername = lastModifiedUsername.name;
        // Save subchapter to database
        const updatedSubchapter = {
            subchapterTitle,
            thumbnailPublicId,
            thumbnail,
            content,
            lastModifiedDateTime,
            lastModifiedUserID,
            lastModifiedUsername
        }
        console.log("********",updatedSubchapter);      
        
        
        const users = await User.find()

        users.forEach(user => {
            User.findOneAndUpdate(
                { googleId: user.googleId },
                { $pull: { bookmarks: { subchapterId: subchapterId } } }
            );
        })

        // delete old subchapter and add new subchapter
        await Chapter.findByIdAndUpdate(
            { _id: chapterId },
            { $pull: { subchapters: { _id: subchapterId } } },
            { new: true }
        );
        
        await Chapter.findByIdAndUpdate(
            { _id: selectedChapter }, // this is the one from dropdown
            { $push: { subchapters: updatedSubchapter } },
            { new: true }
        );

        // get latest subchapter id by running chapter again because the previous one is not updated
        let chapter = await Chapter.findById(selectedChapter);
        // subchapterId = chapter.subchapters[chapter.subchapters.length - 1]._id;
        // await Chapter.findOneAndUpdate(
        //     { _id: chapterId, "subchapters._id": subchapterId },
        //     { $set: { "subchapters.$": updatedSubchapter },},
        //     { new: true }
        // );
        subchapterId = chapter.subchapters[chapter.subchapters.length - 1]._id;
        
        return res.status(200).json(subchapterId);
    } catch (err) {
        console.error(err.message)
        return res.status(500).send('Server Error')
    }
});

// @description: Delete subchapter by subchapterId in chapter by chapter Id
// @route DELETE chapter/:chapterId/subchapter/:subchapterId
// Working!
subchapterRouter.delete("/:subchapterId", async (req, res) => {
    console.log("delete subchapter")
    try {
        const chapterId = req.chapterId;
        const subchapterId = req.params.subchapterId;
        
        if (!chapterId || !subchapterId) { 
            return res.status(404).json({ msg: 'Missing chapter and/or subchapter id' });
        }

        await deleteImage(chapterId, subchapterId);

        const users = await User.find()

        const promises = users.map(async (user) => {
            // For each user, remove the bookmark that has the given subchapterId
            await User.findOneAndUpdate(
              { googleId: user.googleId, bookmarks: { $elemMatch: { subchapterId } } },
              { $pull: { bookmarks: { subchapterId: subchapterId } } },
              { new: true } 
            );
          });
        await Promise.all(promises); // Wait for all updates to finish

        const chapter = await Chapter.findByIdAndUpdate(
            { _id: chapterId },
            { $pull: { subchapters: { _id: subchapterId } } },
            { new: true }
        );
        res.status(200).json(chapter)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

async function deleteImage(chapterId, subchapterId) {
    
    // Get the public ID of the image to delete from the request parameters to delete image from cloudinary
    let chapter = await Chapter.findById(chapterId);
    const subchapter = chapter.subchapters.find(subchapter => subchapter._id == subchapterId);
    
    if (subchapter == undefined) {
        return;
    }
    const publicId = subchapter.thumbnailPublicId;

    if (publicId != undefined || publicId != "" || publicId.length > 0) {
        // Delete the image from Cloudinary
        const deleteResult = await cloudinary.uploader.destroy(publicId);
        // Return a success response
        console.log(deleteResult); 
    }
}

async function addImage(thumbnail) {
    // upload image to cloudinary then get the url and save it to the database
    const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(thumbnail, opts, async (err, result) => {
            if (err) {
                reject(false)
            } else {
                resolve(result)
            }
        })
    }); 
    console.log("result cloudinary upload", result)
    if (result == false)  {
        //return res.status(500).json({ msg: 'Error uploading image to cloudinary. Please choose another image or try again.' });
        return;
    }

    return {
        thumbnail: result.secure_url,
        thumbnailPublicId: result.public_id
    }
}

export default subchapterRouter;