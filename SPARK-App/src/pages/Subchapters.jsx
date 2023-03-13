import React from 'react';
import { Typography, Button, IconButton, Stack, Grid, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SubchapterCard from '../components/subchapters/SubchapterCard';
import { useAppState, useActions } from '../overmind';

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

    // extract currentchapter details
    const chapterId = currentChapter.currentChapterId
    const chapterTitle = currentChapter.currentChapterTitle
    const chapterIcon = currentChapter.currentChapterIcon

    // extract currentUser details
    const userId = userState.currentUser._id
    
    let filtered = [];
    // const [subchapters, setSubchapters] = useState([]);

    
    
    useEffect(() => {
        subchapterActions.loadAllSubchaptersWithUserId({chapterId, userId})
        // get all subchapters
        // axios.get(`http://localhost:8080/user/63e87a7780b6c0bcb29d15d0/bookmarks/chapters/${chapterId}`)
        //     .then(res => {
        //         console.log(res.data[1].subchapters)
        //         setSubchapters(res.data[1].subchapters)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
    }, [])


    const searchSubchapters = (searchInput, subchapter) => {
        if (searchInput == "") {
            return subchapter
        } 
        else if (
            subchapter.description.toLowerCase().includes(searchInput.toLowerCase()) ||
            subchapter.subchapterTitle.toLowerCase().includes(searchInput.toLowerCase()) || 
            subchapter.content.toLowerCase().includes(searchInput.toLowerCase())){
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
                <Typography style={{fontSize: '25px', fontWeight: 'bold'}}>{chapterIcon} {chapterTitle}</Typography>
                <Stack direction="row" spacing={2} ml="auto">
                    {/* <Button variant="outlined">Select</Button> */}
                    {/* <Button variant="outlined" onClick={navigateToSubChapter}>
                        <AddIcon />
                            Create new subchapter
                    </Button> */}
                </Stack>
            </Grid>
                    
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
                                    subchapter={subchapter} chapterId={chapterId}/>
                                </Grid>
                            )
                        
                        })
                }
            </Grid>
        </Box>
    )
}

export default Subchapters;