import express from 'express';
import User from '../models/UserModel.js';
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
/*
bookmarkRouter.get("/", async (req, res) => {
    console.log(`Get all bookmark details for user ${req.userId}`)
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        const bookmarks = user.bookmarks;
        console.log(bookmarks)
        res.status(200).json(bookmarks)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});
*/
/*
const transactions = await Transactions.find({
  user: req.user._id,
  "transactions._id": req.params._id
});
*/


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