import React from 'react'
import { Button, Paper, Divider, styled } from '@mui/material'
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

const RoxIndex = () => {
    //state for calc result card
    const [pointAllocated , setPointAllocated] = useState(0)
    const [interpretation , setInterpretation] = useState('Please enter the required values in the respective fields to perform the calculations.')

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        await axios.post(
            `http://localhost:8080/calculator/rox-index/`,
            {
            
                "SpO": event.target.spo.value,
                "FiO": event.target.fio.value,
                "respiratoryRate": event.target.respiratoryRate.value
        }
        ).then(
            res => {
                let data = res.data
                setPointAllocated(res.data.pointAllocated)
                setInterpretation(res.data.result.interpretation)
                var result = res.data.result
                console.log(data)
                return 200;
            }
        ).catch(
            err => {
                return 500
            }
        )
        //console.log(formValues);
        
    };

    useEffect(() => {
        // This should log offers to the console if it has been set
        if(pointAllocated) {
          console.log(pointAllocated)
        }
      }, [pointAllocated])

      useEffect(() => {
        // This should log offers to the console if it has been set
        if(interpretation) {
          console.log(interpretation)
        }
      }, [interpretation])

    const Item = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(1),
        textAlign: 'left',
        boxShadow: 'none',
    }));

    const tabs = [
        {
          label: "General Information",
          Component: (
            <div style={{marginLeft:'10%', marginRight:'10%'}}>
            <form onSubmit={handleSubmit}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <Typography>
                                    SpO₂
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <TextField label="%" variant="outlined" name="spo"/>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <Typography>
                                    FiO₂
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <TextField label="%" variant="outlined" name="fio"/>
                            </Item>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} justifyContent="left" alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <Typography>
                                    Respiratory rate
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <TextField label="breaths/min" variant="outlined" name="respiratoryRate"/>
                            </Item>
                        </Grid>
                    </Grid>
                    <div>
                        <Button variant="contained" sx={{m: 2}} color="primary" type="submit">
                            Reset
                        </Button>
                        <Button variant="contained" sx={{m: 2}} color="primary" type="submit">
                            Calculate
                        </Button>
                    </div>
                </Box>
            </form>  
            <Typography variant="h6" mt={5} mb={1} sx={{fontWeight:'bold'}} component="div">
                Results
            </Typography>
            <CalcResultCard pointAllocated={pointAllocated} interpretation={interpretation}></CalcResultCard>
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