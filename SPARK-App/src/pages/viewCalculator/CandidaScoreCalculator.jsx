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
            severeSepsis: "",
            totalParenteralNutrition: "",
            initialSurgery: "",
            multifocalCandidaColonization: ""
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
            await axios.post(`${BASE_URL}/calculator/candida-score/`,
                {
                    "severeSepsis": formValues[0],
                    "totalParenteralNutrition": formValues[1],
                    "initialSurgery": formValues[2],
                    "multifocalCandidaColonization": formValues[3]
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
        <div style={{marginLeft:'5%', marginRight:'5%'}}>
            <form>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <Typography align='center'>
                                Severe Sepsis
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ToggleButtonGroup color="primary" exclusive value={formData.severeSepsis} onChange={handleInputChange}>
                                <ToggleButton value="2" name="severeSepsis">
                                    Yes
                                </ToggleButton>
                                <ToggleButton value="0" name="severeSepsis">
                                    No
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid id="surgeryType" container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <Typography align='center'>
                                Total Parenteral Nutrition
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ToggleButtonGroup color="primary" exclusive value={formData.totalParenteralNutrition} onChange={handleInputChange}>
                                <ToggleButton value="1" name="totalParenteralNutrition">
                                    Yes
                                </ToggleButton>
                                <ToggleButton value="0" name="totalParenteralNutrition">
                                    No
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <Typography align='center'>
                                Initial Surgery
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ToggleButtonGroup color="primary" exclusive value={formData.initialSurgery} onChange={handleInputChange}>
                                <ToggleButton value="1" name="initialSurgery">
                                    Yes
                                </ToggleButton>
                                <ToggleButton value="0" name="initialSurgery">
                                    No
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="baseline">
                        <Grid item xs={12} sm={6}>
                            <Typography align='center'>
                                Multifocal Candida Colonization
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ToggleButtonGroup color="primary" exclusive value={formData.multifocalCandidaColonization} onChange={handleInputChange}>
                                <ToggleButton value="1" name="multifocalCandidaColonization">
                                    Yes
                                </ToggleButton>
                                <ToggleButton value="0" name="multifocalCandidaColonization">
                                    No
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
      
    const firstRows = [
        createData('Yes', '2'),
        createData('No', '0')
    ];

    const secondRows = [
        createData('Yes', '1'),
        createData('No', '0')
    ];

    const thirdRows = [
        createData('Yes', '1'),
        createData('No', '0')
    ];

    const forthRows = [
        createData('Yes', '1'),
        createData('No', '0')
    ];

    return (
        <div style={{marginLeft:'5%', marginRight:'5%'}}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold'}}>Criteria</TableCell>
                            <TableCell style={{fontWeight: 'bold'}} align="center">Point Values</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>Severe Sepsis</TableCell>
                    <TableBody>
                    {firstRows.map((row) => (
                        <TableRow
                        key={row.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.criteria}
                        </TableCell>
                        <TableCell align="center">{row.pointValues}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>Total Parenteral Nutrition</TableCell>
                    <TableBody>
                    {secondRows.map((row) => (
                        <TableRow
                        key={row.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.criteria}
                        </TableCell>
                        <TableCell align="center">{row.pointValues}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>Initial Surgery</TableCell>
                    <TableBody>
                    {thirdRows.map((row) => (
                        <TableRow
                        key={row.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.criteria}
                        </TableCell>
                        <TableCell align="center">{row.pointValues}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>Multifocal Candida Colonization</TableCell>
                    <TableBody>
                    {forthRows.map((row) => (
                        <TableRow
                        key={row.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.criteria}
                        </TableCell>
                        <TableCell align="center">{row.pointValues}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

const CandidaScore = () => {
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
    
    //state for form fields
    const [formData, setFormData] = useState({
        severeSepsis: "",
        totalParenteralNutrition: "",
        initialSurgery: "",
        multifocalCandidaColonization: ""
    });

    //state for calc result card
    const [pointAllocated , setPointAllocated] = useState("-")
    const [interpretation , setInterpretation] = useState('Please enter the required values in the respective fields to perform the calculations.')
    const [scoreType, setScoreType] = useState('Candida')

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
                    Candida Score
                </Typography>
                <Typography variant='h6' px={2} sx={{ textAlign: 'center', color: '#04484A', fontSize: { xs: '14px', md: 'inherit' } }}>
                    To determine the likelihood of invasive candidiasis vs colonization in non-neutropenic critically ill patients.
                </Typography>
            </div>
            <div style={{textAlign: 'center', padding: '30px 0px'}}>
                <CalculatorTab tabs={tabs} />
            </div>
        </Box>
    )
}

export default CandidaScore