import React from 'react'
import { useRef } from 'react'
import { Button, ToggleButton, ToggleButtonGroup, Paper, Divider, styled} from '@mui/material'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react'
import CalculatorTab from '../../components/calculatorIcon/TabPanel'
import TextField from '@mui/material/TextField';
import CalcResultCard from '../../components/calculator/CalcResultCard';

const ApacheIIScore = () => {


    const Item = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(1),
        textAlign: 'left',
        boxShadow: 'none',
    }));

    //forms input state

    const [acuteRenalFailure, setAcuteRenalFailure] = useState('');
    const [fiOxygen, setFiOxygen] = useState('');
    const [history, setHistory] = useState('');

    const handleChange = (e, newFiOxygen) => {
        setFiOxygen(newFiOxygen);
        if(newFiOxygen == 'lessThan') {
            document.getElementById('paOxygen').style.display = "flex";
            document.getElementById('aaGradient').style.display = "none";
        }
        else if(newFiOxygen == 'moreOrEqualTo') {
            document.getElementById('aaGradient').style.display = "flex";
            document.getElementById('paOxygen').style.display = "none";
        } else {
            document.getElementById('paOxygen').style.display = "none";
            document.getElementById('aaGradient').style.display = "none";
        }
    };
    
    const handleHistory = (event, newHistoryValue) => {
        setHistory(newHistoryValue);
        if(newHistoryValue == 'yes') {
            document.getElementById('surgeryType').style.display = "flex";
        } else {
            document.getElementById('surgeryType').style.display = "none";
        }
    };

    const handleAcuteRenalFailure = (event, newAcuteRenalFailureValue) => {
        setAcuteRenalFailure(newAcuteRenalFailureValue);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post(
            `http://localhost:8080/calculator/apache-ii-score/`,
            {
                age: event.target.age.value,
                //history: history,
                rectalTemp: event.target.temperature.value,
                heartrate: event.target.heartRate.value,
                respiratoryRate: event.target.respiratoryRate.value,
                arterial: event.target.meanArterialPressure.value,
                seriumSodium: event.target.sodium.value,
                seriumPotassium: event.target.potassium.value,
                serumCreatinine: event.target.creatinine.value,
                hematocrit: event.target.hematocrit.value,
                whiteBloodCount: event.target.whiteBloodCount.value,
                gcs: event.target.gcs.value
                //oxygenation: oxygenation
            }
        ).then(
            res => {
                let data = res.data
                console.log(data)
                return 200;
            }
        ).catch(
            err => {
                return 500
            }
        )
        //console.log(formValues);
        
    };

    const tabs = [
        {
          label: "General Information",
          Component: (
            <div style={{marginLeft:'10%', marginRight:'10%'}}>
            <form onSubmit={handleSubmit}>
                {/* <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
                    noValidate autoComplete="off"
                >

                </Box> */}
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <Typography>
                                    Age
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <TextField label="Years" variant="outlined" name="age"/>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <Typography>
                                    Temperature
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <TextField label="°C" variant="outlined" name="temperature"/>
                                {/* <Button variant="outlined" sx={{ml: 1, fontSize: 25}}>&#128177;</Button> */}
                            </Item>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <Typography>
                                    Mean arterial pressure
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <TextField label="mm Hg" variant="outlined" name="meanArterialPressure" />
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <Typography>
                                    pH
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <TextField label="pH" variant="outlined" name="pH"/>
                            </Item>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <Typography>
                                    Heart rate/pulse
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <TextField label="beats/min" variant="outlined" name="heartRate" />
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <Typography>
                                    Respiratory rate
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <TextField label="breaths/min" variant="outlined" name="respiratoryRate" />
                            </Item>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <Typography>
                                    Sodium
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <TextField label="mmol/L" variant="outlined"  name="sodium" />
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <Typography>
                                    Potassium
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <TextField label="mmol/L" variant="outlined" name="potassium" />
                            </Item>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <Typography>
                                    Creatinine
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <TextField label="µmol/L" variant="outlined"  name="creatinine" />
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <Typography>
                                    Hematocrit
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <TextField label="%" variant="outlined"  name="hematocrit" />
                            </Item>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <Typography>
                                    White blood cell count
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <TextField label="× 10⁹ cells/L" variant="outlined"  name="whiteBloodCount"/>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <Typography>
                                    Glasgow Coma Scale
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <TextField label="points" variant="outlined" name="gcs" />
                            </Item>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <Item>
                                <Typography>
                                    History of severe organ failure or immunocompromise
                                </Typography>
                                <Typography variant="caption">
                                    Heart Failure Class IV, cirrhosis, chronic lung disease, or dialysis-dependent
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Item>
                                <ToggleButtonGroup color="primary" exclusive value={history} onChange={handleHistory}>
                                    <ToggleButton value="yes">
                                        Yes
                                    </ToggleButton>
                                    <ToggleButton value="no">
                                        No
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Item>
                        </Grid>
                        </Grid>
                    <Divider></Divider>
                    <Grid id="surgeryType" container spacing={2} justifyContent="center" alignItems="center" style={{display:'none'}}>
                        <Grid item xs={12} sm={6}>
                            <Item>
                                <Typography>
                                    Type of surgery
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Item>
                                <ToggleButtonGroup color="primary" exclusive>
                                    <ToggleButton value="">
                                        Emergency
                                    </ToggleButton>
                                    <ToggleButton value="">
                                        Elective
                                    </ToggleButton>
                                    <ToggleButton value="">
                                        Nonoperative
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Item>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} justifyContent="center" alignItems="center" >
                        <Grid item xs={12} sm={6}>
                            <Item>
                                <Typography>
                                    Acute renal failure
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Item>
                                <ToggleButtonGroup color="primary" exclusive value={acuteRenalFailure} onChange={handleAcuteRenalFailure}>
                                    <ToggleButton value="yes">
                                        Yes
                                    </ToggleButton>
                                    <ToggleButton value="no">
                                        No
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Item>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <Item>
                                <Typography>
                                    FiO₂
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Item>
                                <ToggleButtonGroup color="primary" exclusive value={fiOxygen} onChange={handleChange}>
                                    <ToggleButton value="lessThan">
                                        &lt;50% (or non-intubated)
                                    </ToggleButton>
                                    <ToggleButton value="moreOrEqualTo">
                                        ≥50%
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Item>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid id="paOxygen" container spacing={2} justifyContent="center" alignItems="center" style={{display:'none'}}>
                        <Grid item xs={12} sm={6}>
                            <Item>
                                <Typography>
                                    PaO₂, mmHg
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Item>
                                <ToggleButtonGroup exclusive>
                                    <ToggleButton value="">
                                        &gt; 70
                                    </ToggleButton>
                                    <ToggleButton value="">
                                        61 - 70
                                    </ToggleButton>
                                    <ToggleButton value="">
                                        55 - 60
                                    </ToggleButton>
                                    <ToggleButton value="">
                                        &lt; 55
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Item>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid id="aaGradient" container spacing={2} justifyContent="center" alignItems="center" style={{display:'none'}}>
                        <Grid item xs={12} sm={6}>
                            <Item>
                                <Typography>
                                    A-a gradient
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Item>
                                <ToggleButtonGroup exclusive>
                                    <ToggleButton value="">
                                        &lt; 200
                                    </ToggleButton>
                                    <ToggleButton value="">
                                        200 - 349
                                    </ToggleButton>
                                    <ToggleButton value="">
                                        350 - 499
                                    </ToggleButton>
                                    <ToggleButton value="">
                                        &gt; 499
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Item>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <div>
                        <Button variant="contained" sx={{m: 2}} color="primary" type="submit">
                            Reset
                        </Button>
                        <Button variant="contained" sx={{m: 2}} color="primary" type="submit">
                            Calculate
                        </Button>
                    </div>
                </Box>
            </form>
            <Typography variant="h6" mt={5} mb={1} sx={{fontWeight:'bold'}} component="div">
                Results
            </Typography>
            <CalcResultCard></CalcResultCard>
            </div>
          )
        },
        {
          label: "Point System",
          Component: (
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