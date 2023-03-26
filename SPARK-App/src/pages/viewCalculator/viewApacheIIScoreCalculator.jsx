import React from 'react'
import { useRef } from 'react'
import { Button, ToggleButtonGroup, Paper, Divider, IconButton, styled} from '@mui/material'
import MuiToggleButton from "@mui/material/ToggleButton"
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import Box from '@mui/material/Box';
import { useStyles, useState, useEffect } from 'react'
import CalculatorTab from '../../components/calculatorIcon/TabPanel'
import TextField from '@mui/material/TextField';
import CalcResultCard from '../../components/calculator/CalcResultCard';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function Tab1Content(props){

    const {formData, setFormData, pointAllocated , setPointAllocated, interpretation , setInterpretation, scoreType} = props;

    const ToggleButton = styled(MuiToggleButton)({
        "&.Mui-selected": {
          color: "white",
          backgroundColor: '#41ADA4'
        }
    });

    // Handle min and max for number type textfield
    const [number, setNumber] = useState('');
    const validateNumber = (e) => {
        var number = parseInt(e.target.value, 10);
        setNumber(number);
    };
    const error = number < 0 || number >= 10;

    // Handle units of measurement
    // Temperature unit
    const [tempUnitStatus, setTempUnit] = useState(false);
    var tempUnit = '°C';
    const convertTempUnit = (e) => {
        setTempUnit(!tempUnitStatus)
    }
    if(tempUnitStatus == true){
        tempUnit = 'F';
    }else{
        tempUnit = '°C'
    }
    
    // Sodium unit
    const [sodiumUnitStatus, setSodiumUnit] = useState(false);
    var sodiumUnit = 'mmol/L';
    const convertSodiumUnit = (e) => {
        setSodiumUnit(!sodiumUnitStatus)
    }
    if(sodiumUnitStatus == true){
        sodiumUnit = 'mEq/L';
    }else{
        sodiumUnit = 'mmol/L'
    }

    // Potassium unit
    const [potassiumUnitStatus, setPotassiumUnit] = useState(false);
    var potassiumUnit = 'mmol/L';
    const convertPotassiumUnit = (e) => {
        setPotassiumUnit(!potassiumUnitStatus)
    }
    if(potassiumUnitStatus == true){
        potassiumUnit = 'mEq/L';
    }else{
        potassiumUnit = 'mmol/L'
    }

    // Creatinine unit
    const [creatinineUnitStatus, setCreatinineUnit] = useState(false);
    var creatinineUnit = 'µmol/L';
    const convertCreatinineUnit = (e) => {
        setCreatinineUnit(!creatinineUnitStatus)
    }
    if(creatinineUnitStatus == true){
        creatinineUnit = 'mg/dL';
    }else{
        creatinineUnit = 'µmol/L'
    }

    // White blood cell count unit
    const [wbcCountUnitStatus, setWbcCountUnit] = useState(false);
    var wbcCountUnit = '× 10⁹ cells/L';
    const convertWbcCountUnit = (e) => {
        setWbcCountUnit(!wbcCountUnitStatus)
    }
    if(wbcCountUnitStatus == true){
        wbcCountUnit = '× 10³ cells/µL';
    }else{
        wbcCountUnit = '× 10⁹ cells/L'
    }

    const handleResetForm = (e) => {
        const initialFormData = {
            weight: "",
            bodyBurnPercentage: ""
        };
        setFormData(initialFormData);
    }

    const handleInputChange = async (e) => {
        const { name, value } = e.target;

        //handle history field toggle
        if (name == "cancerHistory"){
            if(value == 'Yes') {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    typeOfSurgery: "emergency"
                }));
                document.getElementById('surgeryType').style.display = "flex";

            } else {
                document.getElementById('surgeryType').style.display = "none";
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    typeOfSurgery: "skipCheck"
                }));
            }
        }
        
        //handle FiO field toggle
        if (name == "fio"){
            if(value == '<50% (or non-intubated)') {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    pao: ""
                }));
                document.getElementById('paOxygen').style.display = "flex";
                document.getElementById('aaGradient').style.display = "none";
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    aaGradient: "skipCheck"
                }));
            }
            else{
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    aaGradient: ""
                }));
                document.getElementById('aaGradient').style.display = "flex";
                document.getElementById('paOxygen').style.display = "none";
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    pao: "skipCheck"
                }));
            } 
        }
        

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
          }));

        
        // Check if all fields are entered
        // const formValues = Object.values({ ...formData, [name]: value });
        //     console.log(formValues[0] + " formValue[0] missing");
        //     console.log(formValues[1] + " formValue[1] missing");

            //formValues.some(value => value !== undefined && value !== '' && value === 'someValue')

        // if (formValues.some((value) => value === '' || value === undefined)) {
        //     setPointAllocated(0);
        //     setInterpretation("Please enter the required values in the respective fields to perform the calculations.")
        // }else{
        //     console.log(formValues[0] + " formValue[0]");
        //     console.log(formValues[1] + " formValue[1]");
        //     await axios.post(`http://localhost:8080/calculator/apache-ii-score`,
        //         {
        //             "cancerHistory": formValues[0],
        //             "typeOfSurgery": formValues[1],
        //             "age": formValues[2],
        //             "temperature": formValues[3],
        //             "meanArterialPressure": formValues[4],
        //             "pH" : formValues[5],
        //             "heartrate": formValues[6],
        //             "respiratoryRate": formValues[7],
        //             "sodium": formValues[8],
        //             "potassium": formValues[9],
        //             "creatinine": formValues[10],
        //             "acuteRenalFailure": formValues[11],
        //             "hematocrit": formValues[12],
        //             "whiteBloodCell": formValues[13],
        //             "gcs": formValues[14],
        //             "fio": formValues[15],
        //             "pao": formValues[16],
        //             "aaGradient": formValues[17]
        //         }
        //     ).then(
        //         res => {
        //             let data = res.data
        //             setPointAllocated(res.data.pointAllocated)
        //             setInterpretation(res.data.result.interpretation)
        //             return 200;
        //         }
        //     ).catch(
        //         err => {
        //             return 500
        //         }
        //     )
        // }
    };

    return (
        <div style={{marginLeft:'10%', marginRight:'10%'}}>
            <form>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography align='left'>
                                Age
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} style={{display: 'inline-flex'}}>
                            <TextField
                                label="Years" type="number" variant="outlined" name="age" value={formData.age} onChange={handleInputChange}
                            />
                            <IconButton sx={{visibility: 'hidden'}}>
                                <ChangeCircleIcon/>
                            </IconButton>
                        </Grid>
                        {/* <Grid container justifyContent="center" alignItems="center"> */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography align='left'>
                                Temperature
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} style={{display: 'inline-flex'}}>
                            <TextField label={tempUnit} type="number" variant="outlined" name="temperature" value={formData.temperature} onChange={handleInputChange}/>
                            <IconButton onClick={convertTempUnit} sx={{color: '#41ADA4'}}>
                                <ChangeCircleIcon/>
                            </IconButton>
                        </Grid>
                        {/* </Grid> */}
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography align='left'>
                                Mean arterial pressure
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} style={{display: 'inline-flex'}}>
                            <TextField label="mm Hg" type="number" variant="outlined"  name="meanArterialPressure" value={formData.meanArterialPressure} onChange={handleInputChange} />
                            <IconButton sx={{visibility: 'hidden'}}>
                                <ChangeCircleIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography align='left'>
                                pH
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} style={{display: 'inline-flex'}}>
                            <TextField label="pH" type="number" variant="outlined" name="pH" value={formData.pH} onChange={handleInputChange}/>
                            <IconButton sx={{visibility: 'hidden'}}>
                                <ChangeCircleIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography align='left'>
                                Heart rate/pulse
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} style={{display: 'inline-flex'}}>
                            <TextField label="beats/min" type="number" variant="outlined" name="heartrate" value={formData.heartrate} onChange={handleInputChange}/>
                            <IconButton sx={{visibility: 'hidden'}}>
                                <ChangeCircleIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography align='left'>
                                Respiratory rate
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} style={{display: 'inline-flex'}}>
                            <TextField label="breaths/min" type="number" variant="outlined" name="respiratoryRate" value={formData.respiratoryRate} onChange={handleInputChange} />
                            <IconButton sx={{visibility: 'hidden'}}>
                                <ChangeCircleIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography align='left'>
                                Sodium
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} style={{display: 'inline-flex'}}>
                            <TextField label={sodiumUnit} type="number" variant="outlined" name="sodium" value={formData.sodium} onChange={handleInputChange}  />
                            <IconButton onClick={convertSodiumUnit} sx={{color: '#41ADA4'}}>
                                <ChangeCircleIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography align='left'>
                                Potassium
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} style={{display: 'inline-flex'}}>
                            <TextField label={potassiumUnit} type="number" variant="outlined" name="potassium" value={formData.potassium} onChange={handleInputChange}/>
                            <IconButton onClick={convertPotassiumUnit} sx={{color: '#41ADA4'}}>
                                <ChangeCircleIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography align='left'>
                                Creatinine
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} style={{display: 'inline-flex'}}>
                            <TextField label={creatinineUnit} type="number" variant="outlined" name="creatinine" value={formData.creatinine} onChange={handleInputChange}/>
                            <IconButton onClick={convertCreatinineUnit} sx={{color: '#41ADA4'}}>
                                <ChangeCircleIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography align='left'>
                                Hematocrit
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} style={{display: 'inline-flex'}}>
                            <TextField label="%" type="number" variant="outlined" name="hematocrit" value={formData.hematocrit} onChange={handleInputChange}/>
                            <IconButton sx={{visibility: 'hidden'}}>
                                <ChangeCircleIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography align='left'>
                                White blood cell count
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} style={{display: 'inline-flex'}}>
                            <TextField label={wbcCountUnit} type="number" variant="outlined" name="whiteBloodCell" value={formData.whiteBloodCell} onChange={handleInputChange}/>
                            <IconButton onClick={convertWbcCountUnit} sx={{color: '#41ADA4'}}>
                                <ChangeCircleIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography align='left'>
                                Glasgow Coma Scale
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} style={{display: 'inline-flex'}}>
                            <TextField label="points" type="number" variant="outlined" name="gcs" value={formData.gcs} onChange={handleInputChange}/>
                            <IconButton sx={{visibility: 'hidden'}}>
                                <ChangeCircleIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <Typography align='left'>
                                History of severe organ failure or immunocompromise
                            </Typography>
                            <Typography align='left' variant='caption' display="block">
                                Heart Failure Class IV, cirrhosis, chronic lung disease, or dialysis-dependent
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ToggleButtonGroup color="primary" exclusive value={formData.cancerHistory} onChange={handleInputChange}>
                                <ToggleButton value="No" name="cancerHistory">
                                    No
                                </ToggleButton>
                                <ToggleButton value="Yes" name="cancerHistory">
                                    Yes
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                        </Grid>
                    <Divider></Divider>
                    <Grid id="surgeryType" container spacing={2} my={1} justifyContent="center" alignItems="center" style={{display:'none'}}>
                        <Grid item xs={12} sm={6}>
                            <Typography align='left'>
                                Type of surgery
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ToggleButtonGroup color="primary" exclusive value={formData.typeOfSurgery} onChange={handleInputChange}>
                                <ToggleButton value="emergency" name="typeOfSurgery">
                                    Emergency
                                </ToggleButton>
                                <ToggleButton value="elective" name="typeOfSurgery">
                                    Elective
                                </ToggleButton>
                                <ToggleButton value="nonoperative" name="typeOfSurgery">
                                    Nonoperative
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center" >
                        <Grid item xs={12} sm={6}>
                            <Typography align='left'>
                                Acute renal failure
                            </Typography>
                            <Typography align='left' variant='caption' display="block">
                                Note: "acute renal failure" was not defined in the original study. Use clinical judgment to determine whether patient has acute kidney injury.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ToggleButtonGroup color="primary" exclusive value={formData.acuteRenalFailure} onChange={handleInputChange}>
                                <ToggleButton value="No" name="acuteRenalFailure">
                                    No
                                </ToggleButton>
                                <ToggleButton value="Yes" name="acuteRenalFailure">
                                    Yes
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2} my={1} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <Typography align='left'>
                                FiO₂
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ToggleButtonGroup color="primary" exclusive value={formData.fio} onChange={handleInputChange}>
                                <ToggleButton value="<50% (or non-intubated)" name="fio">
                                    &lt;50% (or non-intubated)
                                </ToggleButton>
                                <ToggleButton value="≥50%" name="fio">
                                    ≥50%
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid id="paOxygen" container spacing={2} my={1} justifyContent="center" alignItems="center" style={{display:'none'}}>
                        <Grid item xs={12} sm={6}>
                            <Typography align='left'>
                                PaO₂, mmHg
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ToggleButtonGroup color="primary" exclusive value={formData.pao} onChange={handleInputChange}>
                                <ToggleButton value=">70" name="pao">
                                    &gt; 70
                                </ToggleButton>
                                <ToggleButton value="61-70" name="pao">
                                    61 - 70
                                </ToggleButton>
                                <ToggleButton value="55-60" name="pao">
                                    55 - 60
                                </ToggleButton>
                                <ToggleButton value="<55">
                                    &lt; 55
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid id="aaGradient" container spacing={2} my={1} justifyContent="center" alignItems="center" style={{display:'none'}}>
                        <Grid item xs={12} sm={6}>
                            <Typography align='left'>
                                A-a gradient
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ToggleButtonGroup color="primary" exclusive value={formData.aaGradient} onChange={handleInputChange}>
                                <ToggleButton value="<200" name="aaGradient">
                                    &lt; 200
                                </ToggleButton>
                                <ToggleButton value="200-349" name="aaGradient">
                                    200 - 349
                                </ToggleButton>
                                <ToggleButton value="350-499" name="aaGradient">
                                    350 - 499
                                </ToggleButton>
                                <ToggleButton value=">499" name="aaGradient">
                                    &gt; 499
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <div>
                    <Button variant="contained" sx={{mt: 2, backgroundColor: '#41ADA4'}} color="primary" type="submit" onClick="{handleResetForm}">
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
    
    // create data for point value table
    function createData(criteria, pointValues ) {
        return { criteria, pointValues };
    }
      
    const ages = [
        createData('≤44', '0'),
        createData('45-54', '+2'),
        createData('55-64', '+3'),
        createData('65-74', '+5'),
        createData('>74', '+6')
    ];

    const histories = [
        createData('Yes, and nonoperative or emergency postoperative patient', '+5'),
        createData('Yes, and elective postoperative patient', '+2'),
        createData('No', '0')
    ];

    const temperatures = [
        createData('≥41', '+4'),
        createData('39 to <41', '+3'),
        createData('38.5 to <39', '+1'),
        createData('36 to < 38.5', '0'),
        createData('34 to <36', '+1'),
        createData('32 to <34', '+2'),
        createData('30 to <32', '+3'),
        createData('<30', '+4')
    ];

    const pressures = [
        createData('>159', '+4'),
        createData('>129-159', '+3'),
        createData('>109-129', '+2'),
        createData('>69-109', '0'),
        createData('>49-69', '+2'),
        createData('≤49', '+4')
    ];

    const heartRates = [
        createData('≥180', '+4'),
        createData('140 to <180', '+3'),
        createData('110 to <140', '+2'),
        createData('70 to <110', '0'),
        createData('55 to <70', '+2'),
        createData('40 to <55', '+3'),
        createData('<40', '+4')
    ];

    const respRates = [
        createData('≥50', '+4'),
        createData('35 to <50', '+3'),
        createData('25 to <35', '+1'),
        createData('12 to <25', '0'),
        createData('10 to <12', '+1'),
        createData('6 to <10', '+2'),
        createData('<6', '+4')
    ];

    const oxygenations = [
        createData('A-a gradient >499', '+4'),
        createData('A-a gradient 350-499', '+3'),
        createData('A-a gradient 200-349', '+2'),
        createData('A-a gradient <200 (if FiO2 over 49%) or pO2 >70 (if FiO2 less than 50%)', '0'),
        createData('PaO2 = 61-70', '+1'),
        createData('PaO2 = 55-60', '+3'),
        createData('PaO2 <55', '+4')
    ];

    const arterialPhs = [
        createData('≥7.70', '+4'),
        createData('7.60 to <7.70', '+3'),
        createData('7.50 to <7.60', '+1'),
        createData('7.33 to <7.50', '0'),
        createData('7.25 to <7.33', '+2'),
        createData('7.15 to <7.25', '+3'),
        createData('<7.15', '+4')
    ];

    const sodiums = [
        createData('≥180', '+4'),
        createData('160 to <180', '+3'),
        createData('155 to <160', '+2'),
        createData('150 to <155', '+1'),
        createData('130 to <150', '0'),
        createData('120 to <130', '+2'),
        createData('111 to <120', '+3'),
        createData('<111', '+4')
    ];

    const potassiums = [
        createData('≥7.0', '+4'),
        createData('6.0 to <7.0', '+3'),
        createData('5.5 to <6.0', '+1'),
        createData('3.5 to <5.5', '0'),
        createData('3.0 to <3.5', '+1'),
        createData('2.5 to <3.0', '+2'),
        createData('<2.5', '+4')
    ];

    const creatinines = [
        createData('≥3.5 and ACUTE renal failure*', '+8'),
        createData('2.0 to <3.5 and ACUTE renal failure', '+6'),
        createData('≥3.5 and CHRONIC renal failure', '+4'),
        createData('1.5 to <2.0 and ACUTE renal failure', '+4'),
        createData('2.0 to <3.5 and CHRONIC renal failure', '+3'),
        createData('1.5 to <2.0 and CHRONIC renal failure', '+2'),
        createData('0.6 to <1.5', '0'),
        createData('<0.6', '+2')
    ];

    const hematocrits = [
        createData('≥60', '+4'),
        createData('50 to <60', '+2'),
        createData('46 to <50', '+1'),
        createData('30 to <46', '0'),
        createData('20 to <30', '+2'),
        createData('<20', '+4')
    ];

    const whiteBloodCounts = [
        createData('≥40', '+4'),
        createData('20 to <40', '+2'),
        createData('15 to <20', '+1'),
        createData('3 to <15', '0'),
        createData('1 to <3', '+2'),
        createData('<1', '+4')
    ];

    const glasgowComas = [
        createData('1 - 15', '15 - [GCS Score]')
    ];

    // create data for Approximated in-hospital mortality rates
    function createData2( apacheScore, nonoperative, postoperative ) {
        return { apacheScore, nonoperative, postoperative };
    }
          
    const rows = [
        createData2('0-4', '4%', '1%'),
        createData2('5-9', '8%', '3%'),
        createData2('10-14', '15%', '7%'),
        createData2('15-19', '25%', '12%'),
        createData2('20-24', '40%', '30%'),
        createData2('25-29', '55%', '35%'),
        createData2('30-34', '73%', '73%'),
        createData2('>34', '85%', '88%')
    ];

    return (
        <div style={{marginLeft:'10%', marginRight:'10%'}}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold'}}>Criteria</TableCell>
                            <TableCell style={{fontWeight: 'bold'}} align="center">Point Values</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>Age, years</TableCell>
                    <TableBody>
                    {ages.map((age) => (
                        <TableRow
                        key={age.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {age.criteria}
                        </TableCell>
                        <TableCell align="center">{age.pointValues}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>History of severe organ insufficiency or immunocompromised</TableCell>
                    <TableBody>
                    {histories.map((history) => (
                        <TableRow
                        key={history.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {history.criteria}
                        </TableCell>
                        <TableCell align="center">{history.pointValues}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>Rectal temperature, °C</TableCell>
                    <TableBody>
                    {temperatures.map((temperature) => (
                        <TableRow
                        key={temperature.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {temperature.criteria}
                        </TableCell>
                        <TableCell align="center">{temperature.pointValues}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>Mean arterial pressure, mmHg</TableCell>
                    <TableBody>
                    {pressures.map((pressure) => (
                        <TableRow
                        key={pressure.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {pressure.criteria}
                        </TableCell>
                        <TableCell align="center">{pressure.pointValues}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>Heart rate, beats per minute</TableCell>
                    <TableBody>
                    {heartRates.map((heartRate) => (
                        <TableRow
                        key={heartRate.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {heartRate.criteria}
                        </TableCell>
                        <TableCell align="center">{heartRate.pointValues}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>Respiratory rate, breaths per minute</TableCell>
                    <TableBody>
                    {respRates.map((respRate) => (
                        <TableRow
                        key={respRate.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {respRate.criteria}
                        </TableCell>
                        <TableCell align="center">{respRate.pointValues}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>Oxygenation (use PaO2 if FiO2 &lt;50%, otherwise use A-a gradient)</TableCell>
                    <TableBody>
                    {oxygenations.map((oxygenation) => (
                        <TableRow
                        key={oxygenation.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {oxygenation.criteria}
                        </TableCell>
                        <TableCell align="center">{oxygenation.pointValues}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>Arterial pH</TableCell>
                    <TableBody>
                    {arterialPhs.map((arterialPh) => (
                        <TableRow
                        key={arterialPh.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {arterialPh.criteria}
                        </TableCell>
                        <TableCell align="center">{arterialPh.pointValues}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>Serum sodium, mmol/L</TableCell>
                    <TableBody>
                    {sodiums.map((sodium) => (
                        <TableRow
                        key={sodium.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {sodium.criteria}
                        </TableCell>
                        <TableCell align="center">{sodium.pointValues}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>Serum potassium, mmol/L</TableCell>
                    <TableBody>
                    {potassiums.map((potassium) => (
                        <TableRow
                        key={potassium.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {potassium.criteria}
                        </TableCell>
                        <TableCell align="center">{potassium.pointValues}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>Serum creatinine, mg/100 mL</TableCell>
                    <TableBody>
                    {creatinines.map((creatinine) => (
                        <TableRow
                        key={creatinine.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {creatinine.criteria}
                        </TableCell>
                        <TableCell align="center">{creatinine.pointValues}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>Hematocrit, %</TableCell>
                    <TableBody>
                    {hematocrits.map((hematocrit) => (
                        <TableRow
                        key={hematocrit.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {hematocrit.criteria}
                        </TableCell>
                        <TableCell align="center">{hematocrit.pointValues}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>White blood count, total/cubic mm in</TableCell>
                    <TableBody>
                    {whiteBloodCounts.map((whiteBloodCount) => (
                        <TableRow
                        key={whiteBloodCount.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {whiteBloodCount.criteria}
                        </TableCell>
                        <TableCell align="center">{whiteBloodCount.pointValues}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>Glasgow Coma Scale (GCS)</TableCell>
                    <TableBody>
                    {glasgowComas.map((glasgowComa) => (
                        <TableRow
                        key={glasgowComa.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {glasgowComa.criteria}
                        </TableCell>
                        <TableCell align="center">{glasgowComa.pointValues}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <caption>*Note: "acute renal failure" was not defined in the original study. Use clinical judgment to determine whether has acute kidney injury. Cutoffs differ slightly from original study (by less than 0.1 mg/dL) in order to account for all possible values in this electronic calculator.</caption>
                </Table>
            </TableContainer>
            <TableContainer component={Paper} p={5}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold'}} align="center">APACHE II Score</TableCell>
                            <TableCell style={{fontWeight: 'bold'}} align="center">Nonoperative</TableCell>
                            <TableCell style={{fontWeight: 'bold'}} align="center">Postoperative</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.criteria}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="center" component="th" scope="row">{row.apacheScore}</TableCell>
                        <TableCell align="center">{row.nonoperative}</TableCell>
                        <TableCell align="center">{row.postoperative}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

const ApacheIIScore = () => {


    //state for form fields
    const [formData, setFormData] = useState({
        // "cancerHistory": "",
        // "typeOfSurgery": "",
        // "age": "",
        // "temperature": "",
        // "meanArterialPressure": "",
        // "pH" : "",
        // "heartrate": "",
        // "respiratoryRate": "",
        // "sodium": "",
        // "potassium": "",
        // "creatinine": "",
        // "acuteRenalFailure": "",
        // "hematocrit": "",
        // "whiteBloodCell": "",
        // "gcs": "",
        // "fio": "",
        // "pao": "",
        // "aaGradient": ""
        "cancerHistory": "",
        "typeOfSurgery": "",
        "age": "1",
        "temperature": "1",
        "meanArterialPressure": "1",
        "pH" : "1",
        "heartrate": "1",
        "respiratoryRate": "1",
        "sodium": "1",
        "potassium": "1",
        "creatinine": "1",
        "acuteRenalFailure": "1",
        "hematocrit": "1",
        "whiteBloodCell": "1",
        "gcs": "1",
        "fio": "",
        "pao": "",
        "aaGradient": ""
    });

    useEffect(() => {
        console.log("formData changed");
        console.log(formData);
        console.log("=================================");
        // Check if all fields are entered
        const formValues = Object.values({ ...formData });
            console.log(formValues[0] + " formValue[0] missing");
            console.log(formValues[1] + " formValue[1] missing");
        console.log("form values: " + formValues);
        if (formValues.some((value) => value === '' || value === undefined)) {
            setPointAllocated(0);
            setInterpretation("Please enter the required values in the respective fields to perform the calculations.")
        } else{
            // console.log(formValues[0] + " formValue[0]");
            // console.log(formValues[1] + " formValue[1]");
            const sendToBackend = async () => { 
                await axios.post(`http://localhost:8080/calculator/apache-ii-score`,
                    {
                        "cancerHistory": formValues[0],
                        "typeOfSurgery": formValues[1],
                        "age": formValues[2],
                        "temperature": formValues[3],
                        "meanArterialPressure": formValues[4],
                        "pH" : formValues[5],
                        "heartrate": formValues[6],
                        "respiratoryRate": formValues[7],
                        "sodium": formValues[8],
                        "potassium": formValues[9],
                        "creatinine": formValues[10],
                        "acuteRenalFailure": formValues[11],
                        "hematocrit": formValues[12],
                        "whiteBloodCell": formValues[13],
                        "gcs": formValues[14],
                        "fio": formValues[15],
                        "pao": formValues[16],
                        "aaGradient": formValues[17]
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
            };
            sendToBackend();
        }
    }, [formData])


    //state for calc result card
    const [pointAllocated , setPointAllocated] = useState(0)
    const [interpretation , setInterpretation] = useState('Please enter the required values in the respective fields to perform the calculations.')
    const [scoreType, setScoreType] = useState('APACHE II Index')

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