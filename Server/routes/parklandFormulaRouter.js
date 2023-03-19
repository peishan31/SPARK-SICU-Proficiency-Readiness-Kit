import express from 'express';
import querystring from 'querystring';
import {MongoClient} from "mongodb";
import path from 'path';
import { pathToFileURL } from 'url';
const parklandFormulaRouter = express.Router();

//TODO:
// @description: Get health status of Parkland Formula route
// @route GET calculator/parkland-formula/health


export default parklandFormulaRouter;