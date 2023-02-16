import React from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add'
import SubchapterCard from '../components/subchapters/SubchapterCard'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'

const Subchapters = () => {
    const location = useLocation();

    const chapterId = location.state.parentChapterId
    
    const [subchapters, setSubchapters] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/chapters/${chapterId}/subchapters`)
            .then(res => {
                setSubchapters(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <Grid pb={2} display="flex" alignItems="center">
                <Typography variant="h4">Subchapters</Typography>
                <Stack direction="row" spacing={2} ml="auto">
                    <Button variant="outlined">Select</Button>
                    <Button variant="outlined" onClick={navigateToSubChapter}>
                        <AddIcon />
                            Create new subchapter
                    </Button>
                </Stack>
            </Grid>
            <Grid container spacing={4}>
        <Box margin={3} >
            <h1>Subchapters</h1>
            <Stack direction="row" spacing={2} mb={2} justifyContent="flex-end">
                <Button variant="outlined">Select</Button>
                {/* <Button variant="outlined" onClick={navigateToSubChapter}>
                    <AddIcon />
                        Create new subchapter
                </Button> */}
                <Button variant="outlined">
                    <FilterListIcon />
                        Filter
                </Button>
            </Stack>
            <Grid container spacing={2}>
            {
                subchapters.map((subchapter) => {
                    return (
                        <Grid key={subchapter._id} item md={4}>
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