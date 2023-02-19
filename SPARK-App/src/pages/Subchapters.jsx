import React from 'react'
import Widget from '../components/widget/Widget'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FilterListIcon from '@mui/icons-material/FilterList'
import AddIcon from '@mui/icons-material/Add'
import SubchapterCard from '../components/subchapters/SubchapterCard'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect,getState } from 'react'
import axios from 'axios'

import Chapters from './Chapters';

export default function Subchapters({parentToChild}) {
    const location = useLocation();
    const chapterId = location.state.parentChapterId
    let [subchapters, setSubchapters] = useState([]);
 
    useEffect(() => {

        axios.get(`http://localhost:8080/Chapters/${chapterId}/subchapters/`)
            .then(res => {
                setSubchapters(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const filterWords =()=>{
        if(window.location.pathname !=`/Chapters/${chapterId}/subchapters`){
            return;
        }

        let userTyped = parentToChild.toLowerCase();
        let newSubchaptersList = []
        for (let i = 0; i < subchapters.length; i++) {
            let title = subchapters[i].subchapterTitle.split(" ");
            let description = subchapters[i].description.split(" ");
            let combinedArray = title.concat(description)

            let allLowerCaseArray = combinedArray.map(element => {
                return element.toLowerCase();
              });

            if(allLowerCaseArray.some(e => e.includes(userTyped))){
                newSubchaptersList.push(subchapters[i])
            }
          }
        subchapters = newSubchaptersList


    }


    return (
        <Box margin={3}  onChange={filterWords()}>
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
            
            {subchapters.length>0 &&
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
            }

            {subchapters.length==0 &&
            <p>No results found.</p>
            }
        </Box>
    )
}