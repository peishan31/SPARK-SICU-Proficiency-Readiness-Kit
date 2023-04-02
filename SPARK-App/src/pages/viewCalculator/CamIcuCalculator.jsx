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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function Tab1Content(props){

    const {formDisplay, setFormDisplay, formData, setFormData, pointAllocated , setPointAllocated, interpretation , setInterpretation, scoreType} = props;

    const ToggleButton = styled(MuiToggleButton)({
        "&.Mui-selected": {
          color: "white",
          backgroundColor: '#41ADA4'
        },
        "&:hover, &.Mui-hover": {
            color: "white",
            backgroundColor: '#41ADA4'
        }
    });

    const handleResetForm = (e) => {
        const initialFormData = {
            "rass": "",
            "acuteOnset": "",
            "fluctuatingCourse": "",
            "inattention": "",
            "levelOfConsciousness": "",
            "disorganizedThinking": ""
        };
        setFormData(initialFormData);

        const initialFormDisplay = {
            "q2and3": "none",
            "q4": "none",
            "q5": "none",
            "q6": "none"
        }
        setFormDisplay(initialFormDisplay)
    }

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        if (name == "rass" && value == "yes"){
            setFormData((prevFormData) => ({
                ...prevFormData,
                acuteOnset: "no",
                fluctuatingCourse: "no",
                inattention: "no",
                levelOfConsciousness: "no",
                disorganizedThinking: "no"
            }));

            setFormDisplay((prevFormData) => ({
                ...prevFormData,
                q2and3: "block"
            }));
            //document.getElementById('q2and3').style.display = "block";
        }else if (name == "rass" && value == "no"){
            setFormData((prevFormData) => ({
                ...prevFormData,
                acuteOnset: "no",
                fluctuatingCourse: "no",
                inattention: "no",
                levelOfConsciousness: "no",
                disorganizedThinking: "no"
            }));

            setFormDisplay((prevFormData) => ({
                ...prevFormData,
                q2and3: "none",
                q4: "none",
                q5: "none",
                q6: "none"
            }));
            // document.getElementById('q2and3').style.display = "none";
            // document.getElementById('q4').style.display = "none";
            // document.getElementById('q5').style.display = "none";
            // document.getElementById('q6').style.display = "none";
        }else if ((name == "acuteOnset" && value == "yes") || (name == "fluctuatingCourse" && value == "yes")){
            // document.getElementById('q4').style.display = "block";
            setFormDisplay((prevFormData) => ({
                ...prevFormData,
                q4: "block"
            }));

            setFormData((prevFormData) => ({
                ...prevFormData,
                inattention: "no",
                levelOfConsciousness: "no",
                disorganizedThinking: "no"
            }));
        }else if (((name == "acuteOnset" && value == "no") && formData.fluctuatingCourse == "no") || ((name == "fluctuatingCourse" && value == "no") && formData.acuteOnset == "no")){
            setFormDisplay((prevFormData) => ({
                ...prevFormData,
                q4: "none",
                q5: "none",
                q6: "none"
            }));

            setFormData((prevFormData) => ({
                ...prevFormData,
                inattention: "no",
                levelOfConsciousness: "no",
                disorganizedThinking: "no"
            }));
            
            // document.getElementById('q4').style.display = "none";
            // document.getElementById('q5').style.display = "none";
            // document.getElementById('q6').style.display = "none";
        }else if (name == "inattention" && value == "yes"){
            setFormDisplay((prevFormData) => ({
                ...prevFormData,
                q5: "block",
                q6: "block"
            }));
            // document.getElementById('q5').style.display = "block";
            // document.getElementById('q6').style.display = "block";
            setFormData((prevFormData) => ({
                ...prevFormData,
                levelOfConsciousness: "no",
                disorganizedThinking: "no"
            }));
        }else if (name == "inattention" && value == "no"){
            setFormDisplay((prevFormData) => ({
                ...prevFormData,
                q5: "none",
                q6: "none"
            }));
            // document.getElementById('q5').style.display = "none";
            // document.getElementById('q6').style.display = "none";
            setFormData((prevFormData) => ({
                ...prevFormData,
                levelOfConsciousness: "no",
                disorganizedThinking: "no"
            }));
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
          }));
    };

    return (
        <div style={{marginLeft:'5%', marginRight:'5%'}}>
            <form>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography align='left' variant='overline' display="block" p={1} style={{fontWeight: 'bold', color: 'white', backgroundColor: '#41ADA4'}}>
                        Level of Consciousnss
                    </Typography>
                    <Grid container spacing={2} my={1} pb={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6}>
                                <Typography align='left'>
                                    RASS ≥ -3
                                </Typography>
                                <Typography align='left' variant='caption' display="block">
                                    Or other scoring system shows sufficient level of consciousness
                                </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                                <ToggleButtonGroup color="primary" exclusive value={formData.rass} onChange={handleInputChange}>
                                    <ToggleButton value="no" name="rass">
                                        No
                                    </ToggleButton>
                                    <ToggleButton value="yes" name="rass">
                                        Yes
                                    </ToggleButton>
                                    
                                </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <Grid id="q2and3" style={{display: formDisplay.q2and3 } }>
                    <Typography align='left' variant='overline' display="block" p={1} style={{fontWeight: 'bold', color: 'white', backgroundColor: '#41ADA4'}}>
                        Feature 1: Acute Onset or Fluctuating Course
                    </Typography>
                    <Grid id="surgeryType" container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6}>
                                <Typography align='left'>
                                    Patient different than baseline, pre-hospital mental status
                                </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                                <ToggleButtonGroup color="primary" exclusive value={formData.acuteOnset} onChange={handleInputChange}>
                                    <ToggleButton value="no" name="acuteOnset">
                                        No
                                    </ToggleButton>
                                    <ToggleButton value="yes" name="acuteOnset">
                                        Yes
                                    </ToggleButton>
                                </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} my={1} pb={1} justifyContent="center" alignItems="center" >
                        <Grid item xs={12} sm={6}>
                                <Typography align='left'>
                                    Patient with fluctuating mental status in past 24 hours by fluctuation of level of consciousness/sedation
                                </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                                <ToggleButtonGroup color="primary" exclusive value={formData.fluctuatingCourse} onChange={handleInputChange}>
                                    <ToggleButton value="no" name="fluctuatingCourse">
                                        No
                                    </ToggleButton>
                                    <ToggleButton value="yes" name="fluctuatingCourse">
                                        Yes
                                    </ToggleButton>
                                    
                                </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    </Grid>
                    <Grid id="q4" style={{display: formDisplay.q4 } }>
                    <Typography align='left' variant='overline' display="block" p={1} style={{fontWeight: 'bold', color: 'white', backgroundColor: '#41ADA4'}}>
                        Feature 2: Inattention
                    </Typography>
                    <Grid container spacing={2} my={1} pb={1} justifyContent="center" alignItems="baseline">
                        <Grid item xs={12} sm={6}>
                                <Typography align='left'>
                                    Letters attention test with &gt;2 errors
                                </Typography>
                                <Typography align='left' variant='caption' display="block">
                                    Say C-A-S-A-B-L-A-N-C-A. Patient should squeeze your hand when the letter A is spoken. Error is missing an A or squeezing without an A.
                                </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                                <ToggleButtonGroup color="primary" exclusive value={formData.inattention} onChange={handleInputChange}>
                                    <ToggleButton value="no" name="inattention">
                                        No
                                    </ToggleButton>
                                    <ToggleButton value="yes" name="inattention">
                                        Yes
                                    </ToggleButton>
                                </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    </Grid>
                    <Grid id="q5" style={{display: formDisplay.q5 } }>
                    <Typography align='left' variant='overline' display="block" p={1} style={{fontWeight: 'bold', color: 'white', backgroundColor: '#41ADA4'}}>
                        Feature 3: Altered Level of Consciousness
                    </Typography>
                    <Grid container spacing={2} my={1} pb={1} justifyContent="center" alignItems="baseline">
                        <Grid item xs={12} sm={6}>
                                <Typography align='left'>
                                    RASS is not 0 (alert and calm)
                                </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                                <ToggleButtonGroup color="primary" exclusive value={formData.levelOfConsciousness} onChange={handleInputChange}>
                                    <ToggleButton value="no" name="levelOfConsciousness">
                                        No
                                    </ToggleButton>
                                    <ToggleButton value="yes" name="levelOfConsciousness">
                                        Yes
                                    </ToggleButton>
                                    
                                </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    </Grid>
                    <Grid id="q6" style={{display: formDisplay.q6 } }>
                    <Typography align='left' variant='overline' display="block" p={1} style={{fontWeight: 'bold', color: 'white', backgroundColor: '#41ADA4'}}>
                        Feature 4: Disorganized Thinking (modal)
                    </Typography>
                    <Grid container spacing={2} my={1} pb={1} justifyContent="center" alignItems="baseline">
                        <Grid item xs={12} sm={6}>
                                <Typography align='left'>
                                    Combined number of errors to questions and commands &gt;1
                                </Typography>
                                <Typography align='left' variant='caption' display="block">
                                    Ask the patient the following yes/no questions and count errors: 1. Will a stone float on water?; 2. Are there fish in the sea?; 3. Does 1 pound weigh more than 2 pounds?; 4. Can you use a hammer to pound a nail? Next, ask the patient to follow your commands: a) “Hold up this many fingers” (hold up 2 fingers) ; b) “Now do the same thing with the other hand” (do not demonstrate the number of fingers). If unable to move both arms, for part “b” ask patient to hold up one more finger. Count errors if patient is unable to complete the entire command.
                                </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                                <ToggleButtonGroup color="primary" exclusive value={formData.disorganizedThinking} onChange={handleInputChange}>
                                    <ToggleButton value="no" name="disorganizedThinking">
                                        No
                                    </ToggleButton>
                                    <ToggleButton value="yes" name="disorganizedThinking">
                                        Yes
                                    </ToggleButton>
                                </ToggleButtonGroup>
                        </Grid>
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
    
    function createData( data ) {
        return { data };
    }
              
    const rows = [
        createData(
            <div>
                <Typography style={{fontWeight: 'bold'}}>Formula</Typography>
                <Typography>Algorithm of Yes/No questions.</Typography>
            </div>
        ),
        createData(
            <div>    
                <Typography style={{fontWeight: 'bold'}}>Facts & Figures</Typography>
                <Typography>The patient is CAM-ICU positive (patient has delirium) if:</Typography>
                <ul>
                    <li>RASS ≥ -3, AND</li>
                    <li>Acute onset change in mental status or fluctuating course in mental status, AND</li>
                    <li>&gt;2 errors in letters attention test, AND</li>
                    <li>Either RASS is not 0, OR combined number of errors to questions and commands &gt;1 </li>
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

const CamIcu = () => {
    //state for calc result card
    const [pointAllocated , setPointAllocated] = useState("-")
    const [interpretation , setInterpretation] = useState('Please enter the required values in the respective fields to perform the calculations.')
    const [scoreType, setScoreType] = useState('CAM-ICU')

    //state for form fields
    const [formData, setFormData] = useState({
        "rass": "",
        "acuteOnset": "",
        "fluctuatingCourse": "",
        "inattention": "",
        "levelOfConsciousness": "",
        "disorganizedThinking": ""
    });

    //state for form fields display
    const [formDisplay, setFormDisplay] = useState({
        "q2and3": "none",
        "q4": "none",
        "q5": "none",
        "q6": "none"
    });
    
    const BASE_URL = import.meta.env.VITE_API_URL

    useEffect(() => {
        // Check if all fields are entered
        const formValues = Object.values({ ...formData });
        if (formValues.some((value) => value === '' || value === undefined)) {
            setPointAllocated("-");
            setInterpretation("Please enter the required values in the respective fields to perform the calculations.")
        } else{
            
            const sendToBackend = async () => { 
                await axios.post(`${BASE_URL}/calculator/cam-icu`,
                {
                    "rass": formValues[0],
                    "acuteOnset": formValues[1],
                    "fluctuatingCourse": formValues[2],
                    "inattention": formValues[3],
                    "levelOfConsciousness": formValues[4],
                    "disorganizedThinking": formValues[5],
                }
                ).then(
                    res => {
                        let data = res.data
                        setPointAllocated(res.data.result)
                        setInterpretation(res.data.interpretation)
                        return 200;
                    }
                ).catch(
                    err => {
                        if(err.response.status == 500) {
                            navigate("/500");
                        } else if(err.response.status == 404) {
                            navigate("/404");
                        } else {
                            navigate("/other-errors");
                        }
                        // return 500
                    }
                )
            };
            sendToBackend();
        }
    }, [formData])

    const tabs = [
        {
          label: "General Information",
          Component: (
            <Tab1Content formDisplay={formDisplay} setFormDisplay={setFormDisplay} formData={formData} setFormData={setFormData} pointAllocated={pointAllocated} setPointAllocated={setPointAllocated} interpretation={interpretation} setInterpretation={setInterpretation} scoreType={scoreType}/>
          )
        },
        {
          label: "Point System",
          Component: (
            <Tab2Content formDisplay={formDisplay} setFormDisplay={setFormDisplay} formData={formData} />
          )
        }
      ];

    return (
        <Box pt={5}>
            <div className="pageTitle">
            <Typography variant='h1' px={2} sx={{ fontSize: { xs: '24px', md: '30px' }, fontWeight: 'bold', marginBottom: "25px", textAlign: 'center' }}>
                Confusion Assessment Method for the ICU (CAM-ICU)
            </Typography>
            <Typography variant='h6' px={2} sx={{ textAlign: 'center', color: '#04484A', fontSize: { xs: '14px', md: 'inherit' } }}>
                For detection of delirium in the ICU.
            </Typography>
            </div>
            <div style={{textAlign: 'center', padding: '30px 0px'}}>
                <CalculatorTab tabs={tabs} />
            </div>
        </Box>
    )
}

export default CamIcu