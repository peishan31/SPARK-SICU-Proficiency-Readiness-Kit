import express from 'express';
import querystring from 'querystring';
import {MongoClient} from "mongodb";
const parklandFormulaRouter = express.Router();

//TODO:
// @description: Get health status of Parkland Formula route
// @route GET calculator/parkland-formula/health
parklandFormulaRouter.get("/health", async (req, res) => {
    try {
        res.send("Parkland Formula Route Healthy")
    } catch (error) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

// @description: Calculate Parkland Formula for Burns
// @route POST calculator/parkland-formula/
// Working!
parklandFormulaRouter.post("/", async (req, res) => {
    console.log(`Calculating Parkland Burn score...`)
    try {
        const { weight, bodyBurnPercentage } = req.body;
        const valueForCalculation = 4/1000;

        var totalFluidRequirement = weight * bodyBurnPercentage * valueForCalculation
    
        var pointAllocated = Math.round(totalFluidRequirement * 10) / 10;
        var halfTotalFluidRequirement = Math.round(totalFluidRequirement/2 * 10) / 10

        //results
        var result = ""
        result = {interpretation: pointAllocated + 'L Fluid requirements for the 1st 24 hours from time of burn; ' + halfTotalFluidRequirement + "L Fluid requirements for the 1st 8 hours (1/2 of Total) from time of burn"}
        res.status(200).json( {"totalFluid" : pointAllocated, "halfFluid" : halfTotalFluidRequirement, result})
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

export default parklandFormulaRouter;