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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function Tab1Content(props){

    const {formData, setFormData, pointAllocated , setPointAllocated, interpretation , setInterpretation, scoreType} = props;

    const handleResetForm = (e) => {
        const initialFormData = {
            spo: "",
            fio: "",
            respiratoryRate: ""
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
            setPointAllocated("-");
            setInterpretation("Please enter the required values in the respective fields to perform the calculations.")
        }else{
            await axios.post(`${BASE_URL}/calculator/rox-index/`,
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
        <div style={{marginLeft:'5%', marginRight:'5%'}}>
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
                        <Button variant="contained" sx={{mt: 2, backgroundColor: '#41ADA4'}} type="submit" onClick="{handleResetForm}"> 
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

    function createData( data ) {
        return { data };
    }

    function createData2( type, flowRates, fiOxygen ) {
        return { type, flowRates, fiOxygen };
    }
          
    const rows2 = [
        createData2('0-4', '4%', '1%'),
        createData2('5-9', '8%', '3%'),
        createData2('10-14', '15%', '7%'),
        createData2('15-19', '25%', '12%'),
        createData2('20-24', '40%', '30%'),
        createData2('25-29', '55%', '35%'),
        createData2('30-34', '73%', '73%'),
        createData2('>34', '85%', '88%')
    ];
              
    const rows = [
        createData(
            <div>
                <Typography style={{fontWeight: 'bold'}}>Formula</Typography>
                <ul>
                    <li>ROX Index = SpO₂/FiO₂*, % / Respiratory rate, breaths/min</li>
                    <li>*Estimating FiO₂ from oxygen flow/delivery rates:</li>
                </ul>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontWeight: 'bold'}} align="center">Type of O₂ delivery</TableCell>
                                <TableCell style={{fontWeight: 'bold'}} align="center">Flow rates, L/min</TableCell>
                                <TableCell style={{fontWeight: 'bold'}} align="center">FiO₂</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows2.map((row) => (
                            <TableRow
                            key={row.type}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{row.type}</TableCell>
                                <TableCell align="center">{row.flowRates}</TableCell>
                                <TableCell align="center">{row.fiOxygen}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        ),
        createData(
            <div>    
                <Typography style={{fontWeight: 'bold'}}>Facts & Figures</Typography>
                <Typography>Interpretation:</Typography>
                <ul>
                    <li>ROX Index ≥4.88 measured at 2, 6, or 12 hours after high-flow nasal cannula (HFNC) initiation is associated with a lower risk for intubation.</li>
                    <li>For a ROX Index &lt;3.85, risk of HFNC failure is high, and intubating the patient should be discussed. </li>
                    <li>If ROX Index 3.85 to &lt;4.88, the scoring could be repeated one or two hours later for further evaluation.</li>
                </ul>
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
    const [pointAllocated , setPointAllocated] = useState("-")
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
            <Typography variant='h1' px={2} sx={{ fontSize: { xs: '24px', md: '30px' }, fontWeight: 'bold', marginBottom: "25px", textAlign: 'center' }}>
                ROX Index for Intubation after HFNC
            </Typography>
            <Typography variant='h6' px={2} sx={{ textAlign: 'center', color: '#04484A', fontSize: { xs: '14px', md: 'inherit' } }}>
                Predicts high-flow nasal cannula (HFNC) failure/need for intubation.
            </Typography>
            </div>
            <div style={{textAlign: 'center', padding: '30px 0px'}}>
                <CalculatorTab tabs={tabs} />
            </div>
        </Box>
    )
}

export default RoxIndex