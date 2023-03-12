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

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

const ApacheIIScore = () => {
    const handleSubmit = (event) => {
        // event.preventDefault();
        // console.log(formValues);
      };

    const Item = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(1),
        textAlign: 'left',
        boxShadow: 'none',
    }));

    const [fiOxygen, setFiOxygen] = React.useState('');

    const handleChange = (e, newFiOxygen) => {
      setFiOxygen(newFiOxygen);
      if(newFiOxygen == 'lessThan') {
          document.getElementById('paOxygen').style.display = "flex";
          document.getElementById('aaGradient').style.display = "none";
    }
      else if(newFiOxygen == 'moreOrEqualTo') {
          document.getElementById('aaGradient').style.display = "flex";
          document.getElementById('paOxygen').style.display = "none";
      } else {
          document.getElementById('paOxygen').style.display = "none";
          document.getElementById('aaGradient').style.display = "none";
      }
    };

    const tabs = [
        {
          label: "General Information",
          Component: (
            <form onSubmit={handleSubmit}>
                {/* <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
                    noValidate autoComplete="off"
                >

                </Box> */}
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <Typography>
                                    Age
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <TextField label="Years" variant="outlined" />
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <Typography>
                                    Temperature
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <TextField label="°C" variant="outlined" />
                                {/* <Button variant="outlined" sx={{ml: 1, fontSize: 25}}>&#128177;</Button> */}
                            </Item>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <Typography>
                                    Mean arterial pressure
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <TextField label="mm Hg" variant="outlined" />
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <Typography>
                                    pH
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <TextField label="pH" variant="outlined" />
                            </Item>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <Typography>
                                    Heart rate/pulse
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <TextField label="beats/min" variant="outlined" />
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <Typography>
                                    Respiratory rate
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <TextField label="breaths/min" variant="outlined" />
                            </Item>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <Typography>
                                    Sodium
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <TextField label="mmol/L" variant="outlined" />
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <Typography>
                                    Potassium
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <TextField label="mmol/L" variant="outlined" />
                            </Item>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <Typography>
                                    Creatinine
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <TextField label="µmol/L" variant="outlined" />
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <Typography>
                                    Hematocrit
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <TextField label="%" variant="outlined" />
                            </Item>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <Typography>
                                    White blood cell count
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <TextField label="× 10⁹ cells/L" variant="outlined" />
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <Typography>
                                    Glasgow Coma Scale
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>
                                <TextField label="points" variant="outlined" />
                            </Item>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <Item>
                                <Typography>
                                    History of severe organ failure or immunocompromise
                                </Typography>
                                <Typography variant="caption">
                                    Heart Failure Class IV, cirrhosis, chronic lung disease, or dialysis-dependent
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Item>
                                <ToggleButtonGroup exclusive>
                                    <ToggleButton value="yes">
                                        Yes
                                    </ToggleButton>
                                    <ToggleButton value="no">
                                        No
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Item>
                        </Grid>
                        </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <Item>
                                <Typography>
                                    Acute renal failure
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Item>
                                <ToggleButtonGroup exclusive>
                                    <ToggleButton value="yes">
                                        Yes
                                    </ToggleButton>
                                    <ToggleButton value="no">
                                        No
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Item>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <Item>
                                <Typography>
                                    FiO₂
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Item>
                                <ToggleButtonGroup color="primary" value={fiOxygen} exclusive onChange={handleChange}>
                                    <ToggleButton value="lessThan">
                                        &lt;50% (or non-intubated)
                                    </ToggleButton>
                                    <ToggleButton value="moreOrEqualTo">
                                        ≥50%
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Item>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid id="paOxygen" container spacing={2} justifyContent="center" alignItems="center" style={{display:'none'}}>
                        <Grid item xs={12} sm={6}>
                            <Item>
                                <Typography>
                                    PaO₂, mmHg
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Item>
                                <ToggleButtonGroup exclusive>
                                    <ToggleButton value="">
                                        &gt; 70
                                    </ToggleButton>
                                    <ToggleButton value="">
                                        61 - 70
                                    </ToggleButton>
                                    <ToggleButton value="">
                                        55 - 60
                                    </ToggleButton>
                                    <ToggleButton value="">
                                        &lt; 55
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Item>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid id="aaGradient" container spacing={2} justifyContent="center" alignItems="center" style={{display:'none'}}>
                        <Grid item xs={12} sm={6}>
                            <Item>
                                <Typography>
                                    A-a gradient
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Item>
                                <ToggleButtonGroup exclusive>
                                    <ToggleButton value="">
                                        &lt; 200
                                    </ToggleButton>
                                    <ToggleButton value="">
                                        200 - 349
                                    </ToggleButton>
                                    <ToggleButton value="">
                                        350 - 499
                                    </ToggleButton>
                                    <ToggleButton value="">
                                        &gt; 499
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Item>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
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
                <h1 style={{fontSize: '30px', fontWeight: 'bold', marginBottom: "25px", textAlign: 'center'}}>APACHE II Score</h1>
                <h6 style={{textAlign: 'center', color: '#04484A'}}>Estimates ICU mortality.</h6>
            </div>
            <div style={{textAlign: 'center', padding: '50px 0px'}}>
                <CalculatorTab tabs={tabs} />
            </div>
        </Box>
    )
}

export default ApacheIIScore