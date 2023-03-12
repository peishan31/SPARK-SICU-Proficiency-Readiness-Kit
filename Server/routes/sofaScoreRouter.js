import express from 'express';
import querystring from 'querystring';
import {MongoClient} from "mongodb";
import path from 'path';
import { pathToFileURL } from 'url';
const sofaScoreRouter = express.Router();

//TODO:
// @description: Get health status of SOFA score route
// @route GET calculator/sofa-score/health
// Working!
sofaScoreRouter.get("/health", async (req, res) => {
    try {
        res.send("SOFA Score Route Healthy")
    } catch (error) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

// @description: Calculate SOFA Score
// @route GET calculator/sofa-score/
// Working!
sofaScoreRouter.get("/", async (req, res) => {
    console.log(`Calculating SOFA score...`)
    try {
        const { PaO, FiO, onMechanicalVentilation, platelets, GCS, bilirubin
            , meanArteriaPressureOrAdministrationOfVasoactiveAgents, creatinine } = req.body;

        var pointAllocated = 0;

        //calculations for PaO/FiO
        const targetVar = (PaO / FiO) * 100
        if (targetVar >= 300 && targetVar <= 399){
            pointAllocated += 1;
        }else if (targetVar >= 200 && targetVar <= 299){
            pointAllocated += 2;
        }else if (targetVar <= 199 && onMechanicalVentilation == 'No'){
            pointAllocated += 2;
        }else if (targetVar >= 100 && targetVar <= 199 && onMechanicalVentilation == 'Yes'){
            pointAllocated += 3;
        }else if (targetVar < 100 && onMechanicalVentilation == 'Yes'){
            pointAllocated += 4;
        }

        //calculations for platelets (×10³/µL)
        if (platelets == '<20'){
            pointAllocated += 4;
        }else if (platelets == '20-49'){
            pointAllocated += 3;
        }else if (platelets == '50-99'){
            pointAllocated += 2;
        }else if (platelets == '100-149'){
            pointAllocated += 1;
        }

        //calculations for Glasgow Coma Scale
        if (GCS == '<6'){
            pointAllocated += 4;
        }else if (GCS == '6-9'){
            pointAllocated += 3;
        }else if (GCS == '10-12'){
            pointAllocated += 2;
        }else if (GCS == '13-14'){
            pointAllocated += 1;
        }

        //calculations for bilirubin (mg/dL (μmol/L))
        if (bilirubin == '1.2–1.9 (20-32)'){
            pointAllocated += 1;
        }else if (bilirubin == '2.0–5.9 (33-101)'){
            pointAllocated += 2;
        }else if (bilirubin == '6.0–11.9 (102-204)'){
            pointAllocated += 3;
        }else if (bilirubin == '≥12.0 (>204)'){
            pointAllocated += 4;
        }

        //calculations for Mean arterial pressure OR administration of vasoactive agents required (listed doses are in units of mcg/kg/min)
        if (meanArteriaPressureOrAdministrationOfVasoactiveAgents == 'MAP <70 mmHg'){
            pointAllocated += 1;
        }else if (meanArteriaPressureOrAdministrationOfVasoactiveAgents == 'DOPamine ≤5 or DOBUTamine (any dose)'){
            pointAllocated += 2;
        }else if (meanArteriaPressureOrAdministrationOfVasoactiveAgents == 'DOPamine >5, EPINEPHrine ≤0.1, or norEPINEPHrine ≤0.1'){
            pointAllocated += 3;
        }else if (meanArteriaPressureOrAdministrationOfVasoactiveAgents == 'DOPamine >15, EPINEPHrine >0.1, or norEPINEPHrine >0.1'){
            pointAllocated += 4;
        }

        //calculations for creatinine, mg/dL (μmol/L) (or urine output)
        if (creatinine == '1.2–1.9 (110-170)'){
            pointAllocated += 1;
        }else if (creatinine == '2.0–3.4 (171-299)'){
            pointAllocated += 2;
        }else if (creatinine == '3.5–4.9 (300-440) or UOP <500 mL/day'){
            pointAllocated += 3;
        }else if (creatinine == '≥5.0 (>440) or UOP <200 mL/day'){
            pointAllocated += 4;
        }

        //results
        var result = "";

        if (pointAllocated >= 0 && pointAllocated <= 1){
            result = {sofaScore: '0-1', morality: '0.0%'}            
        }else if (pointAllocated >= 2 && pointAllocated <= 3){
            result = {sofaScore: '2-3', morality: '6.4%'}            
        }else if (pointAllocated >= 4 && pointAllocated <= 5){
            result = {sofaScore: '5-5', morality: '20.2%'}            
        }else if (pointAllocated >= 6 && pointAllocated <= 7){
            result = {sofaScore: '6-7', morality: '21.5%'}            
        }else if (pointAllocated >= 8 && pointAllocated <= 9){
            result = {sofaScore: '8-9', morality: '33.3%'}            
        }else if (pointAllocated >= 10 && pointAllocated <= 11){
            result = {sofaScore: '10-11', morality: '50.0%'}            
        }else if (pointAllocated >= 12){
            result = {sofaScore: '≥12', morality: '≥95.2%'}            
        }

        res.status(200).json( {"pointAllocated" : pointAllocated, result})
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

export default sofaScoreRouter;