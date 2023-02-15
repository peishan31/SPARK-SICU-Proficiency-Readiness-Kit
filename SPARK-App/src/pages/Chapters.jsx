import React from 'react'
import Widget from '../components/widget/Widget'
import { Button } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import AddIcon from '@mui/icons-material/Add'
import ChapterCard from '../components/chapters/ChapterCard'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

const Chapters = () => {

    const chapters = [
        {
            title: "Chapter 1",
            description: "This is the first chapter",
            image: "../../assets/handbook1.jpg"

        },
        {
            title: "Chapter 2",
            description: "This is the second chapter",
            image: "../../assets/handbook1.jpg"
        },
        {
            title: "Chapter 3",
            description: "This is the third chapter",
            image: "../../assets/handbook1.jpg"
        },
        {
            title: "Chapter 3",
            description: "This is the third chapter",
            image: "../../assets/handbook1.jpg"
        },
        {
            title: "Chapter 3",
            description: "This is the third chapter",
            image: "../../assets/handbook1.jpg"
        },
    ]


    return (
        <div>
            <h1>Chapters</h1>
            <Grid container spacing={4}>
            {
                chapters.map((chapter) => {
                    return (
                        <Grid item md={4}>
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