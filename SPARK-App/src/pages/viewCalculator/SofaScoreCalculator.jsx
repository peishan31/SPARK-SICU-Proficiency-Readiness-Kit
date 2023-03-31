import React from 'react'
import { Button, ToggleButtonGroup, IconButton, Divider, Paper, styled } from '@mui/material'
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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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

    const BASE_URL = import.meta.env.VITE_API_URL

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
          }));

        // Check if all fields are entered
        const formValues = Object.values({ ...formData, [name]: value });
        if (formValues.some((value) => value === '' || value === undefined)) {
            setPointAllocated("-");
            setInterpretation("Please enter the required values in the respective fields to perform the calculations.")
        }else{
            var formPaOValue = formValues[0]
            if (paOxygenUnit == 'kPa'){
                formPaOValue = formPaOValue *  7.50062
            }
            await axios.post(`${BASE_URL}/calculator/sofa-score/`,
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

    function createData(criteria, pointValues ) {
        return { criteria, pointValues };
    }
      
    const paOxygens = [
        createData('≥400', '0'),
        createData('300-399', '+1'),
        createData('200-299', '+2'),
        createData('≤199 and NOT mechanically ventilated', '+2'),
        createData('100-199 and mechanically ventilated', '+3'),
        createData('<100 and mechanically ventilated', '+4')
    ];

    const platelets = [
        createData('≥150', '0'),
        createData('100-149', '+1'),
        createData('50-99', '+2'),
        createData('20-49', '+3'),
        createData('<20', '+4')
    ];

    const glasgowComas = [
        createData('15', '0'),
        createData('13-14', '+1'),
        createData('10-12', '+2'),
        createData('6-9', '+3'),
        createData('<6', '+4')
    ];

    const bilirubins = [
        createData('<1.2 (<20)', '0'),
        createData('1.2–1.9 (20-32)', '+1'),
        createData('2.0–5.9 (33-101)', '+2'),
        createData('6.0–11.9 (102-204)', '+3'),
        createData('≥12.0 (>204)', '+4')
    ];

    const pressures = [
        createData('No hypotension', '0'),
        createData('MAP <70 mmHg', '+1'),
        createData('DOPamine ≤5 or DOBUTamine (any dose)', '+2'),
        createData('DOPamine >5, EPINEPHrine ≤0.1, or norEPINEPHrine ≤0.1', '+3'),
        createData('DOPamine >15, EPINEPHrine >0.1, or norEPINEPHrine >0.1', '+4')
    ];

    const creatinines = [
        createData('<1.2 (<110)', '0'),
        createData('1.2–1.9 (110-170)', '+1'),
        createData('2.0–3.4 (171-299)', '+2'),
        createData('3.5–4.9 (300-440) or UOP <500 mL/day)', '+3'),
        createData('≥5.0 (>440) or UOP <200 mL/day', '+4')
    ];

    function createData2( type, flowRates, fiOxygen ) {
        return { type, flowRates, fiOxygen };
    }

    const rows = [
        createData2('Nasal cannula', '1-6', 
                    <div>
                        <Typography>~4% FiO₂ added above room air* per 1 L/min</Typography>
                        <Typography variant='subtitle'>*refer to the checklist below</Typography>
                    </div>),
        createData2('Simple face mask', '~6-12', '35-60%*'),
        createData2('Non-rebreather mask', '10-15', '~70-90%'),
        createData2('High-flow nasal cannula', 'Up to 60', '30-100%')
    ];

    function createData3( score, initial, highest ) {
        return { score, initial, highest };
    }

    const sofaScores = [
        createData3('0-1', '0.0%', '0.0%'),
        createData3('2-3', '6.4%', '1.5%'),
        createData3('4-5', '20.2%', '6.7%'),
        createData3('6-7', '21.5%', '18.2%'),
        createData3('8-9', '33.3%', '26.3%'),
        createData3('10-11', '50.0%', '45.8%'),
        createData3('12-14', '95.2%', '80.0%'),
        createData3('>14', '95.2%', '89.7%')
    ];

    function createData4( meanScore, mortality ) {
        return { meanScore, mortality };
    }

    const meanSofaScores = [
        createData4('0-1.0', '1.2%'),
        createData4('1.1-2.0', '5.4%'),
        createData4('2.1-3.0', '20.0%'),
        createData4('3.1-4.0', '36.1%'),
        createData4('4.1-5.0', '73.1%'),
        createData4('>5.1', '84.4%')
    ];

    return (
        <div style={{marginLeft:'10%', marginRight:'10%'}}>
            <Typography variant="h6" align="left" mt={4} mb={1} style={{fontWeight: 'bold'}}>Formula</Typography>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold'}}>Criteria</TableCell>
                            <TableCell style={{fontWeight: 'bold'}} align="center">Points</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>PaO2/FiO2*, mmHg</TableCell>
                    <TableBody>
                    {paOxygens.map((paOxygen) => (
                        <TableRow
                        key={paOxygen.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {paOxygen.criteria}
                        </TableCell>
                        <TableCell align="center">{paOxygen.pointValues}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>Platelets, ×103/µL</TableCell>
                    <TableBody>
                    {platelets.map((platelet) => (
                        <TableRow
                        key={platelet.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {platelet.criteria}
                        </TableCell>
                        <TableCell align="center">{platelet.pointValues}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>Glasgow Coma Scale</TableCell>
                    <TableBody>
                    {glasgowComas.map((glasgowComa) => (
                        <TableRow
                        key={glasgowComa.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {glasgowComa.criteria}
                        </TableCell>
                        <TableCell align="center">{glasgowComa.pointValues}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>Bilirubin, mg/dL (μmol/L)</TableCell>
                    <TableBody>
                    {bilirubins.map((bilirubin) => (
                        <TableRow
                        key={bilirubin.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {bilirubin.criteria}
                        </TableCell>
                        <TableCell align="center">{bilirubin.pointValues}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>Mean arterial pressure OR administration of vasoactive agents required (listed doses are in units of mcg/kg/min)</TableCell>
                    <TableBody>
                    {pressures.map((pressure) => (
                        <TableRow
                        key={pressure.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {pressure.criteria}
                        </TableCell>
                        <TableCell align="center">{pressure.pointValues}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>Creatinine, mg/dL (μmol/L) (or urine output)</TableCell>
                    <TableBody>
                    {creatinines.map((creatinine) => (
                        <TableRow
                        key={creatinine.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {creatinine.criteria}
                        </TableCell>
                        <TableCell align="center">{creatinine.pointValues}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="h6" align="left" mt={4} mb={1} style={{fontWeight: 'bold'}}>*Estimating FiO₂ from oxygen flow/delivery rates:</Typography>
            <TableContainer component={Paper} p={5}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold'}} align="center">Type of O₂ delivery</TableCell>
                            <TableCell style={{fontWeight: 'bold'}} align="center">Flow rates, L/min</TableCell>
                            <TableCell style={{fontWeight: 'bold'}} align="left">FiO₂</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.type}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="center" component="th" scope="row">{row.type}</TableCell>
                        <TableCell align="center">{row.flowRates}</TableCell>
                        <TableCell align="left">{row.fiOxygen}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <caption>Nasal cannula FiO₂ checklist:
                        <ul>
                            <li>Room air = 21% </li>
                            <li>1 L/min = 25%</li>
                            <li>2 L/min = 29%</li>
                            <li>3 L/min = 33%</li>
                            <li>4 L/min = 37%</li>
                            <li>5 L/min = 41%</li>
                            <li>6 L/min = 45%</li>
                        </ul>
                    </caption>
                    <caption>*Varies based on respiratory rate and minute ventilation.</caption>
                </Table>
            </TableContainer>
            <Typography variant="h6" align="left" mt={4} mb={1} style={{fontWeight: 'bold'}}>Facts & Figures</Typography>
            <TableContainer component={Paper} p={5}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold'}} align="center">SOFA Score</TableCell>
                            <TableCell style={{fontWeight: 'bold'}} align="center">Mortality if initial score</TableCell>
                            <TableCell style={{fontWeight: 'bold'}} align="left">Mortality if highest score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {sofaScores.map((sofaScore) => (
                        <TableRow
                        key={sofaScore.score}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="center" component="th" scope="row">{sofaScore.score}</TableCell>
                        <TableCell align="center">{sofaScore.initial}</TableCell>
                        <TableCell align="left">{sofaScore.highest}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold'}} align="center">Mean SOFA Score</TableCell>
                            <TableCell style={{fontWeight: 'bold'}} align="center">Mortality</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {meanSofaScores.map((sofaScore) => (
                        <TableRow
                        key={sofaScore.meanScore}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="center" component="th" scope="row">{sofaScore.meanScore}</TableCell>
                        <TableCell align="center">{sofaScore.mortality}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
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
    const [pointAllocated , setPointAllocated] = useState("-")
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