import React from 'react'
import Widget from '../components/widget/Widget'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FilterListIcon from '@mui/icons-material/FilterList'
import AddIcon from '@mui/icons-material/Add'
import SubchapterCard from '../components/subchapters/SubchapterCard'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

const Subchapters = () => {

    const subchapters = [
        {
            title: "Subchapter 1",
            description: "This is the first subchapter",
            image: "../../assets/handbook1.jpg"

        },
        {
            title: "Subchapter 2",
            description: "This is the second subchapter",
            image: "../../assets/handbook1.jpg"
        },
        {
            title: "Subchapter 3",
            description: "This is the third subchapter",
            image: "../../assets/handbook1.jpg"
        },
        {
            title: "Subchapter 3",
            description: "This is the third subchapter",
            image: "../../assets/handbook1.jpg"
        },
        {
            title: "Subchapter 3",
            description: "This is the third subchapter",
            image: "../../assets/handbook1.jpg"
        },
    ]


    return (
        <div>
            <h1>Subchapters</h1>
            <Stack direction="row" spacing={2} mb={2} justifyContent="flex-end">
                <Button variant="outlined">Select</Button>
                <Button variant="outlined">
                    <AddIcon />
                        Create new subchapter
                </Button>
                <Button variant="outlined">
                    <FilterListIcon />
                        Filter
                </Button>
            </Stack>
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
        </div>
    )
}

export default Subchapters