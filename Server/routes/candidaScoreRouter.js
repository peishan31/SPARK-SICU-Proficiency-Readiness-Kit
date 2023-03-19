import express from 'express';
import querystring from 'querystring';
import {MongoClient} from "mongodb";
import path from 'path';
import { pathToFileURL } from 'url';
const candidaScoreRouter = express.Router();

//TODO:
// @description: Get health status of Candida score route
// @route GET calculator/candida-score/health


export default candidaScoreRouter;