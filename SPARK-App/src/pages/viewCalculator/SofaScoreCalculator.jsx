import React from 'react'
import { Button, ToggleButtonGroup, IconButton, Divider, styled } from '@mui/material'
import MuiToggleButton from "@mui/material/ToggleButton"
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react'
import CalculatorTab from '../../components/calculatorIcon/TabPanel'
import TextField from '@mui/material/TextField';
import CalcResultCard from '../../components/calculator/CalcResultCard';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

function Tab1Content(props){

    const {formData, setFormData, pointAllocated , setPointAllocated, interpretation , setInterpretation, scoreType} = props;

    const ToggleButton = styled(MuiToggleButton)({
        "&.Mui-selected": {
          color: "white",
          backgroundColor: '#41ADA4'
        }
    });
    
    // Handle units of measurement
    // PaOxygen unit
    const [paOxygenUnitStatus, setPaOxygenUnit] = useState(false);
    var paOxygenUnit = 'kPa';
    const convertPaOxygenUnit = (e) => {
        e.preventDefault();
        setPaOxygenUnit(!paOxygenUnitStatus)
        var priorPaOxygenUnit = paOxygenUnit;
        if (priorPaOxygenUnit == 'kPa'){
            setFormData((prevFormData) => ({
                ...prevFormData,
                PaO: (formData.PaO) *  7.50062
            }));
        }else{
            setFormData((prevFormData) => ({
                ...prevFormData,
                pao: (formData.pao) /  7.50062
            }));
        }
    }

    if(paOxygenUnitStatus == true){
        paOxygenUnit = 'mm Hg';
    }else{
        paOxygenUnit = 'kPa'
    }

    const handleResetForm = (e) => {
        const initialFormData = {
            PaO: "",
            FiO: "",
            onMechanicalVentilation: "",
            platelets: "",
            GCS: "",
            bilirubin: "",
            meanArteriaPressureOrAdministrationOfVasoactiveAgents: "",
            creatinine: ""
        };
        setFormData(initialFormData);
    }

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
          }));

        // Check if all fields are entered
        const formValues = Object.values({ ...formData, [name]: value });
        if (formValues.some((value) => value === '' || value === undefined)) {
            setPointAllocated(0);
            setInterpretation("Please enter the required values in the respective fields to perform the calculations.")
        }else{
            var formPaOValue = formValues[0]
            if (paOxygenUnit == 'kPa'){
                formPaOValue = formPaOValue *  7.50062
            }
            await axios.post(`http://localhost:8080/calculator/sofa-score/`,
                {
                    "PaO": formPaOValue,
                    "FiO": formValues[1],
                    "onMechanicalVentilation": formValues[2],
                    "platelets": formValues[3],
                    "GCS": formValues[4],
                    "bilirubin": formValues[5],
                    "meanArteriaPressureOrAdministrationOfVasoactiveAgents": formValues[6],
                    "creatinine": formValues[7]
                }
            ).then(
                res => {
                    let data = res.data
                    console.log(data)
                    setPointAllocated(res.data.pointAllocated)
                    setInterpretation("Initial SOFA Scores " + res.data.result.sofaScore + " predict " + res.data.result.morality + " mortality")
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
                        <Grid item xs={12} sm={6} md={2}>
                            <Typography align='left'>
                                PaO₂
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} style={{display: 'inline-flex'}}>
                            <TextField label={paOxygenUnit} type="number" variant="outlined" name="PaO" value={formData.PaO} onChange={handleInputChange}/>
                            <IconButton onClick={convertPaOxygenUnit} sx={{color: '#41ADA4'}}>
                                <ChangeCircleIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <Typography align='left'>
                                FiO₂
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} style={{display: 'inline-flex'}}>
                            <TextField label="%" type="number" variant="outlined" name="FiO" value={formData.FiO} onChange={handleInputChange}/>
                            <IconButton sx={{visibility: 'hidden'}}>
                                <ChangeCircleIcon/>
                            </IconButton>
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
                            <ToggleButtonGroup color="primary" exclusive value={formData.onMechanicalVentilation} onChange={handleInputChange}>
                                <ToggleButton value="No" name="onMechanicalVentilation">
                                    No
                                </ToggleButton>
                                <ToggleButton value="Yes" name="onMechanicalVentilation">
                                    Yes
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
                            <ToggleButtonGroup color="primary" exclusive value={formData.platelets} onChange={handleInputChange}>
                                <ToggleButton value="≥150" name="platelets">
                                    ≥150
                                </ToggleButton>
                                <ToggleButton value="100-149" name="platelets">
                                    100 - 149
                                </ToggleButton>
                                <ToggleButton value="50-99" name="platelets">
                                    50 - 99
                                </ToggleButton>
                                <ToggleButton value="20-49" name="platelets">
                                    20 - 49
                                </ToggleButton>
                                <ToggleButton value="<20" name="platelets">
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
                            <Typography align='left' variant='caption' display="block">
                                If on sedatives, estimate assumed GCS off sedatives
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ToggleButtonGroup color="primary" exclusive value={formData.GCS} onChange={handleInputChange}>
                                <ToggleButton value="15" name="GCS">
                                    15
                                </ToggleButton>
                                <ToggleButton value="13-14" name="GCS">
                                    13 - 14
                                </ToggleButton>
                                <ToggleButton value="10-12" name="GCS">
                                    10 - 12
                                </ToggleButton>
                                <ToggleButton value="6-9" name="GCS">
                                    6 - 9
                                </ToggleButton>
                                <ToggleButton value="<6" name="GCS">
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
                            <ToggleButtonGroup color="primary" exclusive orientation="vertical" value={formData.bilirubin} onChange={handleInputChange}>
                                <ToggleButton value="<1.2 (<20)" name="bilirubin">
                                    &lt;1.2  (&lt;20)
                                </ToggleButton>
                                <ToggleButton value="1.2–1.9 (20-32)" name="bilirubin">
                                    1.2 – 1.9 (20 - 32)
                                </ToggleButton>
                                <ToggleButton value="2.0–5.9 (33-101)" name="bilirubin">
                                    2.0 – 5.9 (33 - 101)
                                </ToggleButton>
                                <ToggleButton value="6.0–11.9 (102-204)" name="bilirubin">
                                    6.0 – 11.9 (102 - 204)
                                </ToggleButton>
                                <ToggleButton value="≥12.0 (>204)" name="bilirubin">
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
                            <Typography align='left' variant='caption' display="block">
                                Listed doses are in units of mcg/kg/min
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ToggleButtonGroup color="primary" exclusive orientation="vertical" value={formData.meanArteriaPressureOrAdministrationOfVasoactiveAgents} onChange={handleInputChange}>
                                <ToggleButton value="No hypotension" name="meanArteriaPressureOrAdministrationOfVasoactiveAgents">
                                    No hypotension
                                </ToggleButton>
                                <ToggleButton value="MAP <70 mmHg" name="meanArteriaPressureOrAdministrationOfVasoactiveAgents">
                                    MAP &lt;70 mmHg
                                </ToggleButton>
                                <ToggleButton value="DOPamine ≤5 or DOBUTamine (any dose)" name="meanArteriaPressureOrAdministrationOfVasoactiveAgents">
                                    DOPamine ≤5 or DOBUTamine (any dose)
                                </ToggleButton>
                                <ToggleButton value="DOPamine >5, EPINEPHrine ≤0.1, or norEPINEPHrine ≤0.1" name="meanArteriaPressureOrAdministrationOfVasoactiveAgents">
                                    DOPamine &gt;5, EPINEPHrine ≤0.1, or norEPINEPHrine ≤0.1
                                </ToggleButton>
                                <ToggleButton value="DOPamine >15, EPINEPHrine >0.1, or norEPINEPHrine >0.1" name="meanArteriaPressureOrAdministrationOfVasoactiveAgents">
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
                            <ToggleButtonGroup color="primary" exclusive orientation="vertical" value={formData.creatinine} onChange={handleInputChange}>
                                <ToggleButton value="<1.2 (<110)" name="creatinine">
                                    &lt;1.2 (&lt;110)
                                </ToggleButton>
                                <ToggleButton value="1.2–1.9 (110-170)" name="creatinine">
                                    1.2 – 1.9 (110 - 170)
                                </ToggleButton>
                                <ToggleButton value="2.0–3.4 (171-299)" name="creatinine">
                                    2.0 – 3.4 (171 - 299)
                                </ToggleButton>
                                <ToggleButton value="3.5–4.9 (300-440) or UOP <500 mL/day" name="creatinine">
                                    3.5 – 4.9 (300 - 440) or UOP &lt;500 mL/day
                                </ToggleButton>
                                <ToggleButton value="≥5.0 (>440) or UOP <200 mL/day" name="creatinine">
                                    ≥5.0 (&gt;440) or UOP &lt;200 mL/day
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <div>
                    <Button variant="contained" sx={{mt: 2, backgroundColor: '#41ADA4'}} type="submit" onClick="{handleResetForm}">
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
                    <strong>PaO2/FiO2*, mmHg</strong>
                </Grid>
                <Grid item xs={6}>
                    <strong>Point values</strong>
                </Grid>
                <Grid item xs={6}>
                    ≥400
                </Grid>
                <Grid item xs={6}>
                    0
                </Grid>
                <Grid item xs={6}>
                    300-399
                </Grid>
                <Grid item xs={6}>
                    +1  
                </Grid>
                <Grid item xs={6}>
                    200-299
                </Grid>
                <Grid item xs={6}>
                    +2
                </Grid>
                <Grid item xs={6}>
                    ≤199 and NOT mechanically ventilated
                </Grid>
                <Grid item xs={6}>
                    +2
                </Grid>
                <Grid item xs={6}>
                    100-199 and mechanically ventilated
                </Grid>
                <Grid item xs={6}>
                    +3
                </Grid>
                <Grid item xs={6}>
                    {'<'}100 and mechanically ventilated
                </Grid>
                <Grid item xs={6}>
                    +4
                </Grid>

                <Grid item xs={6}>
                    <strong>Platelets, ×103/µL</strong>
                </Grid>
                <Grid item xs={6}>
                    <strong>Point values</strong>
                </Grid>
                <Grid item xs={6}>
                    ≥150
                </Grid>
                <Grid item xs={6}>
                    0
                </Grid>
                <Grid item xs={6}>
                    100-149
                </Grid>
                <Grid item xs={6}>
                    +1
                </Grid>
                <Grid item xs={6}>
                    50-99
                </Grid>
                <Grid item xs={6}>
                    +2
                </Grid>
                <Grid item xs={6}>
                    20-49
                </Grid>
                <Grid item xs={6}>
                    +3
                </Grid>
                <Grid item xs={6}>
                    {'<'}20
                </Grid>
                <Grid item xs={6}>
                    +4
                </Grid>

                <Grid item xs={6}>
                    <strong>Glasgow Coma Scale</strong>
                </Grid>
                <Grid item xs={6}>
                    <strong>Point values</strong>
                </Grid>
                <Grid item xs={6}>
                    15
                </Grid>
                <Grid item xs={6}>
                    0
                </Grid>
                <Grid item xs={6}>
                    13–14
                </Grid>
                <Grid item xs={6}>
                    +1
                </Grid>
                <Grid item xs={6}>
                    10–12
                </Grid>
                <Grid item xs={6}>
                    +2
                </Grid>
                <Grid item xs={6}>
                    6–9
                </Grid>
                <Grid item xs={6}>
                    +3
                </Grid>
                <Grid item xs={6}>
                    {'<'}6
                </Grid>
                <Grid item xs={6}>
                    +4
                </Grid>
                
                <Grid item xs={6}>
                    <strong>Bilirubin, mg/dL (μmol/L)</strong>
                </Grid>
                <Grid item xs={6}>
                    <strong>Point values</strong>
                </Grid>
                <Grid item xs={6}>
                    {'<'}1.2 ({'<'}20)
                </Grid>
                <Grid item xs={6}>
                    0
                </Grid>
                <Grid item xs={6}>
                    1.2–1.9 (20-32)
                </Grid>
                <Grid item xs={6}>
                    +1
                </Grid>
                <Grid item xs={6}>
                    2.0–5.9 (33-101)
                </Grid>
                <Grid item xs={6}>
                    +2
                </Grid>
                <Grid item xs={6}>
                    6.0–11.9 (102-204)
                </Grid>
                <Grid item xs={6}>
                    +3
                </Grid>
                <Grid item xs={6}>
                    ≥12.0 ({'>'}204)
                </Grid>
                <Grid item xs={6}>
                    +4
                </Grid>

                <Grid item xs={6}>
                    <strong>Mean arterial pressure OR administration of vasoactive agents required (listed doses are in units of mcg/kg/min)</strong>
                </Grid>
                <Grid item xs={6}>
                    <strong>Point values</strong>
                </Grid>
                <Grid item xs={6}>
                    No hypotension
                </Grid>
                <Grid item xs={6}>
                    0
                </Grid>
                <Grid item xs={6}>
                    MAP {'<'}70 mmHg
                </Grid>
                <Grid item xs={6}>
                    +1
                </Grid>
                <Grid item xs={6}>
                    DOPamine ≤5 or DOBUTamine (any dose)
                </Grid>
                <Grid item xs={6}>
                    +2
                </Grid>
                <Grid item xs={6}>
                    DOPamine {'>'}5, EPINEPHrine ≤0.1, or norEPINEPHrine ≤0.1
                </Grid>
                <Grid item xs={6}>
                    +3
                </Grid>
                <Grid item xs={6}>
                    DOPamine {'>'}15, EPINEPHrine {'>'}0.1, or norEPINEPHrine {'>'}0.1
                </Grid>
                <Grid item xs={6}>
                    +4
                </Grid>

                <Grid item xs={6}>
                    <strong>Creatinine, mg/dL (μmol/L) (or urine output)</strong>
                </Grid>
                <Grid item xs={6}>
                    <strong>Point values</strong>
                </Grid>
                <Grid item xs={6}>
                    {'<'}1.2 ({'<'}110)
                </Grid>
                <Grid item xs={6}>
                    0
                </Grid>
                <Grid item xs={6}>
                    1.2–1.9 (110-170)
                </Grid>
                <Grid item xs={6}>
                    +1
                </Grid>
                <Grid item xs={6}>
                    2.0–3.4 (171-299)
                </Grid>
                <Grid item xs={6}>
                    +2
                </Grid>
                <Grid item xs={6}>
                    3.5–4.9 (300-440) or UOP {'<'}500 mL/day)
                </Grid>
                <Grid item xs={6}>
                    +3
                </Grid>
                <Grid item xs={6}>
                    ≥5.0 ({'>'}440) or UOP {'<'}200 mL/day
                </Grid>
                <Grid item xs={6}>
                    +4
                </Grid>

                <Grid item xs={12} mt={5}>Facts & Figure</Grid>
                
                <Grid item xs={4}>
                    <strong>SOFA Score</strong>
                </Grid>
                <Grid item xs={4}>
                    <strong>Mortality if initial score</strong>
                </Grid>
                <Grid item xs={4}>
                    <strong>Mortality if highest score</strong>
                </Grid>
                <Grid item xs={4}>
                    0-1
                </Grid>
                <Grid item xs={4}>
                    0.0%
                </Grid>
                <Grid item xs={4}>
                    0.0%
                </Grid>
                <Grid item xs={4}>
                    2-3
                </Grid>
                <Grid item xs={4}>
                    6.4%
                </Grid>
                <Grid item xs={4}>
                    1.5%
                </Grid>
                <Grid item xs={4}>
                    4-5
                </Grid>
                <Grid item xs={4}>
                    20.2%
                </Grid>
                <Grid item xs={4}>
                    6.7%
                </Grid>
                <Grid item xs={4}>
                    6-7
                </Grid>
                <Grid item xs={4}>
                    21.5%
                </Grid>
                <Grid item xs={4}>
                    18.2%
                </Grid>
                <Grid item xs={4}>
                    8-9
                </Grid>
                <Grid item xs={4}>
                    33.3%
                </Grid>
                <Grid item xs={4}>
                    26.3%
                </Grid>
                <Grid item xs={4}>
                    10-11
                </Grid>
                <Grid item xs={4}>
                    50.0%
                </Grid>
                <Grid item xs={4}>
                    45.8%
                </Grid>
                <Grid item xs={4}>
                    12-14
                </Grid>
                <Grid item xs={4}>
                    95.2%
                </Grid>
                <Grid item xs={4}>
                    80.0%
                </Grid>
                <Grid item xs={4}>
                    {'>'}14
                </Grid>
                <Grid item xs={4}>
                    95.2%
                </Grid>
                <Grid item xs={4}>
                    89.7%
                </Grid>

                <Grid item xs={6}>
                    <strong>Mean SOFA Score</strong>
                </Grid>
                <Grid item xs={6}>
                    <strong>Mortality</strong>
                </Grid>
                <Grid item xs={6}>
                    0-1.0
                </Grid>
                <Grid item xs={6}>
                    1.2%
                </Grid>
                <Grid item xs={6}>
                    1.1-2.0
                </Grid>
                <Grid item xs={6}>
                    5.4%
                </Grid>
                <Grid item xs={6}>
                    2.1-3.0
                </Grid>
                <Grid item xs={6}>
                    20.0%
                </Grid>
                <Grid item xs={6}>
                    3.1-4.0
                </Grid>
                <Grid item xs={6}>
                    36.1%
                </Grid>
                <Grid item xs={6}>
                    4.1-5.0
                </Grid>
                <Grid item xs={6}>
                    73.1%
                </Grid>
                <Grid item xs={6}>
                    {'>'}5.1
                </Grid>
                <Grid item xs={6}>
                    84.4%
                </Grid>
            </Grid>
        </Box>
    )
}

const SofaScore = () => {



    //state for form fields
    const [formData, setFormData] = useState({
        PaO: "",
        FiO: "",
        onMechanicalVentilation: "",
        platelets: "",
        GCS: "",
        bilirubin: "",
        meanArteriaPressureOrAdministrationOfVasoactiveAgents: "",
        creatinine: ""
    });

    //state for calc result card
    const [pointAllocated , setPointAllocated] = useState(0)
    const [interpretation , setInterpretation] = useState('Please enter the required values in the respective fields to perform the calculations.')
    const [scoreType, setScoreType] = useState('SOFA')

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