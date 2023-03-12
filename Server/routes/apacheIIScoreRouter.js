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
        console.log(req)
        const { age, history, rectalTemp, meanArterialPressure, heartrate, respiratoryRate, arterial
            , seriumSodium, seriumPotassium, serumCreatinine, hematocrit, whiteBloodCount, gcs} = req.body;

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

        console.log("point Allocated for age " + age + " is " + pointAllocated);

        //calculations for history of severe organ insufficiency or immunocompromised
        //expecting no/ emergency/ elective/ nonoperative
        if (history == "nonoperative" || history == "emergency"){
            pointAllocated += 5; 
        }else if (history == "elective") {
            pointAllocated += 2;
        }

        console.log("point Allocated for history " + history + " is " + pointAllocated);
    
        //calcuations for rectal temperature (°C)
        if (rectalTemp >= 41 || rectalTemp < 30){
            pointAllocated += 4;
        }else if ((rectalTemp >= 39 || rectalTemp < 41) || (rectalTemp >= 30 || rectalTemp < 32)){
            pointAllocated += 3;
        }else if (rectalTemp >= 32 && rectalTemp < 34){
            pointAllocated += 2;
        }else if ((rectalTemp >= 38.5 && rectalTemp < 39) || (rectalTemp >= 34 && rectalTemp < 36)) {
            pointAllocated += 1;
        }

        console.log("point Allocated for rectalTemp " + rectalTemp + " is " + pointAllocated);

        //calculations for mean arterial pressure (mmHg)
        if (meanArterialPressure <= 49 || meanArterialPressure > 159){
            pointAllocated += 4;
        }else if (meanArterialPressure > 129 && meanArterialPressure <= 159){
            pointAllocated += 3;
        }else if ((meanArterialPressure > 109 && meanArterialPressure <= 129) || (meanArterialPressure > 49 && meanArterialPressure <= 69)){
            pointAllocated += 2;
        }

        console.log("point Allocated for meanArterialPressure " + meanArterialPressure + " is " + pointAllocated);

        //calculations for heart rate (beats per min)
        if (heartrate < 40 || heartrate >= 180){ 
            pointAllocated += 4;
        }else if ((heartrate >= 140 && heartrate < 180) || (heartrate >= 40 && heartrate < 55)){
            pointAllocated += 3;
        }else if ((heartrate >= 110 && heartrate < 140) || (heartrate >= 55 && heartrate < 70)){
            pointAllocated += 2;
        }
        
        console.log("point Allocated for heartrate " + heartrate + " is " + pointAllocated);

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

        console.log("point Allocated for heartrate " + heartrate + " is " + pointAllocated);

        //calculations for oxygenation (use PaO2 if FiO2 <50%, otherwise use A-a gradient)


        //calculations for arterial pH
        if (arterial >= 7.70 || arterial < 7.15){
            pointAllocated += 4;
        }else if ((arterial >= 7.60 && arterial < 7.70) || (arterial >= 7.15 || arterial < 7.25)){
            pointAllocated += 3;
        }else if (arterial >= 7.25 || arterial < 7.33){
            pointAllocated += 2;
        }else if (arterial >= 7.50 && arterial < 7.60){
            pointAllocated += 1;
        }

        console.log("point Allocated for arteria " + arterial + " is " + pointAllocated);

        //calcuations for seriumSodium (mmol/L)
        if (seriumSodium >= 180 || seriumSodium < 111){
            pointAllocated += 4;
        }else if ((seriumSodium >= 160 && seriumSodium < 180) || (seriumSodium >= 111 && seriumSodium < 120)){
            pointAllocated += 3;
        }else if ((seriumSodium >= 155 && seriumSodium < 160) || (seriumSodium >= 120 && seriumSodium < 130)){
            pointAllocated += 2;
        } else if (seriumSodium >= 150 && seriumSodium < 155){
            pointAllocated += 1;
        }

        console.log("point Allocated for serum sodium " + seriumSodium + " is " + pointAllocated);

        //calculations for serium potassium (mmol/L)
        if (seriumPotassium >= 7.0 || seriumPotassium < 2.5){
            pointAllocated += 4;
        }else if (seriumPotassium >= 6.0 && seriumPotassium < 7.0){
            pointAllocated += 3;
        }else if (seriumPotassium >= 2.5 && seriumPotassium < 3.0){
            pointAllocated += 2;
        }else if ((seriumPotassium >= 5.5 && seriumPotassium  < 6.0) || (seriumPotassium >= 3.0 && seriumPotassium < 3.5)){
            pointAllocated += 1;
        }
        console.log("point Allocated for serum potassium " + seriumPotassium + " is " + pointAllocated);

        //calculations for serum creatinine (mg/100mL)
        


        //calculations for hematocrit (%)
        if (hematocrit >= 60 || hematocrit < 20){
            pointAllocated += 4;
        }else if ((hematocrit >= 50 && hematocrit < 60) || (hematocrit >= 20 && hematocrit < 30)){
            pointAllocated += 2;
        }else if(hematocrit >= 46 && hematocrit < 50){
            pointAllocated += 1;
        }
        console.log("point Allocated for hematocrit " + hematocrit + " is " + pointAllocated);

        //calculations for white blood count (total/cubic mm in)
        if (whiteBloodCount >= 40 || whiteBloodCount < 1){
            pointAllocated += 4;
        }else if ((whiteBloodCount >= 20 && whiteBloodCount < 40) || (whiteBloodCount >= 1 && whiteBloodCount <3)){
            pointAllocated += 2;
        }else if (whiteBloodCount >= 15 && whiteBloodCount < 20){
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