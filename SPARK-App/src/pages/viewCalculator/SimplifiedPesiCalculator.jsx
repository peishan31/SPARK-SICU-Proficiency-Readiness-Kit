import React from 'react'
import { Button, ToggleButtonGroup, Paper, Divider, styled } from '@mui/material'
import MuiToggleButton from "@mui/material/ToggleButton"
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import CalculatorTab from '../../components/calculatorIcon/TabPanel'
import CalcResultCard from '../../components/calculator/CalcResultCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ScrollUpButton from '../../components/scrollUpBtn/ScrollUpButton'

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
            backgroundColor: "#41ADA4",
            "&:hover": {
                backgroundColor: "#41ADA4",
                color: "white"
            }
        },
        "&:hover, &.Mui-hover": {
            color: "white",
            backgroundColor: "#41ADA4"
        }
    });

    const handleResetForm = (e) => {
        const initialFormData = {
            age: "",
            cancerHistory: "",
            chronicCardiopulmonaryHistory: "",
            heartrate: "",
            systolicBp: "",
            oxygenSaturation: ""
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
            await axios.post(`${BASE_URL}/calculator/simplified-pesi/`,
                {
                    "age": formValues[0],
                    "cancerHistory": formValues[1],
                    "chronicCardiopulmonaryHistory": formValues[2],
                    "heartrate": formValues[3],
                    "systolicBp": formValues[4],
                    "oxygenSaturation": formValues[5]
                }
            ).then(
                res => {
                    let data = res.data
                    setPointAllocated(res.data.pointAllocated)
                    console.log(res.data.result.riskGroup)
                    setInterpretation(res.data.result.riskGroup + " risk: " + res.data.result.interpretation)
                    return 200;
                }
            ).catch(
                err => {
                    return 500
                }
            )
        }
    };

    return(
        <div style={{marginLeft:'5%', marginRight:'5%'}}>
            <form>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <Typography>
                                Age, years
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ToggleButtonGroup color="primary" exclusive value={formData.age} onChange={handleInputChange}>
                                <ToggleButton name="age" value="≤80" >
                                    ≤80
                                </ToggleButton>
                                <ToggleButton name="age" value=">80">
                                    &gt;80
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <Typography>
                                History of cancer
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ToggleButtonGroup color="primary" exclusive value={formData.cancerHistory} onChange={handleInputChange}>
                                <ToggleButton name="cancerHistory" value="No">
                                    No
                                </ToggleButton>
                                <ToggleButton name="cancerHistory" value="Yes">
                                    Yes
                                </ToggleButton>
                                
                            </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <Typography>
                                History of chronic cardiopulmonary disease
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ToggleButtonGroup color="primary" exclusive value={formData.chronicCardiopulmonaryHistory} onChange={handleInputChange}>
                                <ToggleButton name="chronicCardiopulmonaryHistory" value="No">
                                    No
                                </ToggleButton>
                                <ToggleButton name="chronicCardiopulmonaryHistory" value="Yes">
                                    Yes
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <Typography>
                                Heart rate, bpm
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ToggleButtonGroup color="primary" exclusive value={formData.heartrate} onChange={handleInputChange}>
                                <ToggleButton name="heartrate" value="<110">
                                    &lt;110
                                </ToggleButton>
                                <ToggleButton name="heartrate" value="≥110">
                                    ≥110
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <Typography>
                                Systolic BP, mmHg
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ToggleButtonGroup color="primary" exclusive value={formData.systolicBp} onChange={handleInputChange}>
                                <ToggleButton name="systolicBp" value="≥100">
                                    ≥100
                                </ToggleButton>
                                <ToggleButton name="systolicBp" value="<100">
                                    &lt;100
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <Typography>
                                O₂ saturation
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ToggleButtonGroup color="primary" exclusive value={formData.oxygenSaturation} onChange={handleInputChange}>
                                <ToggleButton name="oxygenSaturation" value="≥90">
                                    ≥90%
                                </ToggleButton>
                                <ToggleButton name="oxygenSaturation" value="<90">
                                    &lt;90%
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
      
    const ages = [
        createData('≤80', '0'),
        createData('>80', '1')
    ];

    const cancerHistories = [
        createData('No', '0'),
        createData('Yes', '1')
    ];

    const diseaseHistories = [
        createData('No', '0'),
        createData('Yes', '1')
    ];

    const heartRates = [
        createData('<110', '0'),
        createData('≥110', '1')
    ];

    const systolicBps = [
        createData('≥100', '0'),
        createData('<100', '1')
    ];

    const saturations = [
        createData('≥90%', '0'),
        createData('<90%', '1')
    ];

    function createData2( score, riskGrp, interpretation ) {
        return { score, riskGrp, interpretation };
    }

    const rows = [
        createData2('0 points', 'Low', '1.1% risk of death, with 1.5% having recurrent thromboembolism or non-fatal bleeding'),
        createData2('≥1 points', 'High', '8.9% risk of death')
    ];

    return (
        <div style={{marginLeft:'5%', marginRight:'5%'}}>
            <Typography variant="h6" align="left" mt={4} mb={1} style={{fontWeight: 'bold'}}>Formula</Typography>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold'}}>Criteria</TableCell>
                            <TableCell style={{fontWeight: 'bold'}} align="center">Points</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>Age, years</TableCell>
                    <TableBody>
                    {ages.map((age) => (
                        <TableRow
                        key={age.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {age.criteria}
                        </TableCell>
                        <TableCell align="center">{age.pointValues}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>History of cancer</TableCell>
                    <TableBody>
                    {cancerHistories.map((cancerHistory) => (
                        <TableRow
                        key={cancerHistory.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {cancerHistory.criteria}
                        </TableCell>
                        <TableCell align="center">{cancerHistory.pointValues}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>History of chronic cardiopulmonary disease</TableCell>
                    <TableBody>
                    {diseaseHistories.map((diseaseHistory) => (
                        <TableRow
                        key={diseaseHistory.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {diseaseHistory.criteria}
                        </TableCell>
                        <TableCell align="center">{diseaseHistory.pointValues}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>Heart rate, bpm</TableCell>
                    <TableBody>
                    {heartRates.map((heartRate) => (
                        <TableRow
                        key={heartRate.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {heartRate.criteria}
                        </TableCell>
                        <TableCell align="center">{heartRate.pointValues}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>Systolic BP, mmHg</TableCell>
                    <TableBody>
                    {systolicBps.map((systolicBp) => (
                        <TableRow
                        key={systolicBp.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {systolicBp.criteria}
                        </TableCell>
                        <TableCell align="center">{systolicBp.pointValues}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>O2 saturation</TableCell>
                    <TableBody>
                    {saturations.map((saturation) => (
                        <TableRow
                        key={saturation.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {saturation.criteria}
                        </TableCell>
                        <TableCell align="center">{saturation.pointValues}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="h6" align="left" mt={4} mb={1} style={{fontWeight: 'bold'}}>Facts & Figures</Typography>
            <TableContainer component={Paper} p={5}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold'}} align="center">APACHE II Score</TableCell>
                            <TableCell style={{fontWeight: 'bold'}} align="center">Nonoperative</TableCell>
                            <TableCell style={{fontWeight: 'bold'}} align="left">Postoperative</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="center" component="th" scope="row">{row.score}</TableCell>
                        <TableCell align="center">{row.riskGrp}</TableCell>
                        <TableCell align="left">{row.interpretation}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

const SimplifiedPesi = () => {
    const navigate = useNavigate();
    const [showScrollButton, setShowScrollButton] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 100) {
            setShowScrollButton(true);
          } else {
            setShowScrollButton(false);
          }
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const Item = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(1),
        textAlign: 'left',
        boxShadow: 'none',
    }));

    //state for form fields
    const [formData, setFormData] = useState({
        age: "",
        cancerHistory: "",
        chronicCardiopulmonaryHistory: "",
        heartrate: "",
        systolicBp: "",
        oxygenSaturation: ""
    });

    //state for calc result card
    const [pointAllocated , setPointAllocated] = useState("-")
    const [interpretation , setInterpretation] = useState('Please enter the required values in the respective fields to perform the calculations.')
    const [scoreType, setScoreType] = useState('Simplified PESI')

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
        <Box pt={2}>
            {showScrollButton && <ScrollUpButton />}
            <div className="pageTitle">
                <div style={{padding: '5px 0px 5px 10px'}}>
                    <ArrowBackIcon onClick={(e) => { navigate(-1) }} /> 
                </div>  
                <Typography variant='h1' px={2} sx={{ fontSize: { xs: '24px', md: '30px' }, fontWeight: 'bold', marginBottom: "25px", textAlign: 'center' }}>
                    Simplified PESI (Pulmonary Embolism Severity Index)
                </Typography>
                <Typography variant='h6' px={2} sx={{ textAlign: 'center', color: '#04484A', fontSize: { xs: '14px', md: 'inherit' } }}>
                    Predicts 30-day outcome of patients with PE, with fewer criteria than the original PESI.
                </Typography>
            </div>
            <div style={{textAlign: 'center', padding: '30px 0px'}}>
                <CalculatorTab tabs={tabs} />
            </div>
        </Box>
    )
}

export default SimplifiedPesi