import React from 'react'
import { Button } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import AddIcon from '@mui/icons-material/Add'
import ChapterCard from '../components/chapters/ChapterCard'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react'
import { margin } from '@mui/system'

const Chapters = () => {

    const [chapters, setChapters] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/chapters')
            .then(res => {
                setChapters(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    console.log(chapters)



    return (
        <Box margin={3} >
            <Grid container spacing={2} >
                <Grid item xs={12}>
                    <h1>Chapters</h1>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
            {
                chapters.map((chapter) => {
                    return (
                        <Grid key={chapter._id} item md={3}>
                            <ChapterCard chapter={chapter} />
                        </Grid>
                    )
                })
            }
            </Grid>
        </Box>
    )
}

export default Chapters