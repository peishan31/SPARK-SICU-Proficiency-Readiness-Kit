import express from 'express';
import querystring from 'querystring';
import {MongoClient} from "mongodb";
const simplifiedPesiRouter = express.Router();

//TODO:
// @description: Get health status of apache ii route
// @route GET calculator/simplified-pesi/health
// Working!
simplifiedPesiRouter.get("/health", async (req, res) => {
    try {
        res.send("Simplified PESI Route Healthy")
    } catch (error) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

// @description: Calculate Simplified PESI Score
// @route GET calculator/simplified-pesi/
// Working!
simplifiedPesiRouter.get("/", async (req, res) => {
    console.log(`Calculating simplifed PESI score...`)
    try {
        const { age, cancerHistory, chronicCardiopulmonaryHistory, heartrate, systolicBp, oxygenSaturation } = req.body;

        var pointAllocated = 0;

        //calculations for age 
        if (age > 80){
            pointAllocated += 1;
        }

        //calculations for history of cancer
        if (cancerHistory == 'Yes'){
            pointAllocated += 1;
        }

        //calculations for chronic Cardiopulmonary History
        if (chronicCardiopulmonaryHistory == 'Yes'){
            pointAllocated += 1;
        }

        //calculations for heart rate
        if (heartrate >= 110){
            pointAllocated += 1;
        }

        //calculations for systolic BP (mmHG)
        if (systolicBp < 100){
            pointAllocated += 1;
        }

        //calculations for oxygen saturation
        if (oxygenSaturation < 90){
            pointAllocated += 1;
        }

        //results
        var result = "";

        if (pointAllocated >= 1){
            result = {riskGroup: 'High', interpretation: '8.9% risk of death'}            
        }else{
            result = {riskGroup: 'Low', interpretation: '1.1% risk of death, with 1.5% having recurrent thromboembolism or non-fatal bleeding'}            
        }

        res.status(200).json( {"pointAllocated" : pointAllocated, result})
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

export default simplifiedPesiRouter;