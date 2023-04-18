import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid, Box, Divider, CircularProgress } from '@material-ui/core';
import raisedICP from '../../../assets/subchapters/neurology/raisedicp.jpg';
import disclaimerImage from '../../../assets/login.png'
import SGHImage from '../../../assets/singapore-general-hospital-logo.png'
import SinghealthImage from '../../../assets/singhealth-group-logo.png'
import SMUImage from '../../../assets/SMU-logo.png'
import maleDoctor1 from '../../../assets/doctorMale1.png'
import teamCLTPhoto from '../../../assets/Team_CLT_photo.jpg'
import about from '../../../assets/about.jpg'
import FlareIcon from '@mui/icons-material/Flare';

import "./About.css"
import { red } from '@material-ui/core/colors';
import { useEffect } from 'react';


const useStyles = makeStyles((theme) => ({
    mainTitle: {
        backgroundImage: `url(${about})`,
        backgroundSize: 'cover',
        position: 'relative',
        height: '45vh',
        backgroundPosition: 'center'
    },
    greenOverlay: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    section: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
    },
    disclaimerImage: {
        width: '75%',
        height: '75%',
        objectFit: 'cover',
    },
    pageTitle: {
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: "-1.5px",
        fontSize: "60px"
    },
    techemoji: {
        width: '15%',
        height: '15%',
        marginRight: '10px', 
    },
    medemoji: {
        width: '80%',
    },
    SMUImage: {
        height: '100%',
        width: '100%',
        borderRadius: '5%',
    },
    emoji: {
        fontSize: "60px",
        marginRight: "30px"
    }

}));

function About() {
    const classes = useStyles();
    const [loaded, setLoaded] = useState(false);

    function toTwemoji(string) {
        return twemoji.parse(string)
    };

    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!loaded) {
        return (
            <div
                style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%"}}
                >
                    <CircularProgress color='info' size={40} thickness={4} />
            </div>
        )
    }


    return (
        <div>
            {/* Main Title */}
            <Box className={classes.mainTitle}>
                <Box className={classes.greenOverlay}>
                    <p className={classes.pageTitle}>about </p> <FlareIcon style={{fontSize: '60px', color: 'white', margin: "10px", marginBottom: "25px", marginLeft: "30px"}}/><p className={classes.pageTitle}>spark.</p>
                </Box>
            </Box>

            {/* Disclaimer Section */}
            <Container className={classes.section}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <p className="title">
                         <span dangerouslySetInnerHTML={{__html: toTwemoji("📣")}}></span> Disclaimer
                        </p>
                        <Typography variant="body1" color="textSecondary" display='block' align='justify'>
                            The goal of this SPARK app is to provide concise and clinically relevant chapters that are easily accessible for the trainee working in the busy ICU. Whether you are using this app for your first rotation in critical care or your tenth, we hope that you will find it useful as a quick reference supplement to the other reading materials at your disposal. 
                        </Typography>
                        <br />
                        <Typography variant="body1" color="textSecondary" display='block' align='justify'>
                            The use of information here must be individualised to the patients’ needs. The authors have ensured that the information presented here is current and accurate at the time of writing. We acknowledge that the delivery of critical care continues to change rapidly such that therapies deemed beneficial now may no longer be in the future, so we will strive to keep content updated. Nonetheless, the user is advised to check drug dosages and protocols carefully, and refer to the latest updates posted by the relevant authoritative bodies and societies.
                        </Typography>
                        <br />
                        <Typography variant="body1" color="textSecondary" display='block' align='justify'>
                            Singapore General Hospital (SGH) and the Department of Surgical Intensive Care do not assume responsibility for the correctness, sufficiency or completeness of such information or recommendations.
                        </Typography>
                        <br />
                        <Typography variant="body1" color="textSecondary" display='block' align='justify'>
                            May you enjoy the field as much as we do.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{textAlign: "center"}}>
                        <img
                            src={disclaimerImage}
                            alt="Disclaimer Image"
                            className={classes.disclaimerImage}
                        />
                    </Grid>
                </Grid>
            </Container>

            <Divider/>

            {/* Doctor Section */}
            <Container className={classes.section}>
                <Grid container spacing={4} alignItems="center">
                    <Grid container xs={12} sm={6}>
                        <Grid item md={3}></Grid>
                        <Grid item md={6}>
                            <img
                                src={SinghealthImage}
                                alt="singhealthImage"
                                className={classes.disclaimerImage}
                            />
                        </Grid>
                        <Grid item md={3}></Grid>

                        <Grid item md={3}></Grid>
                        <Grid item md={6}>
                            <img
                                src={SGHImage}
                                alt="SGHImage"
                                className={classes.disclaimerImage}
                            />
                        </Grid>
                        <Grid item md={3}></Grid>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <p className="title">
                            <span dangerouslySetInnerHTML={{__html: toTwemoji("🤝")}}></span> Partners
                        </p>
                        
                        <Typography variant="body1" color="textSecondary" display='block' align='justify'>
                            This project was initiated by the following doctors from the Department of Surgical Intensive Care, Division of Anaesthesiology and Perioperative Medicine (Singapore General Hospital), together with the Office of Digital Strategy (Singhealth).
                        </Typography>
                        <br />
                        <Typography variant="h5" component="h2" gutterBottom>
                            Singapore General Hospital
                        </Typography>

                        <div style={{display: "flex", alignItems: "center"}}>
                            <img
                                src={maleDoctor1}
                                alt="maleDoctor1"
                                style={{height: "75px", marginRight: "20px"}}
                            />
                            <Typography variant="body1" color="textSecondary" display='block' align='' style={{ marginLeft: '5px' }}>
                                Dr. Lie Sui An (MBBS, MRCP (UK), MMed (Internal Medicine), MMed (Anaesthesiology), FAMS Consultant)
                            </Typography>
                        </div>

                        <br />
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Typography pr={2} className={classes.emoji}>
                                <span dangerouslySetInnerHTML={{__html: toTwemoji("👩🏻‍⚕️")}}></span> 
                            </Typography>
                            <Typography variant="body1" color="textSecondary" display='block' align='' style={{ marginLeft: '5px' }}>
                                Dr. Lee Si Jia (MBBS, MMed (Anaesthesiology), EDRA, EDIC, Consultant)
                            </Typography>
                        </div>
                                

                        <br />

                        <div style={{display: "flex", alignItems: "center"}}>
                            <Typography pr={2} className={classes.emoji}>
                                <span dangerouslySetInnerHTML={{__html: toTwemoji("👩🏻‍💼")}}></span> 
                            </Typography>
                            <Typography variant="body1" color="textSecondary" display='block' align='' style={{ marginLeft: '5px' }}>
                            Dr. Lee Yi Lin (MBBS, MRCP / MMed (Internal Medicine), MMed (Anaesthesiology), ECFMG, EDIC Consultant)
                            </Typography>
                        </div>
                                

                        <br />

                        <div style={{display: "flex", alignItems: "center"}}>
                            <Typography pr={2} className={classes.emoji}>
                                <span dangerouslySetInnerHTML={{__html: toTwemoji("👩🏻‍💻")}}></span> 
                            </Typography>
                            <Typography variant="body1" color="textSecondary" display='block' align='' style={{ marginLeft: '5px' }}>
                                Dr. Toh Yen Ni (MBBS)
                            </Typography>
                        </div>
                
                        <br />
                        
                        <Typography variant="h5" component="h2" gutterBottom>
                            Office of Digital Strategy (Singhealth)
                        </Typography>

                        <div style={{display: "flex", alignItems: "center"}}>
                            <Typography pr={2} className={classes.emoji}>
                                <span dangerouslySetInnerHTML={{__html: toTwemoji("👨🏻‍💻")}}></span> 
                            </Typography>
                            <Typography variant="body1" color="textSecondary" display='block' align='' style={{ marginLeft: '5px' }}>
                            Cheo Han Wen (Healthcare Management Executive at Singhealth)
                            </Typography>
                        </div>
                
                        <br />
                    </Grid>
                </Grid>
            </Container>
            
            <Divider/>
            {/* Developers Section */}
            <Container className={classes.section}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <p className="title">
                            <span dangerouslySetInnerHTML={{__html: toTwemoji("💻")}}></span> Developers
                        </p>
                        
                        <Typography variant="body1" color="textSecondary" display='block' align='justify'>
                            This project was developed by students from the School of Computing and Information Systems at Singapore Management University (SMU) as part of the module IS Project Experience (IS483) in collaboration with Singhealth and Doctors from Singapore General Hospital.
                        </Typography>
                        <br />

                        <Typography variant="body1" color="textSecondary" display='block' align='justify'>
                            The super team:
                        </Typography>
                        <br />
                        
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Typography className={classes.emoji}>
                                <span dangerouslySetInnerHTML={{__html: toTwemoji("👩‍🔧")}}></span> 
                            </Typography>
                            <Typography variant="body1" color="textSecondary" className="name">
                                Natalie Chua Su-Ann (BSc. Information Systems BA, DCS)
                            </Typography>
                        </div>
                        
                        <br />

                        <div style={{display: "flex", alignItems: "center"}}>
                            <Typography className={classes.emoji}>
                                <span dangerouslySetInnerHTML={{__html: toTwemoji("👩‍🚒")}}></span> 
                            </Typography>
                            <Typography variant="body1" color="textSecondary" className="name">
                                Lin Peishan (BSc. Information Systems DCS)
                            </Typography>
                        </div>
                        
                        <br />

                        <div style={{display: "flex", alignItems: "center"}}>
                            <Typography className={classes.emoji}>
                                <span dangerouslySetInnerHTML={{__html: toTwemoji("👩‍🔬")}}></span> 
                            </Typography>
                            <Typography variant="body1" color="textSecondary" className="name">
                                Ong Kai Jun (BSc. Information Systems DCS)
                            </Typography>
                        </div>
                        
                        <br />

                        <div style={{display: "flex", alignItems: "center"}}>
                            <Typography className={classes.emoji}>
                                <span dangerouslySetInnerHTML={{__html: toTwemoji("👩‍🚀")}}></span> 
                            </Typography>
                            <Typography variant="body1" color="textSecondary" className="name">
                                Valerie Woon (BSc. Information Systems BA, DCS)
                            </Typography>
                        </div>
                        
                        <br />

                        <div style={{display: "flex", alignItems: "center"}}>
                            <Typography className={classes.emoji}>
                                <span dangerouslySetInnerHTML={{__html: toTwemoji("🦸‍♀️")}}></span> 
                            </Typography>
                            <Typography variant="body1" color="textSecondary" className="name">
                                Koh Lin Li (BSc. Information Systems DCS)
                            </Typography>
                        </div>
                        
                        <br />

                        <div style={{display: "flex", alignItems: "center"}}>
                            <Typography className={classes.emoji}>
                                <span dangerouslySetInnerHTML={{__html: toTwemoji("🧙‍♂️")}}></span> 
                            </Typography>
                            <Typography variant="body1" color="textSecondary" className="name">
                                Wisely Kwek (BSc. Information Systems BA, DCS)
                            </Typography>
                        </div>
                        
                        <br />

                        <br />
                        <Typography variant="body1" color="textSecondary" display='block' align='justify'>
                            <b>A note from the team:</b> We would like to thank our sponsors, Singhealth and doctors from Singapore General Hospital, for the opportunity to work on the SPARK application. It's been an eye-opening learning experience for us and we are thankful for their unwavering support throughout the project duration. We also would like to thank our project mentor, Ms. Tan Poh Choo, for her expert guidance and insightful advice throughout the project. Overall, it's been a pleasure working on this application and we hope that it helps you in some way! <span dangerouslySetInnerHTML={{__html: toTwemoji("🙂")}}></span> 
                        </Typography>
                        <br />
                    </Grid>
                    <Grid container xs={12} sm={6}>
                        <Grid item md={2}></Grid>
                        <Grid item md={8}>
                            <img
                                src={SMUImage}
                                alt="SMUImage"
                                className={classes.SMUImage}
                            />
                        </Grid>
                        <Grid item md={2}></Grid>
                        
                        <Grid item md={2}></Grid>
                        <Grid item md={8}>
                            <img
                                src={teamCLTPhoto}
                                alt="CLTImage"
                                className={classes.SMUImage}
                            />
                        </Grid>
                        <Grid item md={2}></Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default About;
