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

    // const chapters = [
    //     {
    //         title: "Chapter 1",
    //         description: "This is the first chapter",
    //         image: "../../src/handbook1.jpg"

    //     },
    //     {
    //         title: "Chapter 2",
    //         description: "This is the second chapter",
    //         image: "../../src/handbook1.jpg"
    //     },
    //     {
    //         title: "Chapter 3",
    //         description: "This is the third chapter",
    //         image: "../../src/handbook1.jpg"
    //     },
    //     {
    //         title: "Chapter 3",
    //         description: "This is the third chapter",
    //         image: "../../src/handbook1.jpg"
    //     },
    //     {
    //         title: "Chapter 3",
    //         description: "This is the third chapter",
    //         image: "../../src/handbook1.jpg"
    //     },
    // ]

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
            <Grid container spacing={4}>
            {
                chapters.map((chapter) => {
                    return (
                        <Grid key={chapter._id} item md={4}>
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