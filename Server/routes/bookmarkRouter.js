import express from 'express';
import User from '../models/UserModel.js';
import Chapter from '../models/ChapterModel.js';
import Subchapter from '../models/SubchapterModel.js';
import querystring from 'querystring';
import {MongoClient} from "mongodb";
const bookmarkRouter = express.Router();

//TODO:
// @description: Get health status of bookmark route
// @route GET chapter/:chapterId/subchapter/health
// Working!
bookmarkRouter.get("/health", async (req, res) => {
    try {
        res.send("Bookmark Route Healthy")
    } catch (error) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});


// @description: Get all subchapter bookmark details for a chapter by chapterId and a specific user by userId
// @route GET user/:userId/bookmarks/
// Working!
// bookmarkRouter.get("/", async (req, res) => {
//     console.log(`Get all bookmark details for user ${req.userId}`)
//     try {
//         const userId = req.userId;
//         const user = await User.findById(userId);
//         const bookmarks = user.bookmarks;


//         const chapter = await Chapter.findById(chapterId);
//         const subchapters = chapter.subchapters;

//         let ids = ['63ea36a56c0ef100ca017649', '63ea35d26c0ef100ca017647'];
//         // let data = await Chapter.find({
//         // '_id': { 
//         //     $in: ids
//         // }
//         // });


//         console.log(data)
//         res.status(200).json(data)
//     } catch (err) {
//         console.error(err.message)
//         res.status(500).send('Server Error')
//     }
// });




// @description: Get all subchapters of a specified chapter for a user by userId
// @route GET user/:userId/bookmarks/chapters/:chapterId
// Working!

bookmarkRouter.get("/chapters/:chapterId", async (req, res) => {
    console.log(`Get all subchapters of a specified chapter ${req.params.chapterId} for a user by userId ${req.userId}`)
    try {

        //get request parameters
        const chapterId = req.params.chapterId;
        const userId = req.userId;

        //get user's bookmarks
        const user = await User.findById(userId);
        const bookmarks = user.bookmarks;

        // get all the chapter's subchapters
        const chapter = await Chapter.findById(chapterId);
        const subchapters = chapter.subchapters;

        // store end result variables 
        var result = {};
        var book = [];

        result = await Chapter.find( { _id: chapterId }, { _id: 1, title: 1, chapterIcon: 1, description: 1 } );
        
        subchapters.forEach(subchapter => {
            var isBookmarked = false;
            var bookmarkId = "";

            for (let i = 0; i < bookmarks.length; i++) {
                
                if(subchapter._id == bookmarks[i].subchapterId && bookmarks[i].chapterId == chapterId ){
                    isBookmarked = true
                    bookmarkId = bookmarks[i]._id;
                }
            }
            var temp = JSON.parse(JSON.stringify(subchapter));
            temp.isBookmarked = isBookmarked
            if (bookmarkId){
               temp.bookmarkId  =  bookmarkId;
            }
            
            book.push(temp);
        });
        result.push({"subchapters" : book});
        
        res.status(200).json(result)     

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});



// @description: Add bookmark details to user by user Id
// @route PUT user/:userId/subchapter/
// Working!
bookmarkRouter.put("/", async (req, res) => {
    console.log(`Add bookmarked details to user ${req.userId}`)
    try {
        const { subchapterId, chapterId } = req.body;
        const newBookmark = {
            subchapterId,
            chapterId
        }

        const userId = req.userId;
        const user = await User.findByIdAndUpdate(
            { _id: userId },
            { $push: { bookmarks: newBookmark } },
        );
        res.status(200).json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

// @description: Delete bookmark by bookmark Id & user Id
// @route DELETE user/:userId/bookmark/:bookmarkId
// Working!
bookmarkRouter.delete("/:bookmarkId", async (req, res) => {
    console.log(`Delete bookmark by bookmark Id ${req.params.bookmarkId}`)
    try {
        const userId = req.userId;
        const bookmarkId = req.params.bookmarkId;
        const user = await User.findByIdAndUpdate(
            { _id: userId },
            { $pull: { bookmarks: { _id: bookmarkId } } }
        );
        res.status(200).json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

/*
// @description: Get get all bookmarked subchapters for a user by userId
// @route GET user/:userId/subchapter/
// Working!
bookmarkRouter.get("/", async (req, res) => {
    console.log(`Get all bookmarked subchapters for user ${req.userId}`)
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        const subchapters = user.subchapters;
        console.log(subchapters)
        res.status(200).json(subchapters)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

// @description: Add bookmarked subchapter to user by user Id
// @route PUT user/:userId/subchapter/
// Working!
bookmarkRouter.put("/", async (req, res) => {
    console.log(`Add bookmarked subchapter to user ${req.userId}`)
    try {
        const { _id, subchapterTitle, description, content } = req.body;
        const newSubchapter = {
            _id,
            subchapterTitle,
            description,
            content
        }

        const userId = req.userId;
        const user = await User.findByIdAndUpdate(
            { _id: userId },
            { $push: { subchapters: newSubchapter } },
        );
        res.status(200).json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});
*/
export default bookmarkRouter;