import React from 'react'
import { Button, ToggleButton, ToggleButtonGroup, Paper, Divider, styled } from '@mui/material'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react'
import CalculatorTab from '../../components/calculatorIcon/TabPanel'
import CalcResultCard from '../../components/calculator/CalcResultCard';


const CamIcu = () => {
    //state for calc result card
    const [pointAllocated , setPointAllocated] = useState("-")
    const [interpretation , setInterpretation] = useState('Please enter the required values in the respective fields to perform the calculations.')
    const [scoreType, setScoreType] = useState('CAM-ICU')

    const handleCalculate = async (q1Value, q2Value, q3Value, q4Value, q5Value, q6Value) => {
        // event.preventDefault();
        await axios.post(`http://localhost:8080/calculator/cam-icu/`,
                {
                    "rass": q1Value,
                    "acuteOnset": q2Value,
                    "fluctuatingCourse": q3Value,
                    "inattention": q4Value,
                    "levelOfConsciousness": q5Value,
                    "disorganizedThinking": q6Value
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
                    return 500
                }
            )
        
    };

    const handleResetForm = (e) => {
        setQ1Value("no");
        setQ2Value("no");
        setQ3Value("no");
        setQ4Value("no");
        setQ5Value("no");
        setQ6Value("no");
    }

    const [q1Value, setQ1Value] = useState('');
    const handleQ1Value = (event, newQ1Value) => {
        setQ1Value(newQ1Value);
        {handleCalculate(newQ1Value, q2Value, q3Value, q4Value, q5Value, q6Value)};

        if(newQ1Value == 'yes') {
            document.getElementById('q2and3').style.display = "block";
        } else {
            document.getElementById('q2and3').style.display = "none";
            document.getElementById('q4').style.display = "none";
            document.getElementById('q5').style.display = "none";
            document.getElementById('q6').style.display = "none";
            setQ2Value('no');
            setQ3Value('no');
            setQ4Value('no');
            setQ6Value('no');
            setQ5Value('no');
        }
    };

    const [q2Value, setQ2Value] = useState('no');
    const handleQ2Value = (event, newQ2Value) => {
        setQ2Value(newQ2Value);
        {handleCalculate(q1Value, newQ2Value, q3Value, q4Value, q5Value, q6Value)};
        if(newQ2Value == 'yes' || q3Value == 'yes') {
            document.getElementById('q4').style.display = "block";
        } else {
            document.getElementById('q4').style.display = "none";
            document.getElementById('q5').style.display = "none";
            document.getElementById('q6').style.display = "none";
            {handleCalculate(q1Value, q2Value, q3Value, "no", "no", "no")};
            setQ4Value('no');
            setQ6Value('no');
            setQ5Value('no');
        }
    };

    const [q3Value, setQ3Value] = useState('no');
    const handleQ3Value = (event, newQ3Value) => {
        setQ3Value(newQ3Value);
        {handleCalculate(q1Value, q2Value, newQ3Value, q4Value, q5Value, q6Value)};
        if(newQ3Value == 'yes' || q2Value == 'yes') {
            document.getElementById('q4').style.display = "block";
        } else {
            document.getElementById('q4').style.display = "none";
            document.getElementById('q5').style.display = "none";
            document.getElementById('q6').style.display = "none";
            {handleCalculate(q1Value, q2Value, q3Value, "no", "no", "no")};
            setQ4Value('no');
            setQ6Value('no');
            setQ5Value('no');
        }
    };

    const [q4Value, setQ4Value] = useState('no');
    const handleQ4Value = (event, newQ4Value) => {
        setQ4Value(newQ4Value);
        {handleCalculate(q1Value, q2Value, q3Value, newQ4Value, q5Value, q6Value)};
        if(newQ4Value == 'yes') {
            document.getElementById('q5').style.display = "block";
            document.getElementById('q6').style.display = "block";
        } else {
            document.getElementById('q5').style.display = "none";
            document.getElementById('q6').style.display = "none";
            {handleCalculate(q1Value, q2Value, q3Value, q4Value, "no", "no")};
            setQ5Value('no');
            setQ6Value('no');
        }
    };

    const [q5Value, setQ5Value] = useState('no');
    const handleQ5Value = (event, newQ5Value) => {
        setQ5Value(newQ5Value);
        {handleCalculate(q1Value, q2Value, q3Value, q4Value, newQ5Value, q6Value)};
    };

    const [q6Value, setQ6Value] = useState('no');
    const handleQ6Value = (event, newQ6Value) => {
        setQ6Value(newQ6Value);
        {handleCalculate(q1Value, q2Value, q3Value, q4Value, q5Value, newQ6Value)};
    };

    const tabs = [
        {
          label: "General Information",
          Component: (
            <div style={{marginLeft:'10%', marginRight:'10%'}}>
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
                                <ToggleButtonGroup color="primary" exclusive value={q1Value} onChange={handleQ1Value}>
                                    <ToggleButton value="no">
                                        No
                                    </ToggleButton>
                                    <ToggleButton value="yes">
                                        Yes
                                    </ToggleButton>
                                    
                                </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <Grid id="q2and3" style={{display:'none'}}>
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
                                <ToggleButtonGroup color="primary" exclusive value={q2Value} onChange={handleQ2Value}>
                                    <ToggleButton value="no">
                                        No
                                    </ToggleButton>
                                    <ToggleButton value="yes">
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
                                <ToggleButtonGroup color="primary" exclusive value={q3Value} onChange={handleQ3Value}>
                                    <ToggleButton value="no">
                                        No
                                    </ToggleButton>
                                    <ToggleButton value="yes">
                                        Yes
                                    </ToggleButton>
                                    
                                </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    </Grid>
                    <Grid id="q4" style={{display:'none'}}>
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
                                <ToggleButtonGroup color="primary" exclusive value={q4Value} onChange={handleQ4Value}>
                                    <ToggleButton value="no">
                                        No
                                    </ToggleButton>
                                    <ToggleButton value="yes">
                                        Yes
                                    </ToggleButton>
                                </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    </Grid>
                    <Grid id="q5" style={{display:'none'}}>
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
                                <ToggleButtonGroup color="primary" exclusive value={q5Value} onChange={handleQ5Value}>
                                    <ToggleButton value="no">
                                        No
                                    </ToggleButton>
                                    <ToggleButton value="yes">
                                        Yes
                                    </ToggleButton>
                                    
                                </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    </Grid>
                    <Grid id="q6" style={{display:'none'}}>
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
                                <ToggleButtonGroup color="primary" exclusive value={q6Value} onChange={handleQ6Value}>
                                    <ToggleButton value="no">
                                        No
                                    </ToggleButton>
                                    <ToggleButton value="yes">
                                        Yes
                                    </ToggleButton>
                                </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    </Grid>
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
        },
        {
          label: "Point System",
          Component: (
            <div>
              <p>The patient is CAM-ICU positive (patient has delirium) if:</p>
              <p>RASS ≥ -3, AND</p>
              <p>Acute onset change in mental status or fluctuating course in mental status, AND</p>
              <p>2 errors in letters attention test, AND</p>
              <p>Either RASS is not 0, OR combined number of errors to questions and commands {'>'}1</p>
              <p>2 errors in letters attention test, AND</p>
            </div>
          )
        }
      ];

    return (
        <Box pt={5}>
            <div className="pageTitle">
                <h1 style={{fontSize: '30px', fontWeight: 'bold', marginBottom: "25px", textAlign: 'center'}}>Confusion Assessment Method for the ICU (CAM-ICU)</h1>
                <h6 style={{textAlign: 'center', color: '#04484A'}}>For detection of delirium in the ICU.</h6>
            </div>
            <div style={{textAlign: 'center', padding: '50px 0px'}}>
                <CalculatorTab tabs={tabs} />
            </div>
        </Box>
    )
}

export default CamIcu