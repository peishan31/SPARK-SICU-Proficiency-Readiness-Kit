import express from 'express';
import querystring from 'querystring';
import {MongoClient} from "mongodb";
import path from 'path';
import { pathToFileURL } from 'url';
const camIcuRouter = express.Router();

//TODO:
// @description: Get health status of CAM-ICU route
// @route GET calculator/cam-icu/health
camIcuRouter.get("/health", async (req, res) => {
    try {
        res.send("CAM-ICU Route Healthy")
    } catch (error) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

// @description: Calculate CAM-ICU Scoer
// @route POST calculator/cam-icu/
// Working!
camIcuRouter.post("/", async (req, res) => {
    console.log(`Calculating CAM-ICU score...`)
    try {
        const { rass, acuteOnset, fluctuatingCourse, inattention, levelOfConsciousness, disorganizedThinking } = req.body;
        
        //results
        var result = "";
        var interpretation = "";

        if (rass == "no"){
            result = "Too sedated"
            interpretation = "Patient is too sedated. Complete CAM-ICU at a later time."
        }else{
            if (rass == "yes" && (acuteOnset == "yes" || fluctuatingCourse == "yes") && inattention == "yes" && (levelOfConsciousness == "yes" || disorganizedThinking == "yes")){
                result = "Positive"
                interpretation = "CAM-ICU positive. Delirium present."
            }else{
                result = "Negative"
                interpretation = "CAM-ICU negative. Delirium absent."
            }
        }

        res.status(200).json( {"result" : result, "interpretation": interpretation})
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

export default camIcuRouter;