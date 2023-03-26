import React from 'react';
import { Typography, Button, IconButton, Stack, Grid, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SubchapterCard from '../components/subchapters/SubchapterCard';
import { useAppState, useActions } from '../overmind';
import { trim } from 'lodash';

import CircularProgress from '@mui/material/CircularProgress';


const Subchapters = ({ searchInput }) => {

    
    const location = useLocation();
    const navigate = useNavigate();
    // overmind states
    const chapterState = useAppState().chapters;
    const subchapterState = useAppState().subchapters
    const userState = useAppState().user
    
    // overmind actions
    const subchapterActions = useActions().subchapters

    // get current chapter from overmind state
    const currentChapter = chapterState.selectedChapter
    // console.log("Current Chapter: ", currentChapter)

    // extract currentUser from session storage
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
    // const userId = currentUser._id

    const userId = userState.currentUser.googleId;

    let filtered = [];
    // const [subchapters, setSubchapters] = useState([]);

    const BASE_URL = import.meta.env.VITE_API_URL
    
    useEffect(() => {
        // if currentChapter does not exist, then reroute to the chapters page.
        if (!currentChapter || !userId) {
            // console.log("Current Chapter: ", currentChapter);
            navigate(`/Chapters`);
            return;
        }

        // extract currentchapter details
        const chapterId = currentChapter.currentChapterId

        subchapterActions.loadAllSubchaptersWithUserId({chapterId, userId})
        // get all subchapters
        // axios.get(BASE_URL + `/user/` + userId + `/bookmarks/chapters/${chapterId}`)
        //     .then(res => {
        //         console.log(res.data[1].subchapters)
        //         setSubchapters(res.data[1].subchapters)
        //     })
    
        //     .catch(err => {
        //         console.log(err)
        //     })
    }, [])

 
    function toTwemoji(string) {
        return twemoji.parse(string)
    };

    const searchSubchapters = (searchInput, subchapter) => {
        // console.log(searchInput, "SUBCHAPTERS")
        let rgx = "?![^<>]*>";
        const regex = new RegExp(`(${trim(searchInput)})(${rgx})`, 'gi');
        if (searchInput == "") {
            return subchapter
        } 
        else if (
            subchapter.description.toLowerCase().includes(searchInput.toLowerCase()) ||
            subchapter.subchapterTitle.toLowerCase().includes(searchInput.toLowerCase()) || 
            regex.test(subchapter.content) ){

            return subchapter
        }
    };

    filtered = subchapterState.subchapterlist.filter((subchapter) => searchSubchapters(searchInput, subchapter))


    return (

        <Box margin={4}>
            <Grid pb={2} display="flex" alignItems="center" mb={1}>
                <IconButton onClick={
                    () => { navigate('/Chapters') }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography style={{fontSize: '25px', fontWeight: 'bold'}}>
                    <span dangerouslySetInnerHTML={{__html: toTwemoji(chapterState.selectedChapter.currentChapterIcon)}}></span> {chapterState.selectedChapter.currentChapterTitle}
                </Typography>
                

                
                <Stack direction="row" spacing={2} ml="auto">
                    {/* <Button variant="outlined">Select</Button> */}
                    <Button 
                        component={Link}
                        to="/CreateSubchapter"
                        variant="outlined"
                        sx={{
                            color: 'white',
                            backgroundColor: 'white', // Set background color on hover
                            borderColor: '#41ADA4 !important', // Set border color on hover
                            color: '#41ADA4',
                            '&:hover': {
                                backgroundColor: '#41ADA4',
                                borderColor: '#41ADA4',
                                color: 'white',
                            },
                        }}
                        >
                        <AddIcon />
                            Create new subchapter
                    </Button>
                </Stack>
            </Grid>
        {
            !subchapterState.subchapterlist || subchapterState.subchapterlist.length === 0 ? 
            ( 
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '200px',
                        margin: '0 auto',
                    }}
                >
                    <CircularProgress color='info' size={40} thickness={4} />
                </Box>
            ) :
            (

                            
                    <Grid container spacing={4}>
                        { !filtered.length ? 
                                <Grid item sm={6}>
                                    <Typography variant="h6" ml={""}>No subchapters found</Typography>
                                </Grid> :

                                filtered.map((subchapter) => 
                                {
                                    return (
                                        <Grid item key={subchapter._id} xs={12} sm={6} md={4} lg={3}>
                                            <SubchapterCard
                                                subchapter={subchapter} chapterId={currentChapter.currentChapterId}/>
                                        </Grid>
                                    )
                                
                                })
                        }
                    </Grid>
            )
        }

        </Box>
        
    )
}

export default Subchapters;