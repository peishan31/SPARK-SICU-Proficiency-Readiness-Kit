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

const RoxIndex = () => {
    const handleSubmit = (event) => {
        // event.preventDefault();
        // console.log(formValues);
      };

    const Item = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(1),
        textAlign: 'left',
        boxShadow: 'none',
    }));

    const tabs = [
        {
          label: "General Information",
          Component: (
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
                                <TextField label="%" variant="outlined" name="age"/>
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
                                <TextField label="%" variant="outlined" name="temperature"/>
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
                                <TextField label="breaths/min" variant="outlined" name="age"/>
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