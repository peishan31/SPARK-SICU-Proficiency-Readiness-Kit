import React from 'react'
import { Button, ToggleButton, ToggleButtonGroup, Paper, Divider, styled } from '@mui/material'
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

const ParklandFormula = () => {
    const handleSubmit = (event) => {
        // event.preventDefault();
        // console.log(formValues);
      };

    // Handle units of measurement
    // Weight unit
    const [weightUnitStatus, setWeightUnit] = useState(false);
    var weightUnit = 'kg';
    const convertWeightUnit = (e) => {
        setWeightUnit(!weightUnitStatus)
    }
    if(weightUnitStatus == true){
        weightUnit = 'lbs';
    }else{
        weightUnit = 'kg'
    }

    const tabs = [
        {
          label: "General Information",
          Component: (
            <div style={{marginLeft:'10%', marginRight:'10%'}}>
            <form onSubmit={handleSubmit}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                                <Typography align='left'>
                                    Weight
                                </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} style={{display: 'inline-flex'}}>
                                <TextField label={weightUnit} variant="outlined" name="age"/>
                                <Button variant="outlined" onClick={convertWeightUnit} sx={{ml: 1, fontSize: 25}}>&#128177;</Button>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                                <Typography align='left'>
                                    Estimated percentage body burned
                                </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                                <TextField label="%" variant="outlined" name="temperature"/>
                        </Grid>
                    </Grid>
                    
                    <div>
                        <Button variant="contained" sx={{m: 2}} color="primary" type="submit">
                            Reset
                        </Button>
                    </div>
                </Box>
            </form>
            <Typography variant="h6" mt={5} mb={1} sx={{fontWeight:'bold'}} component="div">
                Results
            </Typography>
            <CalcResultCard></CalcResultCard>
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