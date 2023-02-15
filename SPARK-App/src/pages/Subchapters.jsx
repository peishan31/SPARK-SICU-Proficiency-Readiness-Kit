import React from 'react'
import Widget from '../components/widget/Widget'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FilterListIcon from '@mui/icons-material/FilterList'
import AddIcon from '@mui/icons-material/Add'
import SubchapterCard from '../components/subchapters/SubchapterCard'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import {useState,getState} from 'react';
import Chapters from './Chapters';

const Subchapters = (props)=> {

    let subchapters = [
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

    const filterWords =()=>{
        let userTyped = "Subchapter";
        let newSubchaptersList = []
        for (let i = 0; i < subchapters.length; i++) {
            let title = subchapters[i].title.split(" ");
            let description = subchapters[i].description.split(" ");
            let combinedArray = title.concat(description)

            if(combinedArray.some(e => e.includes(userTyped))){
                newSubchaptersList.push(subchapters[i])
            }
          }
        subchapters = newSubchaptersList

    }

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
                    <FilterListIcon onClick={filterWords()}/>
                        Filter
                </Button>
            </Stack>
            {subchapters.length>0 &&
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
            }

            {/* {subchapters.length>0 &&
            <b>No results found.</b>
            } */}
        </div>
    )
}

export default Subchapters