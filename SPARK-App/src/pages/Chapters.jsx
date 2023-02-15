import React from 'react'
import Widget from '../components/widget/Widget'
import { Button } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import AddIcon from '@mui/icons-material/Add'
import ChapterCard from '../components/chapters/ChapterCard'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import { useState, useEffect } from 'react'

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
        <div>
            <h1>Chapters</h1>
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
        </div>
    )
}

export default Chapters