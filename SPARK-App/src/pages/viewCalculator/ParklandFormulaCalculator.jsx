import React from 'react'
import { Button, ToggleButton, ToggleButtonGroup, IconButton, Divider, styled } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
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

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
          }));
        // Check if all fields are entered
        
        const formValues = Object.values({ ...formData, [name]: value });
        if (formValues.some((value) => value === '' || value === undefined)) {
            setPointAllocated('0L');
            setInterpretation("Please enter the required values in the respective fields to perform the calculations.")
        }else{
            var formWeightValue = formValues[0]
            if (weightUnit == 'lbs'){
                formWeightValue = formWeightValue / 2.2046 
            }
            await axios.post(`http://localhost:8080/calculator/parkland-formula/`,
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
        <div style={{marginLeft:'10%', marginRight:'10%'}}>
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
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <p pb={2}>Formula </p>
                    <p>Fluid Requirements = TBSA burned(%) x Wt (kg) x 4mL</p>
                    <p> Give 1/2 of total requirements in 1st 8 hours, then give 2nd half over next 16 hours.   </p>
                   
                </Grid>
            </Grid>
        </Box>
    )
}

const ParklandFormula = () => {

    //state for form fields
    const [formData, setFormData] = useState({
        weight: "",
        bodyBurnPercentage: ""
    });

    //state for calc result card
    const [pointAllocated , setPointAllocated] = useState('0L')
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
        <Box pt={5}>
            <div className="pageTitle">
                <h1 style={{fontSize: '30px', fontWeight: 'bold', marginBottom: "25px", textAlign: 'center'}}>Parkland Formula for Burns</h1>
                <h6 style={{textAlign: 'center', color: '#04484A'}}>Calculates fluid requirements for burn patients in a 24-hour period.</h6>
            </div>
            <div style={{textAlign: 'center', padding: '50px 0px'}}>
                <CalculatorTab tabs={tabs} />
            </div>
        </Box>
    )
}

export default ParklandFormula