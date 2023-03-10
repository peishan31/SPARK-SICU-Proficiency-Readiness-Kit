import express from 'express';
const calculatorRouter = express.Router();
import apacheIIScoreRouter from '../routes/apacheIIScoreRouter.js';
import simplifiedPesiRouter from '../routes/simplifiedPesiRouter.js';
import roxIndexRouter from '../routes/roxIndexRouter.js';

// @description: Get health status of chapter route
// @route GET calculator/health
// Working!
calculatorRouter.get("/health", async (req, res) => {
    try {
        res.send("Calculator Route Healthy")
    } catch (error) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

// link to apache ii score route
calculatorRouter.use("/apache-ii-score", (req, res, next) => {
    next();
}, apacheIIScoreRouter);

// link to simplified PESI route
calculatorRouter.use("/simplified-pesi", (req, res, next) => {
    next();
}, simplifiedPesiRouter);

// link to rox index route
calculatorRouter.use("/rox-index", (req, res, next) => {
    next();
}, roxIndexRouter);


export default calculatorRouter;