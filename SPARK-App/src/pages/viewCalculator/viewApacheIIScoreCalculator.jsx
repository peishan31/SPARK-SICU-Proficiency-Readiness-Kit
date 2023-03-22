import React from 'react'
import { useRef } from 'react'
import { Button, ToggleButton, ToggleButtonGroup, Paper, Divider, IconButton, styled} from '@mui/material'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import Box from '@mui/material/Box';
import { useStyles, useState, useEffect } from 'react'
import CalculatorTab from '../../components/calculatorIcon/TabPanel'
import TextField from '@mui/material/TextField';
import CalcResultCard from '../../components/calculator/CalcResultCard';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

function Tab1Content(props){

    const {formData, setFormData, pointAllocated , setPointAllocated, interpretation , setInterpretation, scoreType} = props;

    // Handle min and max for number type textfield
    const [number, setNumber] = useState('');
    const validateNumber = (e) => {
        var number = parseInt(e.target.value, 10);
        setNumber(number);
    };
    const error = number < 0 || number >= 10;

    // Handle units of measurement
    // Temperature unit
    const [tempUnitStatus, setTempUnit] = useState(false);
    var tempUnit = '°C';
    const convertTempUnit = (e) => {
        setTempUnit(!tempUnitStatus)
    }
    if(tempUnitStatus == true){
        tempUnit = 'F';
    }else{
        tempUnit = '°C'
    }
    
    // Sodium unit
    const [sodiumUnitStatus, setSodiumUnit] = useState(false);
    var sodiumUnit = 'mmol/L';
    const convertSodiumUnit = (e) => {
        setSodiumUnit(!sodiumUnitStatus)
    }
    if(sodiumUnitStatus == true){
        sodiumUnit = 'mEq/L';
    }else{
        sodiumUnit = 'mmol/L'
    }

    // Potassium unit
    const [potassiumUnitStatus, setPotassiumUnit] = useState(false);
    var potassiumUnit = 'mmol/L';
    const convertPotassiumUnit = (e) => {
        setPotassiumUnit(!potassiumUnitStatus)
    }
    if(potassiumUnitStatus == true){
        potassiumUnit = 'mEq/L';
    }else{
        potassiumUnit = 'mmol/L'
    }

    // Creatinine unit
    const [creatinineUnitStatus, setCreatinineUnit] = useState(false);
    var creatinineUnit = 'µmol/L';
    const convertCreatinineUnit = (e) => {
        setCreatinineUnit(!creatinineUnitStatus)
    }
    if(creatinineUnitStatus == true){
        creatinineUnit = 'mg/dL';
    }else{
        creatinineUnit = 'µmol/L'
    }

    // White blood cell count unit
    const [wbcCountUnitStatus, setWbcCountUnit] = useState(false);
    var wbcCountUnit = '× 10⁹ cells/L';
    const convertWbcCountUnit = (e) => {
        setWbcCountUnit(!wbcCountUnitStatus)
    }
    if(wbcCountUnitStatus == true){
        wbcCountUnit = '× 10³ cells/µL';
    }else{
        wbcCountUnit = '× 10⁹ cells/L'
    }

    const handleResetForm = (e) => {
        const initialFormData = {
            weight: "",
            bodyBurnPercentage: ""
        };
        setFormData(initialFormData);
    }

    const handleInputChange = async (e) => {
        const { name, value } = e.target;

        //handle history field toggle
        if (name == "cancerHistory"){
            if(value == 'Yes') {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    typeOfSurgery: "emergency"
                }));
                document.getElementById('surgeryType').style.display = "flex";

            } else {
                document.getElementById('surgeryType').style.display = "none";
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    typeOfSurgery: "skipCheck"
                }));
            }
        }
        
        //handle FiO field toggle
        if (name == "fio"){
            if(value == '<50% (or non-intubated)') {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    pao: ""
                }));
                document.getElementById('paOxygen').style.display = "flex";
                document.getElementById('aaGradient').style.display = "none";
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    aaGradient: "skipCheck"
                }));
            }
            else{
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    aaGradient: ""
                }));
                document.getElementById('aaGradient').style.display = "flex";
                document.getElementById('paOxygen').style.display = "none";
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    pao: "skipCheck"
                }));
            } 
        }
        

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
          }));

        
        // Check if all fields are entered
        const formValues = Object.values({ ...formData, [name]: value });
            console.log(formValues[0] + " formValue[0] missing");
            console.log(formValues[1] + " formValue[1] missing");

            //formValues.some(value => value !== undefined && value !== '' && value === 'someValue')

        if (formValues.some((value) => value === '' || value === undefined)) {
            setPointAllocated(0);
            setInterpretation("Please enter the required values in the respective fields to perform the calculations.")
        }else{
            console.log(formValues[0] + " formValue[0]");
            console.log(formValues[1] + " formValue[1]");
            await axios.post(`http://localhost:8080/calculator/apache-ii-score`,
                {
                    "cancerHistory": formValues[0],
                    "typeOfSurgery": formValues[1],
                    "age": formValues[2],
                    "temperature": formValues[3],
                    "meanArterialPressure": formValues[4],
                    "pH" : formValues[5],
                    "heartrate": formValues[6],
                    "respiratoryRate": formValues[7],
                    "sodium": formValues[8],
                    "potassium": formValues[9],
                    "creatinine": formValues[10],
                    "acuteRenalFailure": formValues[11],
                    "hematocrit": formValues[12],
                    "whiteBloodCell": formValues[13],
                    "gcs": formValues[14],
                    "fio": formValues[15],
                    "pao": formValues[16],
                    "aaGradient": formValues[17]
                }
            ).then(
                res => {
                    let data = res.data
                    setPointAllocated(res.data.pointAllocated)
                    setInterpretation(res.data.result.interpretation)
                    return 200;
                }
            ).catch(
                err => {
                    return 500
                }
            )
        }
    };

    return (
        <div style={{marginLeft:'10%', marginRight:'10%'}}>
            <form>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography align='left'>
                                Age
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                label="Years" type="number" variant="outlined" name="age" value={formData.age} onChange={handleInputChange}
                            />
                        </Grid>
                        {/* <Grid container justifyContent="center" alignItems="center"> */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography align='left'>
                                Temperature
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} style={{display: 'inline-flex'}}>
                            <TextField label={tempUnit} type="number" variant="outlined" name="temperature" value={formData.temperature} onChange={handleInputChange}/>
                            <Button variant="outlined" onClick={convertTempUnit} sx={{ml: 1, fontSize: 25}}>&#128177;</Button>
                        </Grid>
                        {/* </Grid> */}
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography align='left'>
                                Mean arterial pressure
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField label="mm Hg" type="number" variant="outlined"  name="meanArterialPressure" value={formData.meanArterialPressure} onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography align='left'>
                                pH
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField label="pH" type="number" variant="outlined" name="pH" value={formData.pH} onChange={handleInputChange}/>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography align='left'>
                                Heart rate/pulse
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField label="beats/min" type="number" variant="outlined" name="heartrate" value={formData.heartrate} onChange={handleInputChange}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography align='left'>
                                Respiratory rate
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField label="breaths/min" type="number" variant="outlined" name="respiratoryRate" value={formData.respiratoryRate} onChange={handleInputChange} />
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography align='left'>
                                Sodium
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} style={{display: 'inline-flex'}}>
                            <TextField label={sodiumUnit} type="number" variant="outlined" name="sodium" value={formData.sodium} onChange={handleInputChange}  />
                            <Button variant="outlined" onClick={convertSodiumUnit} sx={{ml: 1, fontSize: 25}}>&#128177;</Button>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography align='left'>
                                Potassium
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} style={{display: 'inline-flex'}}>
                            <TextField label={potassiumUnit} type="number" variant="outlined" name="potassium" value={formData.potassium} onChange={handleInputChange}/>
                            <Button variant="outlined" onClick={convertPotassiumUnit} sx={{ml: 1, fontSize: 25}}>&#128177;</Button>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography align='left'>
                                Creatinine
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} style={{display: 'inline-flex'}}>
                            <TextField label={creatinineUnit} type="number" variant="outlined" name="creatinine" value={formData.creatinine} onChange={handleInputChange}/>
                            <Button variant="outlined" onClick={convertCreatinineUnit} sx={{ml: 1, fontSize: 25}}>&#128177;</Button>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography align='left'>
                                Hematocrit
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField label="%" type="number" variant="outlined" name="hematocrit" value={formData.hematocrit} onChange={handleInputChange}/>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography align='left'>
                                White blood cell count
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} style={{display: 'inline-flex'}}>
                            <TextField label={wbcCountUnit} type="number" variant="outlined" name="whiteBloodCell" value={formData.whiteBloodCell} onChange={handleInputChange}/>
                            <Button variant="outlined" onClick={convertWbcCountUnit} sx={{ml: 1, fontSize: 25}}>&#128177;</Button>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography align='left'>
                                Glasgow Coma Scale
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField label="points" type="number" variant="outlined" name="gcs" value={formData.gcs} onChange={handleInputChange}/>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <Typography align='left'>
                                History of severe organ failure or immunocompromise
                            </Typography>
                            <Typography align='left' variant='caption' display="block">
                                Heart Failure Class IV, cirrhosis, chronic lung disease, or dialysis-dependent
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ToggleButtonGroup color="primary" exclusive value={formData.cancerHistory} onChange={handleInputChange}>
                                <ToggleButton value="No" name="cancerHistory">
                                    No
                                </ToggleButton>
                                <ToggleButton value="Yes" name="cancerHistory">
                                    Yes
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                        </Grid>
                    <Divider></Divider>
                    <Grid id="surgeryType" container spacing={2} my={1} justifyContent="center" alignItems="center" style={{display:'none'}}>
                        <Grid item xs={12} sm={6}>
                            <Typography align='left'>
                                Type of surgery
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ToggleButtonGroup color="primary" exclusive value={formData.typeOfSurgery} onChange={handleInputChange}>
                                <ToggleButton value="emergency" name="typeOfSurgery">
                                    Emergency
                                </ToggleButton>
                                <ToggleButton value="elective" name="typeOfSurgery">
                                    Elective
                                </ToggleButton>
                                <ToggleButton value="nonoperative" name="typeOfSurgery">
                                    Nonoperative
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center" >
                        <Grid item xs={12} sm={6}>
                            <Typography align='left'>
                                Acute renal failure
                            </Typography>
                            <Typography align='left' variant='caption' display="block">
                                Note: "acute renal failure" was not defined in the original study. Use clinical judgment to determine whether patient has acute kidney injury.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ToggleButtonGroup color="primary" exclusive value={formData.acuteRenalFailure} onChange={handleInputChange}>
                                <ToggleButton value="No" name="acuteRenalFailure">
                                    No
                                </ToggleButton>
                                <ToggleButton value="Yes" name="acuteRenalFailure">
                                    Yes
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <Typography align='left'>
                                FiO₂
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ToggleButtonGroup color="primary" exclusive value={formData.fio} onChange={handleInputChange}>
                                <ToggleButton value="<50% (or non-intubated)" name="fio">
                                    &lt;50% (or non-intubated)
                                </ToggleButton>
                                <ToggleButton value="≥50%" name="fio">
                                    ≥50%
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid id="paOxygen" container spacing={2} my={1} justifyContent="center" alignItems="center" style={{display:'none'}}>
                        <Grid item xs={12} sm={6}>
                            <Typography align='left'>
                                PaO₂, mmHg
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ToggleButtonGroup color="primary" exclusive value={formData.pao} onChange={handleInputChange}>
                                <ToggleButton value=">70" name="pao">
                                    &gt; 70
                                </ToggleButton>
                                <ToggleButton value="61-70" name="pao">
                                    61 - 70
                                </ToggleButton>
                                <ToggleButton value="55-60" name="pao">
                                    55 - 60
                                </ToggleButton>
                                <ToggleButton value="<55">
                                    &lt; 55
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid id="aaGradient" container spacing={2} my={1} justifyContent="center" alignItems="center" style={{display:'none'}}>
                        <Grid item xs={12} sm={6}>
                            <Typography align='left'>
                                A-a gradient
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ToggleButtonGroup color="primary" exclusive value={formData.aaGradient} onChange={handleInputChange}>
                                <ToggleButton value="<200" name="aaGradient">
                                    &lt; 200
                                </ToggleButton>
                                <ToggleButton value="200-349" name="aaGradient">
                                    200 - 349
                                </ToggleButton>
                                <ToggleButton value="350-499" name="aaGradient">
                                    350 - 499
                                </ToggleButton>
                                <ToggleButton value=">499" name="aaGradient">
                                    &gt; 499
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <div>
                    <Button variant="contained" sx={{mt: 2}} color="primary" type="submit" onClick="{handleResetForm}">
                        Reset
                    </Button>
                    </div>
                </Box>
            </form>
            <Typography variant="h6" mt={5} mb={1} sx={{fontWeight:'bold'}} component="div">
                Results
            </Typography>
            <CalcResultCard pointAllocated={pointAllocated} interpretation={interpretation} scoreType={scoreType}></CalcResultCard>
            </div>
    )
}
function Tab2Content(props){
    const {formData} = props;
    return (
        <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={12}>Point Values</Grid>
                    
                    <Grid item xs={6}>
                        <strong>Age, Years</strong>
                    </Grid>
                    <Grid item xs={6}>
                        <strong>Point values</strong>
                    </Grid>
                    <Grid item xs={6}>
                        <p>≤44</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>0</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>45-54</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+2</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>55-64</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+3</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>65-74</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+5</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>{'>'}74</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+6</p>
                    </Grid>

                    <Grid item xs={6}>
                        <strong>History of severe organ insufficiency or immunocompromised</strong>
                    </Grid>
                    <Grid item xs={6}>
                        <strong>Point values</strong>
                    </Grid>
                    <Grid item xs={6}>
                        <p>Yes, and nonoperative or emergency postoperative patient</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+5</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>Yes, and elective postoperative patient74</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+2</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>No</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>0</p>
                    </Grid>

                    <Grid item xs={6}>
                        <strong>Rectal temperature, °C</strong>
                    </Grid>
                    <Grid item xs={6}>
                        <strong>Point values</strong>
                    </Grid>
                    <Grid item xs={6}>
                        <p>≥41</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+4</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>39 to {'<'}41</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+3</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>38.5 to {'<'}39</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+1</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>36 to {'<'}38.5</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>0</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>34 to {'<'}36</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+1</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>32 to {'<'}34</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+2</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>30 to {'<'}32</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+3</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>{'<'}30</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+4</p>
                    </Grid>
                    
                    <Grid item xs={6}>
                        <strong>Mean arterial pressure, mmHg</strong>
                    </Grid>
                    <Grid item xs={6}>
                        <strong>Point values</strong>
                    </Grid>
                    <Grid item xs={6}>
                        <p>{'>'}159</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+4</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>{'>'}129-159</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+3</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>{'>'}109-129</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+2</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>{'>'}69-109</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>0</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>{'>'}49-69</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+2</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>≤49</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+4</p>
                    </Grid>

                    <Grid item xs={6}>
                        <strong>Heart rate, beats per minute</strong>
                    </Grid>
                    <Grid item xs={6}>
                        <strong>Point values</strong>
                    </Grid>
                    <Grid item xs={6}>
                        <p>≥180</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+4</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>140 to {'<'}180</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+3</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>110 to {'<'}140</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+2</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>70 to {'<'}110</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>0</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>55 to {'<'}70</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+2</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>40 to {'<'}55</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+3</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>{'<'}40</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+4</p>
                    </Grid>

                    <Grid item xs={6}>
                        <strong>Respiratory rate, breaths per minute</strong>
                    </Grid>
                    <Grid item xs={6}>
                        <strong>Point values</strong>
                    </Grid>
                    <Grid item xs={6}>
                        <p>≥50</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+4</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>35 to {'<'}50</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+3</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>25 to {'<'}35</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+1</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>12 to {'<'}25</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>0</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>10 to {'<'}12</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+1</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>6 to {'<'}10</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+2</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>{'<'}6</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+4</p>
                    </Grid>

                    <Grid item xs={6}>
                        <strong>Oxygenation (use PaO2 if FiO2 {'<'}50%, otherwise use A-a gradient)</strong>
                    </Grid>
                    <Grid item xs={6}>
                        <strong>Point values</strong>
                    </Grid>
                    <Grid item xs={6}>
                        <p>A-a gradient {'>'}499</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+4</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>A-a gradient 350-499</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+3</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>A-a gradient 200-349</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+2</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>A-a gradient {'<'}200 (if FiO2 over 49%) or pO2 {'>'}70 (if FiO2 less than 50%)</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>0</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>PaO2 = 61-70</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+1</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>PaO2 = 55-60</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+3</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>PaO2 {'<'}55</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+4</p>
                    </Grid>

                    <Grid item xs={6}>
                        <strong>Arterial pH</strong>
                    </Grid>
                    <Grid item xs={6}>
                        <strong>Point values</strong>
                    </Grid>
                    <Grid item xs={6}>
                        <p>≥7.70</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+4</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>7.60 to {'<'}7.70</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+3</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>7.50 to {'<'}7.60</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+1</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>7.33 to {'<'}7.50</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>0</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>7.25 to {'<'}7.33</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+2</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>7.15 to {'<'}7.25</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+3</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>{'<'}7.15</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+4</p>
                    </Grid>

                    <Grid item xs={6}>
                        <strong>Serum sodium, mmol/L</strong>
                    </Grid>
                    <Grid item xs={6}>
                        <strong>Point values</strong>
                    </Grid>
                    <Grid item xs={6}>
                        <p>≥180</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+4</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>160 to {'<'}180</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+3</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>155 to {'<'}160</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+2</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>150 to {'<'}155</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+1</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>130 to {'<'}150</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>0</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>120 to {'<'}130</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+2</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>111 to {'<'}120</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+3</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>{'<'}111</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+4</p>
                    </Grid>

                    <Grid item xs={6}>
                        <strong>Serum potassium, mmol/L</strong>
                    </Grid>
                    <Grid item xs={6}>
                        <strong>Point values</strong>
                    </Grid>
                    <Grid item xs={6}>
                        <p>≥7.0</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+4</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>6.0 to {'<'}7.0</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+3</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>5.5 to {'<'}6.0</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+1</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>3.5 to {'<'}5.5</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>0</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>3.0 to {'<'}3.5</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+1</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>2.5 to {'<'}3.0</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+2</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>{'<'}2.5</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+4</p>
                    </Grid>

                    <Grid item xs={6}>
                        <strong>Serum creatinine, mg/100 mL</strong>
                    </Grid>
                    <Grid item xs={6}>
                        <strong>Point values</strong>
                    </Grid>
                    <Grid item xs={6}>
                        <p>≥3.5 and ACUTE renal failure*</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+8</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>2.0 to {'<'}3.5 and ACUTE renal failure</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+6</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>≥3.5 and CHRONIC renal failure</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+4</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>1.5 to {'<'}2.0 and ACUTE renal failure</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+4</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>2.0 to {'<'}3.5 and CHRONIC renal failure</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+3</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>1.5 to {'<'}2.0 and CHRONIC renal failure</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+2</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>0.6 to {'<'}1.5</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>0</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>{'<'}0.6</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+2</p>
                    </Grid>

                    <Grid item xs={6}>
                        <strong>Hematocrit, %</strong>
                    </Grid>
                    <Grid item xs={6}>
                        <strong>Point values</strong>
                    </Grid>
                    <Grid item xs={6}>
                        <p>≥60</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+4</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>50 to {'<'}60</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+2</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>46 to {'<'}50</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+1</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>30 to {'<'}46</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>0</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>20 to {'<'}30</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+2</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>{'<'}20</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+4</p>
                    </Grid>

                    <Grid item xs={6}>
                        <strong>White blood count, total/cubic mm in</strong>
                    </Grid>
                    <Grid item xs={6}>
                        <strong>Point values</strong>
                    </Grid>
                    <Grid item xs={6}>
                        <p>≥40</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+4</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>20 to {'<'}40</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+2</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>15 to {'<'}20</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+1</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>3 to {'<'}15</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>0</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>1 to {'<'}3</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+2</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>{'<'}1</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>+4</p>
                    </Grid>

                    <Grid item xs={6}>
                        <strong>Glasgow Coma Scale (GCS)</strong>
                    </Grid>
                    <Grid item xs={6}>
                        <strong>Point values</strong>
                    </Grid>
                    <Grid item xs={6}>
                        <p>1 - 15</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>15 - [GCS Score]</p>
                    </Grid>

                    <Grid item xs={12} mt={5}>Approximated in-hospital mortality rates</Grid>
                    <Grid item xs={4}>
                        <strong>APACHE II Score</strong>
                    </Grid>
                    <Grid item xs={4}>
                        <strong>Nonoperative</strong>
                    </Grid>
                    <Grid item xs={4}>
                        <strong>Postoperative</strong>
                    </Grid>
                    <Grid item xs={4}>
                        <p>0-4</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p>4%</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p>1%</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p>5-9</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p>8%</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p>3%</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p>10-14</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p>15%</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p>7%</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p>15-19</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p>25%</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p>12%</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p>20-24</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p>40%</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p>30%</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p>25-29</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p>55%</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p>35%</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p>30-34</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p>73%</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p>73%</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p>{'>'}34</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p>85%</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p>88%</p>
                    </Grid>
                </Grid>
                
            </Box>
    )
}

const ApacheIIScore = () => {


    //state for form fields
    const [formData, setFormData] = useState({
        "cancerHistory": "",
        "typeOfSurgery": "",
        "age": "",
        "temperature": "",
        "meanArterialPressure": "",
        "pH" : "",
        "heartrate": "",
        "respiratoryRate": "",
        "sodium": "",
        "potassium": "",
        "creatinine": "",
        "acuteRenalFailure": "",
        "hematocrit": "",
        "whiteBloodCell": "",
        "gcs": "",
        "fio": "",
        "pao": "",
        "aaGradient": ""
        // "cancerHistory": "",
        // "typeOfSurgery": "",
        // "age": "1",
        // "temperature": "1",
        // "meanArterialPressure": "1",
        // "pH" : "1",
        // "heartrate": "1",
        // "respiratoryRate": "1",
        // "sodium": "1",
        // "potassium": "1",
        // "creatinine": "1",
        // "acuteRenalFailure": "1",
        // "hematocrit": "1",
        // "whiteBloodCell": "1",
        // "gcs": "1",
        // "fio": "",
        // "pao": "",
        // "aaGradient": ""
    });

    //state for calc result card
    const [pointAllocated , setPointAllocated] = useState(0)
    const [interpretation , setInterpretation] = useState('Please enter the required values in the respective fields to perform the calculations.')
    const [scoreType, setScoreType] = useState('APACHE II Index')

    const tabs = [
        {
          label: "General Information",
          Component: (
            <Tab1Content formData={formData} setFormData={setFormData} pointAllocated={pointAllocated} setPointAllocated={setPointAllocated} interpretation={interpretation} setInterpretation={setInterpretation} scoreType={scoreType}/>
          )
        },
        {
          label: "Point System",
          Component: (
            <Tab2Content formData={formData}/>
          )
        }
      ];


    return (
        <Box pt={5}>
            <div className="pageTitle">
                <h1 style={{fontSize: '30px', fontWeight: 'bold', marginBottom: "25px", textAlign: 'center'}}>APACHE II Score</h1>
                <h6 style={{textAlign: 'center', color: '#04484A'}}>Estimates ICU mortality.</h6>
            </div>
            <div style={{textAlign: 'center', padding: '50px 0px'}}>
                <CalculatorTab tabs={tabs} />
            </div>
        </Box>
    )
}

export default ApacheIIScore