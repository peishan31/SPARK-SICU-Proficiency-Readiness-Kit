import express from 'express';
import querystring from 'querystring';
import {MongoClient} from "mongodb";
import path from 'path';
import { pathToFileURL } from 'url';
const camIcuRouter = express.Router();

//TODO:
// @description: Get health status of CAM-ICU route
// @route GET calculator/cam-icu/health


export default camIcuRouter;