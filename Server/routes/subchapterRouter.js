import express from 'express';
import Chapter from '../models/ChapterModel.js';
import querystring from 'querystring';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
const subchapterRouter = express.Router();

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

// @description: Add subchapter to chapter by chapter Id
// @route PUT chapter/:chapterId/subchapter/
// Working!
subchapterRouter.put("/", async (req, res) => {

    try {
        let { subchapterTitle, thumbnail, description, content } = req.body;
        // upload image to cloudinary then get the url and save it to the database
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload(thumbnail, opts, async (err, result) => {
                if (err) {
                    reject(false);
                } else {
                    resolve(result);
                }
            })
        }); 
        console.log("********",result);
        if (result == false)  {
            return res.status(500).json({ msg: 'Error uploading image to cloudinary' });
        }
        thumbnail = result.secure_url;
        const thumbnailPublicId = result.public_id;
        // Save subchapter to database
        const newSubchapter = {
            subchapterTitle,
            thumbnailPublicId,
            thumbnail,
            description,
            content
        }
        console.log("********",newSubchapter);        
        const chapterId = req.chapterId;
        const chapter = await Chapter.findByIdAndUpdate(
            { _id: chapterId },
            { $push: { subchapters: newSubchapter } },
        );
        return res.status(200).json(chapter)
    } catch (err) {
        console.error(err.message)
        return res.status(500).send('Server Error')
    }
});

// @description: Delete subchapter by subchapterId in chapter by chapter Id
// @route DELETE chapter/:chapterId/subchapter/:subchapterId
// Working!
subchapterRouter.delete("/:subchapterId", async (req, res) => {
    try {
        const chapterId = req.chapterId;
        const subchapterId = req.params.subchapterId;
        // Get the public ID of the image to delete from the request parameters to delete image from cloudinary
        let chapter = await Chapter.findById(chapterId);
        const publicId = chapter.subchapters.find(subchapter => subchapter._id == subchapterId).thumbnailPublicId;
        // TODO: delete this. Temp solution
        if (publicId != undefined) {
            // Delete the image from Cloudinary
            const deleteResult = await cloudinary.uploader.destroy(publicId);
            // Return a success response
            console.log(deleteResult); // TODO: Do a validation for this response
        }
        chapter = await Chapter.findByIdAndUpdate(
            { _id: chapterId },
            { $pull: { subchapters: { _id: subchapterId } } },
        );
        res.status(200).json(chapter)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});




export default subchapterRouter;