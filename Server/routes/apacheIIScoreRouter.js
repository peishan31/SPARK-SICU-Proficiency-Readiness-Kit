import express from 'express';
import querystring from 'querystring';
import {MongoClient} from "mongodb";
const apacheIIScoreRouter = express.Router();

//TODO:
// @description: Get health status of apache ii route
// @route GET calculator/apache-ii-score/health
// Working!
apacheIIScoreRouter.get("/health", async (req, res) => {
    try {
        res.send("Apache II Score Route Healthy")
    } catch (error) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

// @description: Calculate Apache II Score
// @route GET calculator/apache-ii-score/
// Working!
apacheIIScoreRouter.post("/", async (req, res) => {
    console.log(`Calculating apache ii score...`)
    try {
        var pointAllocated = 0;
        const { cancerHistory, typeOfSurgery, age, temperature, meanArterialPressure, pH, heartrate
            , respiratoryRate, sodium, potassium, creatinine, acuteRenalFailure, hematocrit, whiteBloodCell
            ,gcs, fio, pao, aaGradient} = req.body;
            
        //calculations for age
        if (age >= 45 && age <= 54){
            pointAllocated += 2;
        }else if (age >= 55 && age <= 64){
            pointAllocated += 3;
        }else if (age >= 65 && age <= 74){
            pointAllocated += 5;
        }else if (age > 74){
            pointAllocated += 6;
        }

        //calculations for history of severe organ insufficiency or immunocompromised
        //expecting no/ emergency/ elective/ nonoperative
        if (cancerHistory == "Yes" && (typeOfSurgery == "nonoperative" || typeOfSurgery == "emergency")){
            pointAllocated += 5; 
        }else if (cancerHistory == "Yes" && typeOfSurgery == "elective") {
            pointAllocated += 2;
        }

        //calcuations for rectal temperature (°C)
        if (temperature >= 41 || temperature < 30){
            pointAllocated += 4;
        }else if ((temperature >= 39 && temperature < 41) || (temperature >= 30 && temperature < 32)){
            pointAllocated += 3;
        }else if (temperature >= 32 && temperature < 34){
            pointAllocated += 2;
        }else if ((temperature >= 38.5 && temperature < 39) || (temperature >= 34 && temperature < 36)) {
            pointAllocated += 1;
        }

        //calculations for mean arterial pressure (mmHg)
        if (meanArterialPressure <= 49 || meanArterialPressure > 159){
            pointAllocated += 4;
        }else if (meanArterialPressure > 129 && meanArterialPressure <= 159){
            pointAllocated += 3;
        }else if ((meanArterialPressure > 109 && meanArterialPressure <= 129) || (meanArterialPressure > 49 && meanArterialPressure <= 69)){
            pointAllocated += 2;
        }

        //calculations for heart rate (beats per min)
        if (heartrate < 40 || heartrate >= 180){ 
            pointAllocated += 4;
        }else if ((heartrate >= 140 && heartrate < 180) || (heartrate >= 40 && heartrate < 55)){
            pointAllocated += 3;
        }else if ((heartrate >= 110 && heartrate < 140) || (heartrate >= 55 && heartrate < 70)){
            pointAllocated += 2;
        }

        //calculations for respiratory rate (breaths per minute)
        if (respiratoryRate >= 50 || respiratoryRate < 6){
            pointAllocated += 4;
        }else if(respiratoryRate >= 35 && respiratoryRate < 50){
            pointAllocated += 3;
        }else if(respiratoryRate >= 6 && respiratoryRate < 10){
            pointAllocated += 2;
        }else if((respiratoryRate >= 25 && respiratoryRate < 35) || (respiratoryRate >= 10 && respiratoryRate < 12)){
            pointAllocated += 1;
        }

        //calculations for oxygenation (use PaO2 if FiO2 <50%, otherwise use A-a gradient)
        if (fio == '<50% (or non-intubated)'){
            if (pao == "61-70"){
                pointAllocated += 1;
            }else if (pao == "55-60"){
                pointAllocated += 3;
            }else if (pao == "<55"){
                pointAllocated += 4;
            }
        }else{
            if (aaGradient == ">499"){
                pointAllocated += 4;
            }else if (aaGradient == "350-499"){
                pointAllocated += 3;
            }else if (aaGradient == "200-349"){
                pointAllocated += 2;
            }
        }

        //calculations for arterial pH
        if (pH >= 7.70 || pH < 7.15){
            pointAllocated += 4;
        }else if ((pH >= 7.60 && pH < 7.70) || (pH >= 7.15 && pH < 7.25)){
            pointAllocated += 3;
        }else if (pH >= 7.25 && pH < 7.33){
            pointAllocated += 2;
        }else if (pH >= 7.50 && pH < 7.60){
            pointAllocated += 1;
        }

        //calcuations for seriumSodium (mmol/L)
        if (sodium >= 180 || sodium < 111){
            pointAllocated += 4;
        }else if ((sodium >= 160 && sodium < 180) || (sodium >= 111 && sodium < 120)){
            pointAllocated += 3;
        }else if ((sodium >= 155 && sodium < 160) || (sodium >= 120 && sodium < 130)){
            pointAllocated += 2;
        } else if (sodium >= 150 && sodium < 155){
            pointAllocated += 1;
        }

        //calculations for serium potassium (mmol/L)
        if (potassium >= 7.0 || potassium < 2.5){
            pointAllocated += 4;
        }else if (potassium >= 6.0 && potassium < 7.0){
            pointAllocated += 3;
        }else if (potassium >= 2.5 && potassium < 3.0){
            pointAllocated += 2;
        }else if ((potassium >= 5.5 && potassium  < 6.0) || (potassium >= 3.0 && potassium < 3.5)){
            pointAllocated += 1;
        }

        // //calculations for serum creatinine (mg/100mL)
        if (creatinine >= 3.5 && acuteRenalFailure == "Yes"){
            pointAllocated += 8;
        }else if ((creatinine >= 2.0 && creatinine < 3.5) && acuteRenalFailure == "Yes"){
            pointAllocated += 6;
        }else if (creatinine >= 3.5 && acuteRenalFailure == "No"){
            pointAllocated += 4;
        }else if ((creatinine >= 1.5 && creatinine < 2.0) && acuteRenalFailure == "Yes"){
            pointAllocated += 4;
        }else if ((creatinine >= 2.0 && creatinine < 3.5) && acuteRenalFailure == "No"){
            pointAllocated += 3;
        }else if ((creatinine >= 1.5 && creatinine < 2.0) && acuteRenalFailure == "No"){
            pointAllocated += 2;
        }else if (creatinine < 0.6){
            pointAllocated += 2;
        }

        //calculations for hematocrit (%)
        if (hematocrit >= 60 || hematocrit < 20){
            pointAllocated += 4;
        }else if ((hematocrit >= 50 && hematocrit < 60) || (hematocrit >= 20 && hematocrit < 30)){
            pointAllocated += 2;
        }else if(hematocrit >= 46 && hematocrit < 50){
            pointAllocated += 1;
        }

        //calculations for white blood count (total/cubic mm in)
        if (whiteBloodCell >= 40 || whiteBloodCell < 1){
            pointAllocated += 4;
        }else if ((whiteBloodCell >= 20 && whiteBloodCell < 40) || (whiteBloodCell >= 1 && whiteBloodCell <3)){
            pointAllocated += 2;
        }else if (whiteBloodCell >= 15 && whiteBloodCell < 20){
            pointAllocated += 1;
        }

        //calculations for glasgow coma scale (GCS)
        const pointForGCS = 15 - gcs;
        pointAllocated += pointForGCS;

        //results
        var nonoperativeResult = "";
        var postoperativeResult = "";
        if (pointAllocated >= 0 && pointAllocated <= 4){
            nonoperativeResult = "4% estimated nonoperative mortality";
            postoperativeResult = "11% estimated postoperative mortality"
        }else if (pointAllocated >= 5 && pointAllocated <= 9){
            nonoperativeResult = "8% estimated nonoperative mortality";
            postoperativeResult = "3% estimated postoperative mortality"
        }else if (pointAllocated >= 10 && pointAllocated <= 14){
            nonoperativeResult = "15% estimated nonoperative mortality";
            postoperativeResult = "7% estimated postoperative mortality"
        }else if (pointAllocated >= 15 && pointAllocated <= 19){
            nonoperativeResult = "25% estimated nonoperative mortality";
            postoperativeResult = "12% estimated postoperative mortality"
        }else if (pointAllocated >= 20 && pointAllocated <= 24){
            nonoperativeResult = "40% estimated nonoperative mortality";
            postoperativeResult = "30% estimated postoperative mortality"
        }else if (pointAllocated >= 25 && pointAllocated <= 29){
            nonoperativeResult = "55% estimated nonoperative mortality";
            postoperativeResult = "35% estimated postoperative mortality"
        }else if (pointAllocated >= 30 && pointAllocated <= 34){
            nonoperativeResult = "73% estimated nonoperative mortality";
            postoperativeResult = "73% estimated postoperative mortality"
        }else if (pointAllocated > 34){
            nonoperativeResult = "85% estimated nonoperative mortality";
            postoperativeResult = "88% estimated postoperative mortality"
        } 
        
        res.status(200).json( {"pointAllocated" : pointAllocated, "result": {"postoperativeResult": postoperativeResult, "nonoperative": nonoperativeResult}})
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

export default apacheIIScoreRouter;