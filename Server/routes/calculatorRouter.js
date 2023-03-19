import express from 'express';
const calculatorRouter = express.Router();
import apacheIIScoreRouter from '../routes/apacheIIScoreRouter.js';
import simplifiedPesiRouter from '../routes/simplifiedPesiRouter.js';
import roxIndexRouter from '../routes/roxIndexRouter.js';
import sofaScoreRouter from '../routes/sofaScoreRouter.js';
import candidaScoreRouter from '../routes/candidaScoreRouter.js';
import parklandFormulaRouter from '../routes/parklandFormulaRouter.js';

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

// link to sofa score route
calculatorRouter.use("/sofa-score", (req, res, next) => {
    next();
}, sofaScoreRouter);

// link to candida score route
calculatorRouter.use("/candida-score", (req, res, next) => {
    next();
}, candidaScoreRouter);

// link to parkland formula route
calculatorRouter.use("/parkland-formula", (req, res, next) => {
    next();
}, parklandFormulaRouter);


export default calculatorRouter;