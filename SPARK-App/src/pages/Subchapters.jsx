import React from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add'
import SubchapterCard from '../components/subchapters/SubchapterCard'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { useNavigate } from 'react-router-dom'

const Subchapters = () => {
    const navigate = useNavigate();

    const navigateToSubChapter = () => {
        navigate('/createsubchapter');
    }
    const subchapters = [
        {
            title: "Subchapter 1",
            description: "This is the first subchapter",
            image: "../../src/handbook1.jpg"

        },
        {
            title: "Subchapter 2",
            description: "This is the second subchapter",
            image: "../../src/handbook1.jpg"
        },
        {
            title: "Subchapter 3",
            description: "This is the third subchapter",
            image: "../../src/handbook1.jpg"
        },
        {
            title: "Subchapter 3",
            description: "This is the third subchapter",
            image: "../../src/handbook1.jpg"
        },
        {
            title: "Subchapter 3",
            description: "This is the third subchapter",
            image: "../../src/handbook1.jpg"
        },
    ]


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