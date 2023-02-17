import React from 'react';
import { Typography, Button, IconButton, Stack, Grid, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SubchapterCard from '../components/subchapters/SubchapterCard';

const Subchapters = () => {
    
    const location = useLocation();
    const navigate = useNavigate();
    const chapterId = location.state.parentChapterId
    const [subchapters, setSubchapters] = useState([]);
    const [chapterTitle, setChapterTitle] = useState('');
    const [chapterIcon, setChapterIcon] = useState('');

    useEffect(() => {
        // axios.get(`http://localhost:8080/chapters/${chapterId}/subchapters`)
        axios.get(`http://localhost:8080/user/63e87a7780b6c0bcb29d15d0/bookmarks/chapters/${chapterId}`)
            .then(res => {
                setSubchapters(res.data[1].subchapters)
                setChapterTitle(res.data[0].title)
                setChapterIcon(res.data[0].chapterIcon)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <Box margin={3} >
            <Grid pb={2} display="flex" alignItems="center">
                <IconButton>
                    <ArrowBackIcon onClick={
                        () => {navigate('/Chapters')}}
                    />
                </IconButton>
                <Typography variant="h4">{chapterIcon}{chapterTitle}</Typography>
                <Stack direction="row" spacing={2} ml="auto">
                    <Button variant="outlined">Select</Button>
                    {/* <Button variant="outlined" onClick={navigateToSubChapter}>
                        <AddIcon />
                            Create new subchapter
                    </Button> */}
                </Stack>
            </Grid>
            <Grid container spacing={4}>
            {
                subchapters.map((subchapter) => {
                    return (
                        <Grid item md={4}>
                            <SubchapterCard subchapter={subchapter} />
                        </Grid>
                    )
                })
            }
            </Grid>
        </Box>
    )
}

export default Subchapters