import React from 'react'
import { Button, ToggleButton, ToggleButtonGroup, Paper, Divider, styled } from '@mui/material'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react'
import CalculatorTab from '../../components/calculatorIcon/TabPanel'
import CalcResultCard from '../../components/calculator/CalcResultCard';

function Tab1Content(props){
    const {formData, setFormData, pointAllocated , setPointAllocated, interpretation , setInterpretation, scoreType} = props;
    
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

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
          }));
        // Check if all fields are entered
        
        const formValues = Object.values({ ...formData, [name]: value });console.log(formValues)
        if (formValues.some((value) => value === '' || value === undefined)) {
            setPointAllocated(0);
            setInterpretation("Please enter the required values in the respective fields to perform the calculations.")
        }else{
            console.log("entered")
            await axios.post(`http://localhost:8080/calculator/simplified-pesi/`,
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
        <div style={{marginLeft:'10%', marginRight:'10%'}}>
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
                    ≤80
                </Grid>
                <Grid item xs={6}>
                    0
                </Grid>
                <Grid item xs={6}>
                    {">"}80
                </Grid>
                <Grid item xs={6}>
                    1
                </Grid>
                
                <Grid item xs={6}>
                    <strong>History of cancer</strong>
                </Grid>
                <Grid item xs={6}>
                    <strong>Point values</strong>
                </Grid>
                <Grid item xs={6}>
                    No
                </Grid>
                <Grid item xs={6}>
                    0
                </Grid>
                <Grid item xs={6}>
                    Yes
                </Grid>
                <Grid item xs={6}>
                    1
                </Grid>

                <Grid item xs={6}>
                    <strong>History of cancer</strong>
                </Grid>
                <Grid item xs={6}>
                    <strong>Point values</strong>
                </Grid>
                <Grid item xs={6}>
                    No
                </Grid>
                <Grid item xs={6}>
                    0
                </Grid>
                <Grid item xs={6}>
                    Yes
                </Grid>
                <Grid item xs={6}>
                    1
                </Grid>

                <Grid item xs={6}>
                    <strong>History of chronic cardiopulmonary disease</strong>
                </Grid>
                <Grid item xs={6}>
                    <strong>Point values</strong>
                </Grid>
                <Grid item xs={6}>
                    No
                </Grid>
                <Grid item xs={6}>
                    0
                </Grid>
                <Grid item xs={6}>
                    Yes
                </Grid>
                <Grid item xs={6}>
                    1
                </Grid>

                <Grid item xs={6}>
                    <strong>Heart rate, bpm</strong>
                </Grid>
                <Grid item xs={6}>
                    <strong>Point values</strong>
                </Grid>
                <Grid item xs={6}>
                    {"<"}110
                </Grid>
                <Grid item xs={6}>
                    0
                </Grid>
                <Grid item xs={6}>
                    ≥110
                </Grid>
                <Grid item xs={6}>
                    1
                </Grid>
                
                <Grid item xs={6}>
                    <strong>Systolic BP, mmHg</strong>
                </Grid>
                <Grid item xs={6}>
                    <strong>Point values</strong>
                </Grid>
                <Grid item xs={6}>
                    ≥100
                </Grid>
                <Grid item xs={6}>
                    0
                </Grid>
                <Grid item xs={6}>
                    {"<"}100
                </Grid>
                <Grid item xs={6}>
                    1
                </Grid>

                <Grid item xs={6}>
                    <strong>O₂ saturation</strong>
                </Grid>
                <Grid item xs={6}>
                    <strong>Point values</strong>
                </Grid>
                <Grid item xs={6}>
                    ≥100
                </Grid>
                <Grid item xs={6}>
                    0
                </Grid>
                <Grid item xs={6}>
                    {"<"}100
                </Grid>
                <Grid item xs={6}>
                    1
                </Grid>

                <Grid item xs={12} mt={5}>Facts & Figure</Grid>
                
                <Grid item xs={4}>
                    <strong>Score</strong>
                </Grid>
                <Grid item xs={4}>
                    <strong>Risk group</strong>
                </Grid>
                <Grid item xs={4}>
                    <strong>Interpretation</strong>
                </Grid>
                <Grid item xs={4}>
                    0 points
                </Grid>
                <Grid item xs={4}>
                    Low
                </Grid>
                <Grid item xs={4}>
                    1.1% risk of death, with 1.5% having recurrent thromboembolism or non-fatal bleeding
                </Grid>
                <Grid item xs={4}>
                    ≥1 points
                </Grid>
                <Grid item xs={4}>
                    High
                </Grid>
                <Grid item xs={4}>
                    8.9% risk of death
                </Grid>
            </Grid> 
        </Box>
    )
}

const SimplifiedPesi = () => {

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
    const [pointAllocated , setPointAllocated] = useState(0)
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
        <Box pt={5}>
            <div className="pageTitle">
                <h1 style={{fontSize: '30px', fontWeight: 'bold', marginBottom: "25px", textAlign: 'center'}}>Simplified PESI (Pulmonary Embolism Severity Index)</h1>
                <h6 style={{textAlign: 'center', color: '#04484A'}}>Predicts 30-day outcome of patients with PE, with fewer criteria than the original PESI.</h6>
            </div>
            <div style={{textAlign: 'center', padding: '50px 0px'}}>
                <CalculatorTab tabs={tabs} />
            </div>
        </Box>
    )
}

export default SimplifiedPesi