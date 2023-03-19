import express from 'express';
import querystring from 'querystring';
import {MongoClient} from "mongodb";
const candidaScoreRouter = express.Router();

//TODO:
// @description: Get health status of Candida score route
// @route GET calculator/candida-score/health


//TODO:
// @description: Get health status of candida score route
// @route GET calculator/candida-score/health
// Working!
candidaScoreRouter.get("/health", async (req, res) => {
    try {
        res.send("Candida Score Route Healthy")
    } catch (error) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

// @description: Calculate Candida Score
// @route POST calculator/candida-score/
// Working!
candidaScoreRouter.post("/", async (req, res) => {
    console.log(`Calculating Candida score...`)
    try {
        const { severeSepsis, totalParenteralNutrition, initialSurgery, multifocalCandidaColonization } = req.body;
        var pointAllocated = parseInt(severeSepsis) + parseInt(totalParenteralNutrition) + parseInt(initialSurgery) + parseInt(multifocalCandidaColonization);

        //results
        var result = "";
        var riskPercentage = 0

        if (pointAllocated == 3){
            riskPercentage = 8.5
        }else if (pointAllocated == 4){
            riskPercentage = 16.8
        }else if (pointAllocated == 5){
            riskPercentage = 23.6
        }

        if (pointAllocated < 3){
            result = {interpretation: '2.3% Risk of invasive candidiasis without treatment'}            
        }else if (pointAllocated >=3){
            result = {interpretation: riskPercentage + '% Risk of invasive candidiasis without treatment'}            
        }

        res.status(200).json( {"pointAllocated" : pointAllocated, result})
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

export default candidaScoreRouter;