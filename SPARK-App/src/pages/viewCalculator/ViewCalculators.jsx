import {Grid, Box} from '@material-ui/core';
import CalculatorCard from '../../components/calculatorIcon/CalculatorCard';

import "../home.css"


const ViewCalculators = () => {

  const calculators = [ 
    {
      name: "Confusion Assessment Method for the ICU (CAM-ICU)",
      description: "For detection of delirium in the ICU",
      link: "https://www.mdcalc.com/calc/1870/confusion-assessment-method-icu-cam-icu"
    }, 
    {
      name: "Simplified PESI (Pulmonary Embolism Severity Index)",
      description: "Predicts 30-day outcome of patients with PE",
      link: "https://www.mdcalc.com/calc/1247/simplified-pesi-pulmonary-embolism-severity-index#evidence"
    }, 
    {
      name: "Candida Score",
      description: "To determine the likelihood of invasive candidiasis vs colonization in non-neutropenic critically ill patients",
      link: "https://www.pharmacyjoe.com/candida-score-calculator/"
    }, 
    {
      name: "Parkland Formula for Burns",
      description: "Calculates fluid requirements for burn patients in a 24-hour period.",
      link: "https://www.mdcalc.com/calc/83/parkland-formula-burns"
    }, 
    {
      name: "ROX index",
      description: "Predicts high-flow nasal cannula (HFNC) failure/need for intubation",
      link: "https://www.mdcalc.com/calc/10302/rox-index-intubation-hfnc#evidence"
    }, 
    {
      name: "Sequential Organ Failure Assessment (SOFA) Score",
      description: "Predicts ICU mortality based on lab results and clinical data.",
      link: "https://www.mdcalc.com/calc/691/sequential-organ-failure-assessment-sofa-score"
    },
    {
      name: "APACHE II Score",
      description: "Estimates ICU mortality based on a number of laboratory values and patient signs taking both acute and chronic disease into account. ",
      link: "https://www.mdcalc.com/calc/1868/apache-ii-score"
    }
  ]

  return (
      <>
        <div className="home">
          <div className="homeContainer">
            <div className="widgets">
              <h2 style={{fontWeight:'bold'}}>Calculators</h2>
            </div>

            <Grid container alignItems="stretch" spacing={4}>
                  {
                    calculators.map((calculator)=>(
                      <Grid item style={{display: 'flex'}} xs={12} sm={6} md={3} onClick={()=>{window.location.href=calculator.link}}>
                          <CalculatorCard style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', width: '100%', height: '100%'}}calculator={calculator}/>
                      </Grid>
                    ))
                  }  
            </Grid>
        

          </div>
        </div>
      </>
      
  )
}

export default ViewCalculators;