import express from 'express';
import querystring from 'querystring';
import {MongoClient} from "mongodb";
const roxIndexRouter = express.Router();

//TODO:
// @description: Get health status of rox index route
// @route GET calculator/rox-index/health
// Working!
roxIndexRouter.get("/health", async (req, res) => {
    try {
        res.send("Simplified ROX Index Healthy")
    } catch (error) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

// @description: Calculate ROX Index
// @route POST calculator/rox-index/
// Working!
roxIndexRouter.post("/", async (req, res) => {
    console.log(`Calculating ROX Index score...`)
    try {
        const { SpO, FiO, respiratoryRate } = req.body;

        var pointAllocated = (Math.round(((SpO/FiO/respiratoryRate) * 100) * 100) / 100).toFixed(2);

        //results
        var result = "";

        if (pointAllocated >= 4.88){
            result = {interpretation: 'Low risk of progressing to intubation'}            
        }else if (pointAllocated >= 3.85 && pointAllocated < 4.88){
            result = {interpretation: 'Patient should be reassessed within 2 hours and the index re-calculated'}            
        }else{
            result = {interpretation: 'Risk of HFNC failure is high; intubation should be considered'}            
        }

        res.status(200).json( {"pointAllocated" : pointAllocated, result})
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

export default roxIndexRouter;