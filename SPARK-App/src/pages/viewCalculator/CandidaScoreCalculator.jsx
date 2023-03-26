import React from 'react'
import { Button, ToggleButtonGroup, Paper, Divider, styled } from '@mui/material'
import MuiToggleButton from "@mui/material/ToggleButton"
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react'
import CalculatorTab from '../../components/calculatorIcon/TabPanel'
import CalcResultCard from '../../components/calculator/CalcResultCard';

function Tab1Content(props){

    const {formData, setFormData, pointAllocated , setPointAllocated, interpretation , setInterpretation, scoreType} = props;

    const ToggleButton = styled(MuiToggleButton)({
        "&.Mui-selected": {
          color: "white",
          backgroundColor: '#41ADA4'
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
            await axios.post(`http://localhost:8080/calculator/candida-score/`,
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
        <div style={{marginLeft:'10%', marginRight:'10%'}}>
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
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12}>Point Values</Grid>
                
                <Grid item xs={6}>
                    <strong>Severe Sepsis</strong>
                </Grid>
                <Grid item xs={6}>
                    <strong>Point values</strong>
                </Grid>
                <Grid item xs={6}>
                    Yes
                </Grid>
                <Grid item xs={6}>
                    2
                </Grid>
                <Grid item xs={6}>
                    No
                </Grid>
                <Grid item xs={6}>
                    0
                </Grid>
       
                <Grid item xs={6}>
                    <strong>Total Parenteral Nutrition</strong>
                </Grid>
                <Grid item xs={6}>
                    <strong>Point values</strong>
                </Grid>
                <Grid item xs={6}>
                    Yes
                </Grid>
                <Grid item xs={6}>
                    1
                </Grid>
                <Grid item xs={6}>
                    No
                </Grid>
                <Grid item xs={6}>
                    0
                </Grid>

                <Grid item xs={6}>
                    <strong>Initial Surgery</strong>
                </Grid>
                <Grid item xs={6}>
                    <strong>Point values</strong>
                </Grid>
                <Grid item xs={6}>
                    Yes
                </Grid>
                <Grid item xs={6}>
                    1
                </Grid>
                <Grid item xs={6}>
                    No
                </Grid>
                <Grid item xs={6}>
                    0
                </Grid>
                
                <Grid item xs={6}>
                    <strong>Multifocal Candida Colonization</strong>
                </Grid>
                <Grid item xs={6}>
                    <strong>Point values</strong>
                </Grid>
                <Grid item xs={6}>
                    Yes
                </Grid>
                <Grid item xs={6}>
                    1
                </Grid>
                <Grid item xs={6}>
                    No
                </Grid>
                <Grid item xs={6}>
                    0
                </Grid>
            </Grid> 
        </Box>
    )
}

const CandidaScore = () => {
    
    //state for form fields
    const [formData, setFormData] = useState({
        severeSepsis: "",
        totalParenteralNutrition: "",
        initialSurgery: "",
        multifocalCandidaColonization: ""
    });

    //state for calc result card
    const [pointAllocated , setPointAllocated] = useState(0)
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
        <Box pt={5}>
            <div className="pageTitle">
                <h1 style={{fontSize: '30px', fontWeight: 'bold', marginBottom: "25px", textAlign: 'center'}}>Candida Score</h1>
                <h6 style={{textAlign: 'center', color: '#04484A'}}>To determine the likelihood of invasive candidiasis vs colonization in non-neutropenic critically ill patients.</h6>
            </div>
            <div style={{textAlign: 'center', padding: '50px 0px'}}>
                <CalculatorTab tabs={tabs} />
            </div>
        </Box>
    )
}

export default CandidaScore