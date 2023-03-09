import express from 'express';
import Calculators from '../models/calculatorRouter.js';
import User from '../models/UserModel.js';
import Chapter from '../models/ChapterModel.js';
import Subchapter from '../models/SubchapterModel.js';
import querystring from 'querystring';
import {MongoClient} from "mongodb";
const apacheIIScoreRouter = express.Router();

//TODO:
// @description: Get health status of bookmark route
// @route GET chapter/:chapterId/subchapter/health
// Working!
apacheIIScoreRouter.get("/health", async (req, res) => {
    try {
        res.send("Bookmark Route Healthy")
    } catch (error) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

export default apacheIIScoreRouter;