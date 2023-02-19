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

// @description: Get all bookmarked subchapters for a user by userId
// @route GET user/:userId/bookmarks/
// Working!
bookmarkRouter.get("/", async (req, res) => {
    console.log(`Get all bookmarked subchapters for user ${req.userId}`)
    // TODO: Reoptimize this to make less API calls for each bookmarked subchapter
    try {
        //get user details
        const userId = req.userId;
        const user = await User.findById(userId);
        
        //get user's bookmark 
        const bookmarkedSubchapters = user.bookmarks;

        //get entire chapters details
        const chapters = await Chapter.find()

        //to store end result
        var temp = [];

        //to get subchapter & chapter details using the subchapterId in bookmark array
        if (bookmarkedSubchapters.length > 0) { 
            async function updateData(){
                for (let index = 0; index < bookmarkedSubchapters.length; index++) {
                    
                    //the current ids for each bookmark
                    let bookmarkSubchapterId = bookmarkedSubchapters[index].subchapterId;
                    let bookmarkChapterId = bookmarkedSubchapters[index].chapterId;
        
                    //find the chapter & subchapter it belongs to 
                    const chapter = await Chapter.findById(bookmarkChapterId);
                    const subchapters = chapter.subchapters;

                    //populate the json objects
                    let subchapterResult = subchapters
                    .filter(subchapter => subchapter._id == bookmarkSubchapterId)
                    .map((finalResult) => {
                        return {
                            ...finalResult._doc,
                            "bookmarkId": bookmarkedSubchapters[index]._id,
                            "chapterId" : bookmarkChapterId,
                            "chapterIcon": chapter.chapterIcon,
                            "chapterTitle": chapter.title,
                        }
                    })
                    temp.push(subchapterResult[0]);
               }
            }
            
            await updateData();
        }
        //return res.status(404).json({ msg: 'No bookmarks found' });
        res.status(200).json(temp);
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

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

        //store the chapter details to return
        result = await Chapter.find( { _id: chapterId }, { _id: 1, title: 1, chapterIcon: 1, description: 1 } );
        
        subchapters.forEach(subchapter => {

            // store result variables 
            var isBookmarked = false;
            var bookmarkId = "";

            //check if the subchapter exists in the user bookmark list. If yes, store the details to return
            for (let i = 0; i < bookmarks.length; i++) {
                if(subchapter._id == bookmarks[i].subchapterId && bookmarks[i].chapterId == chapterId ){
                    isBookmarked = true
                    bookmarkId = bookmarks[i]._id;
                }
            }

            //temp variable to store the subchapter details + populate another field 
            //if the subchapter exists in the user bookmark list
            var temp = JSON.parse(JSON.stringify(subchapter));
            temp.isBookmarked = isBookmarked

            //if bookmarkId not empty, it means the subchapter exists in the chapter. store the bookmarkid to return
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

export default bookmarkRouter;