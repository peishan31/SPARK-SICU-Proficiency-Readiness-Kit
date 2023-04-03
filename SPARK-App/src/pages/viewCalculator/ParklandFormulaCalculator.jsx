import React from 'react'
import { Button, ToggleButton, ToggleButtonGroup, IconButton, Paper, Divider, styled } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import CalculatorTab from '../../components/calculatorIcon/TabPanel'
import TextField from '@mui/material/TextField';
import CalcResultCard from '../../components/calculator/CalcResultCard';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
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
    
    // Handle units of measurement
    // Weight unit
    const [weightUnitStatus, setWeightUnit] = useState(false);
    var weightUnit = 'kg';
    const convertWeightUnit = (e) => {
        e.preventDefault();
        setWeightUnit(!weightUnitStatus)
        var priorWeightUnit = weightUnit;
        if(priorWeightUnit == 'kg'){
            setFormData((prevFormData) => ({
                ...prevFormData,
                weight: (formData.weight) * 2.2046
            }));
        }else{
            setFormData((prevFormData) => ({
                ...prevFormData,
                weight: (formData.weight) / 2.2046
            }));
        }
    }

    if(weightUnitStatus == true){
        weightUnit = 'lbs';
    }else{
        weightUnit = 'kg'
    }
    
    const handleResetForm = (e) => {
        const initialFormData = {
            weight: "",
            bodyBurnPercentage: ""
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
            setPointAllocated('-');
            setInterpretation("Please enter the required values in the respective fields to perform the calculations.")
        }else{
            var formWeightValue = formValues[0]
            if (weightUnit == 'lbs'){
                formWeightValue = formWeightValue / 2.2046 
            }
            await axios.post(`${BASE_URL}/calculator/parkland-formula/`,
                {
                    "weight": formWeightValue,
                    "bodyBurnPercentage": formValues[1]
                }
            ).then(
                res => {
                    let data = res.data
                    setPointAllocated(res.data.totalFluid + "L")
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

    return(
        <div style={{marginLeft:'5%', marginRight:'5%'}}>
            <form>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography align='left'>
                                Weight
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} style={{display: 'inline-flex'}}>
                            <TextField label={weightUnit} variant="outlined" type="number" name="weight" value={formData.weight} onChange={handleInputChange}/>
                            <IconButton onClick={convertWeightUnit} sx={{color: '#41ADA4'}}>
                                <ChangeCircleIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography align='left'>
                                Estimated percentage body burned
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} style={{display: 'inline-flex'}}>
                            <TextField label="%" variant="outlined" type="number" name="bodyBurnPercentage" value={formData.bodyBurnPercentage} onChange={handleInputChange}/>
                            <IconButton sx={{visibility: 'hidden'}}>
                                <ChangeCircleIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    
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

    function createData( data ) {
        return { data };
    }
              
    const rows = [
        createData(
            <div>
                <Typography style={{fontWeight: 'bold'}}>Formula</Typography>
                <Typography>Fluid Requirements = TBSA burned(%) x Wt (kg) x 4mL</Typography>
                <Typography>Give 1/2 of total requirements in 1st 8 hours, then give 2nd half over next 16 hours.</Typography>
            </div>
        ),
        createData(
            <div>    
                <Typography style={{fontWeight: 'bold'}}>Facts & Figures</Typography>
                <Typography>Administration of fluids:</Typography>
                <ul>
                    <li>Give 1/2 of total requirements in 1st 8 hours (time from when the burn occurred), then give 2nd half over next 16 hours.</li>
                </ul>
                <Typography>Estimation:</Typography>
                <ul>
                    <li>Rule of 9's for Adults: 9% for each arm, 18% for each leg, 9% for head,18% for front torso, 18% for back torso.</li>
                    <li>Rule of 9's for Children: 9% for each arm, 14% for each leg, 18% for head, 18% for front torso, 18% for back torso.</li>
                </ul>
            </div>
        ),
        createData(
            <div>
                <Typography style={{fontWeight: 'bold'}}>Wallace Rule of Nines:</Typography>
                <Box
                    component="img"
                    src="https://res.cloudinary.com/dckx3nboq/image/upload/v1679819052/wallace-rule-of-nines_odugix.jpg"
                    sx={{
                            height: 450,
                        '@media (max-width: 600px)': {
                            height: 380,
                        },
                        '@media (max-width: 500px)': {
                            height: 320,
                        },
                        '@media (max-width: 380px)': {
                            height: 260,
                        }
                    }}
                />
            </div>
        )
    ];

    return (
        <div style={{marginLeft:'5%', marginRight:'5%'}}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {row.data}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

const ParklandFormula = () => {
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
        weight: "",
        bodyBurnPercentage: ""
    });

    //state for calc result card
    const [pointAllocated , setPointAllocated] = useState('-')
    const [interpretation , setInterpretation] = useState('Please enter the required values in the respective fields to perform the calculations.')
    const [scoreType, setScoreType] = useState('Fluid Requirement')

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
                    Parkland Formula for Burns
                </Typography>
                <Typography variant='h6' px={2} sx={{ textAlign: 'center', color: '#04484A', fontSize: { xs: '14px', md: 'inherit' } }}>
                    Calculates fluid requirements for burn patients in a 24-hour period.
                </Typography>
            </div>
            <div style={{textAlign: 'center', padding: '30px 0px'}}>
                <CalculatorTab tabs={tabs} />
            </div>
        </Box>
    )
}

export default ParklandFormula