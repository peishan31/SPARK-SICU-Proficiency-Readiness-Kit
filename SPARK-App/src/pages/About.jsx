import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid, Box, Divider } from '@material-ui/core';
import raisedICP from '../../assets/subchapters/neurology/raisedicp.jpg';
import disclaimerImage from '../../assets/login.png'
import SGHImage from '../../assets/singapore-general-hospital-logo.png'
import SinghealthImage from '../../assets/singhealth-group-logo.png'
import SMUImage from '../../assets/SMU-logo.png'
import techemoji1 from '../../assets/techemoji1.png'
import techemoji2 from '../../assets/techemoji2.png'
import techemoji3 from '../../assets/techemoji3.png'
import techemoji4 from '../../assets/techemoji4.png'
import techemoji5 from '../../assets/techemoji5.png'
import techemoji6 from '../../assets/techemoji6.png'
import maleDoctor1 from '../../assets/doctorMale1.png'
import femaleDoctor1 from '../../assets/femaleDoctor1.png'
import femaleDoctor2 from '../../assets/femaleDoctor2.png'
import femaleDoctor3 from '../../assets/femaleDoctor3.png'

const useStyles = makeStyles((theme) => ({
    mainTitle: {
        backgroundImage: `url(${raisedICP})`,
        backgroundSize: 'cover',
        position: 'relative',
        height: '57vh',
    },
    greenOverlay: {
        // backgroundColor: 'rgba(76, 175, 80, 0.5)',
        height: '85%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
        align: 'justify',
    },
    techemoji: {
        width: '15%',
        height: '15%',
        marginRight: '10px', 
    },
    medemoji: {
        width: '80%',
    }

}));

function About() {
    const classes = useStyles();

    return (
        <div>
            {/* Main Title */}
            <Box className={classes.mainTitle}>
                <Box className={classes.greenOverlay}>
                    <Typography className={classes.pageTitle} variant="h1" gutterBottom>
                        About This App
                    </Typography>
                </Box>
            </Box>

            {/* Disclaimer Section */}
            <Container className={classes.section}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Disclaimer
                        </Typography>
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
                    <Grid item xs={12} sm={6}>
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
                        <Typography variant="h4" component="h2" gutterBottom>
                            Partners
                        </Typography>
                        
                        <Typography variant="body1" color="textSecondary" display='block' align='justify'>
                            This project was initiated by the following doctors from the Department of Surgical Intensive Care, Division of Anaesthesiology and Perioperative Medicine (Singapore General Hospital), together with the Office of Digital Strategy (Singhealth).
                        </Typography>
                        <br />
                        <Typography variant="h5" component="h2" gutterBottom>
                            Singapore General Hospital
                        </Typography>
                        <Grid container>
                            <Grid item xs={6} md={2}>
                                <img
                                    src={maleDoctor1}
                                    alt="maleDoctor1"
                                    className={classes.medemoji}
                                />
                            </Grid>
                            <Grid item xs={6} md={10}>
                                <Typography variant="body1" color="textSecondary" display='block' align='' style={{ marginLeft: '5px'}}>
                                    Dr. Lie Sui An (MBBS, MRCP (UK), MMed (Internal Medicine), MMed (Anaesthesiology), FAMS Consultant)
                                </Typography>
                            </Grid>
                        </Grid>

                        <br />
                        <Grid container>
                            <Grid item xs={6} md={2}>
                                <img
                                    src={femaleDoctor1}
                                    alt="femaleDoctor1"
                                    className={classes.medemoji}
                                />
                            </Grid>
                            <Grid item xs={6} md={10}>
                                <Typography variant="body1" color="textSecondary" display='block' align='' style={{ marginLeft: '5px' }}>
                                    Dr. Lee Si Jia (MBBS, MMed (Anaesthesiology), EDRA, EDIC, Consultant)
                                </Typography>
                            </Grid>
                        </Grid>

                        <br />
                        <Grid container>
                            <Grid item xs={6} md={2}>
                                <img
                                    src={femaleDoctor2}
                                    alt="femaleDoctor2"
                                    className={classes.medemoji}
                                />
                            </Grid>
                            <Grid item xs={6} md={10}>
                                <Typography variant="body1" color="textSecondary" display='block' align='' style={{ marginLeft: '5px' }}>
                                    Dr. Lee Yi Lin (MBBS, MRCP / MMed (Internal Medicine), MMed (Anaesthesiology), ECFMG, EDIC Consultatnt)
                                </Typography>
                            </Grid>
                        </Grid>

                        <br />
                        <Grid container>
                            <Grid item xs={6} md={2}>
                                <img
                                    src={femaleDoctor3}
                                    alt="femaleDoctor3"
                                    className={classes.medemoji}
                                />
                            </Grid>
                            <Grid item xs={6} md={10}>
                                <Typography variant="body1" color="textSecondary" display='block' align='' style={{ marginLeft: '5px' }}>
                                    Dr. Toh Yen Ni (MBBS)
                                </Typography>
                            </Grid>
                        </Grid>

                        <br />
                        <Typography variant="h5" component="h2" gutterBottom>
                            Office of Digital Strategy (Singhealth)
                        </Typography>

                        <Grid container>
                            <Grid item xs={6} md={2}>
                                <img
                                    src={techemoji6}
                                    alt="femaleDoctor3"
                                    className={classes.medemoji}
                                />
                            </Grid>
                            <Grid item xs={6} md={10}>
                                <Typography variant="body1" color="textSecondary" display='block' align='' style={{ marginLeft: '5px' }}>
                                    Cheo Han Wen (Healthcare Management Executive at Singhealth)
                                </Typography>
                            </Grid>
                        </Grid>
                        <br />
                    </Grid>
                </Grid>
            </Container>
            

            {/* Developers Section */}
            <Container className={classes.section}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Developers
                        </Typography>
                        
                        <Typography variant="body1" color="textSecondary" display='block' align='justify'>
                            This project was developed by the following students from the School of Computing and Information Systems at Singapore Management University (SMU) as part of the module IS Project Experience (IS483) in collaboration with Singhealth and Doctors from Singapore General Hospital.
                        </Typography>
                        <br />

                        <Typography variant="body1" color="textSecondary" display='block' align=''>
                            <img
                                src={techemoji1}
                                alt="techemoji1"
                                className={classes.techemoji}
                            />
                            Natalie Chua Su-Ann (BSc. Information Systems BA, DCS)
                        </Typography>
                        <br />
                        <Typography variant="body1" color="textSecondary" display='block' align=''>
                            <img
                                src={techemoji2}
                                alt="techemoji2"
                                className={classes.techemoji}
                            />
                            Lin Peishan (BSc. Information Systems BA, DCS)
                        </Typography>
                        <br />
                        <Typography variant="body1" color="textSecondary" display='block' align=''>
                            <img
                                src={techemoji3}
                                alt="techemoji3"
                                className={classes.techemoji}
                            />
                            Ong Kai Jun (BSc. Information Systems BA, DCS)
                        </Typography>
                        <br />
                        <Typography variant="body1" color="textSecondary" display='block' align=''>
                            <img
                                src={techemoji4}
                                alt="techemoji4"
                                className={classes.techemoji}
                            />
                            Valerie Woon Rui Fang (BSc. Information Systems BA, DCS)
                        </Typography>
                        <br />                        
                        <Typography variant="body1" color="textSecondary" display='block' align=''>
                            <img
                                src={techemoji5}
                                alt="techemoji5"
                                className={classes.techemoji}
                            />
                            Koh Lin Li (BSc. Information Systems BA, DCS)
                        </Typography>
                        <br />                        
                        <Typography variant="body1" color="textSecondary" display='block' align=''>
                            <img
                                src={techemoji6}
                                alt="techemoji6"
                                className={classes.techemoji}
                            />
                            Wisely Kwek (BSc. Information Systems BA, DCS)
                        </Typography>
                        <br />
                        <Typography variant="body1" color="textSecondary" display='block' align='justify'>
                            We extend our utmost gratitude to our esteemed project sponsors, Singhealth and Doctors from Singapore General Hospital, for affording us the privilege to undertake the development of this application and for their unwavering support throughout the project duration. In addition, we express our sincere appreciation to our project mentor, Ms. Tan Poh Choo, for her expert guidance and insightful advice throughout the project.
                        </Typography>
                        <br />
                    </Grid>
                    <Grid container xs={12} sm={6}>
                        <Grid item md={2}></Grid>
                        <Grid item md={8}>
                            <img
                                src={SMUImage}
                                alt="SMUImage"
                                className={classes.disclaimerImage}
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
