import express from 'express';
const calculatorRouter = express.Router();
import apacheIIScoreRouter from '../routes/apacheIIScoreRouter.js';

// @description: Get health status of chapter route
// @route GET chapters/health
// Working!
calculatorRouter.get("/health", async (req, res) => {
    try {
        res.send("Chapter Route Healthy")
    } catch (error) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

// link to subchapter route
calculatorRouter.use("/apache-ii-score", (req, res, next) => {
    next();
}, apacheIIScoreRouter);

export default calculatorRouter;