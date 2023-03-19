import React from 'react'
import { Button, ToggleButton, ToggleButtonGroup, Paper, Divider, styled } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react'
import { margin } from '@mui/system'
import CalculatorTab from '../../components/calculatorIcon/TabPanel'
import TextField from '@mui/material/TextField';
import { spacing } from '@mui/system';
import { borders } from '@mui/system';
import CalcResultCard from '../../components/calculator/CalcResultCard';

const SofaScore = () => {
    const handleSubmit = (event) => {
        // event.preventDefault();
        // console.log(formValues);
    };

    const [oMVentilation, setOMVentilation] = useState('');
    const handleOMVentilation = (event, newOMVentilation) => {
        setOMVentilation(newOMVentilation);
    };

    const [plateletsValue, setPlateletsValue] = useState('');
    const handlePlateletsValue = (event, newPlateletsValue) => {
        setPlateletsValue(newPlateletsValue);
    };

    const [glasgowComaScale, setGlasgowComaScale] = useState('');
    const handleGlasgowComaScale = (event, newGlasgowComaScale) => {
        setGlasgowComaScale(newGlasgowComaScale);
    };

    const [bilirubinValue, setBilirubinValue] = useState('');
    const handleBilirubinValue = (event, newBilirubinValue) => {
        setBilirubinValue(newBilirubinValue);
    };

    const [meanArterialPressure, setMeanArterialPressure] = useState('');
    const handleMeanArterialPressure = (event, newMeanArterialPressure) => {
        setMeanArterialPressure(newMeanArterialPressure);
    };

    const [creatinineValue, setCreatinineValue] = useState('');
    const handleCreatinineValue = (event, newCreatinineValue) => {
        setCreatinineValue(newCreatinineValue);
    };
    
    // Handle units of measurement
    // PaOxygen unit
    const [paOxygenUnitStatus, setPaOxygenUnit] = useState(false);
    var paOxygenUnit = 'kPa';
    const convertPaOxygenUnit = (e) => {
        setPaOxygenUnit(!paOxygenUnitStatus)
    }
    if(paOxygenUnitStatus == true){
        paOxygenUnit = 'mm Hg';
    }else{
        paOxygenUnit = 'kPa'
    }

    const tabs = [
        {
          label: "General Information",
          Component: (
            <div style={{marginLeft:'10%', marginRight:'10%'}}>
            <form onSubmit={handleSubmit}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={2}>
                                <Typography align='left'>
                                    PaO₂
                                </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} style={{display: 'inline-flex'}}>
                                <TextField label={paOxygenUnit} variant="outlined" name="age"/>
                                <Button variant="outlined" onClick={convertPaOxygenUnit} sx={{ml: 1, fontSize: 25}}>&#128177;</Button>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                                <Typography align='left'>
                                    FiO₂
                                </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                                <TextField label="%" variant="outlined" name="temperature"/>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6}>
                                <Typography align='left'>
                                    On mechanical ventilation
                                </Typography>
                                {/* <Typography variant="caption">
                                    Including CPAP (Continuous positive airway pressure)
                                </Typography> */}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                                <ToggleButtonGroup color="primary" exclusive value={oMVentilation} onChange={handleOMVentilation}>
                                    <ToggleButton value="yes">
                                        Yes
                                    </ToggleButton>
                                    <ToggleButton value="no">
                                        No
                                    </ToggleButton>
                                </ToggleButtonGroup>
                        </Grid>
                        </Grid>
                    <Divider></Divider>
                    <Grid id="surgeryType" container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6}>
                                <Typography align='left'>
                                    Platelets, ×10³/µL
                                </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                                <ToggleButtonGroup color="primary" exclusive value={plateletsValue} onChange={handlePlateletsValue}>
                                    <ToggleButton value="1">
                                        ≥150
                                    </ToggleButton>
                                    <ToggleButton value="2">
                                        100 - 149
                                    </ToggleButton>
                                    <ToggleButton value="3">
                                        50 - 99
                                    </ToggleButton>
                                    <ToggleButton value="4">
                                        20 - 49
                                    </ToggleButton>
                                    <ToggleButton value="5">
                                        &lt;20
                                    </ToggleButton>
                                </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center" >
                        <Grid item xs={12} sm={6}>
                                <Typography align='left'>
                                    Glasgow Coma Scale
                                </Typography>
                                {/* <Typography variant="caption">
                                    If on sedatives, estimate assumed GCS off sedatives
                                </Typography> */}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                                <ToggleButtonGroup color="primary" exclusive value={glasgowComaScale} onChange={handleGlasgowComaScale}>
                                    <ToggleButton value="1">
                                        15
                                    </ToggleButton>
                                    <ToggleButton value="2">
                                        13 - 14
                                    </ToggleButton>
                                    <ToggleButton value="3">
                                        10 - 12
                                    </ToggleButton>
                                    <ToggleButton value="4">
                                        6 - 9
                                    </ToggleButton>
                                    <ToggleButton value="5">
                                        &lt;6
                                    </ToggleButton>
                                </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="baseline">
                        <Grid item xs={12} sm={6}>
                                <Typography align='left'>
                                    Bilirubin, mg/dL (μmol/L)
                                </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                                <ToggleButtonGroup color="primary" exclusive orientation="vertical" value={bilirubinValue} onChange={handleBilirubinValue}>
                                    <ToggleButton value="1">
                                        &lt;1.2  (&lt;20)
                                    </ToggleButton>
                                    <ToggleButton value="2">
                                        1.2 – 1.9 (20 - 32)
                                    </ToggleButton>
                                    <ToggleButton value="3">
                                        2.0 – 5.9 (33 - 101)
                                    </ToggleButton>
                                    <ToggleButton value="4">
                                        6.0 – 11.9 (102 - 204)
                                    </ToggleButton>
                                    <ToggleButton value="5">
                                        ≥12.0 (&gt;204)
                                    </ToggleButton>
                                </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="baseline">
                        <Grid item xs={12} sm={6}>
                                <Typography align='left'>
                                    Mean arterial pressure OR administration of vasoactive agents required
                                </Typography>
                                {/* <Typography variant="caption">
                                    Listed doses are in units of mcg/kg/min
                                </Typography> */}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                                <ToggleButtonGroup color="primary" exclusive orientation="vertical" value={meanArterialPressure} onChange={handleMeanArterialPressure}>
                                    <ToggleButton value="1">
                                        No hypotension
                                    </ToggleButton>
                                    <ToggleButton value="2">
                                        MAP &lt;70 mmHg
                                    </ToggleButton>
                                    <ToggleButton value="3">
                                        DOPamine ≤5 or DOBUTamine (any dose)
                                    </ToggleButton>
                                    <ToggleButton value="4">
                                        DOPamine &gt;5, EPINEPHrine ≤0.1, or norEPINEPHrine ≤0.1
                                    </ToggleButton>
                                    <ToggleButton value="5">
                                        DOPamine &gt;15, EPINEPHrine &gt;0.1, or norEPINEPHrine &gt;0.1
                                    </ToggleButton>
                                </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="baseline">
                        <Grid item xs={12} sm={6}>
                                <Typography align='left'>
                                    Creatinine, mg/dL (μmol/L) (or urine output)
                                </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                                <ToggleButtonGroup color="primary" exclusive orientation="vertical" value={creatinineValue} onChange={handleCreatinineValue}>
                                    <ToggleButton value="1">
                                        &lt;1.2 (&lt;110)
                                    </ToggleButton>
                                    <ToggleButton value="2">
                                        1.2 – 1.9 (110 - 170)
                                    </ToggleButton>
                                    <ToggleButton value="3">
                                        2.0 – 3.4 (171 - 299)
                                    </ToggleButton>
                                    <ToggleButton value="4">
                                        3.5 – 4.9 (300 - 440) or UOP &lt;500 mL/day
                                    </ToggleButton>
                                    <ToggleButton value="5">
                                        ≥5.0 (&gt;440) or UOP &lt;200 mL/day
                                    </ToggleButton>
                                </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <div>
                        <Button variant="contained" sx={{m: 2}} color="primary" type="submit">
                            Reset
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
            <div>
              <h1>Tab with heading</h1>
              <p>Hello I am a tab with a heading</p>
            </div>
          )
        }
      ];

    return (
        <Box pt={5}>
            <div className="pageTitle">
                <h1 style={{fontSize: '30px', fontWeight: 'bold', marginBottom: "25px", textAlign: 'center'}}>Sequential Organ Failure Assessment (SOFA) Score</h1>
                <h6 style={{textAlign: 'center', color: '#04484A'}}>Predicts ICU mortality based on lab results and clinical data.</h6>
            </div>
            <div style={{textAlign: 'center', padding: '50px 0px'}}>
                <CalculatorTab tabs={tabs} />
            </div>
        </Box>
    )
}

export default SofaScore