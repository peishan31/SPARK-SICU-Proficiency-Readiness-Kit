import React from 'react'
import { Button, Paper, Divider, styled } from '@mui/material'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react'
import CalculatorTab from '../../components/calculatorIcon/TabPanel'
import TextField from '@mui/material/TextField';
import CalcResultCard from '../../components/calculator/CalcResultCard';

function Tab1Content(props){

    const {formData, setFormData, pointAllocated , setPointAllocated, interpretation , setInterpretation, scoreType} = props;

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
            await axios.post(`http://localhost:8080/calculator/rox-index/`,
                {
                    "SpO": formValues[0],
                    "FiO": formValues[1],
                    "respiratoryRate": formValues[2]
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
                    <Grid container spacing={4} mb={3} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography align='left'>
                                SpO₂
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField label="%" type="number" variant="outlined" name="spo" value={formData.spo} onChange={handleInputChange}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography align='left'>
                                FiO₂
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField label="%" type="number" variant="outlined" name="fio" value={formData.fio} onChange={handleInputChange}/>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} mb={3} justifyContent="left" alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography align='left'>
                                Respiratory rate
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField label="breaths/min" type="number" variant="outlined" name="respiratoryRate" value={formData.respiratoryRate} onChange={handleInputChange}/>
                        </Grid>
                    </Grid>
                    <div>
                        <Button variant="contained" sx={{mt: 2}} color="primary" type="submit">
                            Reset
                        </Button>
                        {/* <Button variant="contained" sx={{m: 2}} color="primary" type="submit">
                            Calculate
                        </Button> */}
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
        
       
            </Grid> 
        </Box>
    )
}
const RoxIndex = () => {
    
    const Item = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(1),
        textAlign: 'left',
        boxShadow: 'none',
    }));

    //state for form fields
    const [formData, setFormData] = useState({
        spo: "",
        fio: "",
        respiratoryRate: ""
    });

    //state for calc result card
    const [pointAllocated , setPointAllocated] = useState(0)
    const [interpretation , setInterpretation] = useState('Please enter the required values in the respective fields to perform the calculations.')
    const [scoreType, setScoreType] = useState('ROX Index')

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
                <h1 style={{fontSize: '30px', fontWeight: 'bold', marginBottom: "25px", textAlign: 'center'}}>ROX Index for Intubation after HFNC</h1>
                <h6 style={{textAlign: 'center', color: '#04484A'}}>Predicts high-flow nasal cannula (HFNC) failure/need for intubation.</h6>
            </div>
            <div style={{textAlign: 'center', padding: '50px 0px'}}>
                <CalculatorTab tabs={tabs} />
            </div>
        </Box>
    )
}

export default RoxIndex