import React from 'react'
import { Button } from '@mui/material'
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

    const tabs = [
        {
          label: "General Information",
          Component: (
            <form onSubmit={handleSubmit}>
                <Grid container alignItems="center" justify="center" direction="column" style={{margin: '50px'}}>
                    <Grid item>calculator fields here</Grid>
                    <Button variant="contained" color="primary" type="submit">
                    Submit
                    </Button>
                </Grid>
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