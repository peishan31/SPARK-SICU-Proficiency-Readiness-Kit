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
import { useAppState, useActions } from '../overmind'


const Chapters = ({ searchInput }) => {
    let filtered = [];


    // const [chapters, setChapters] = useState([]);
    // useEffect(() => {
    //     axios.get('http://localhost:8080/chapters')
    //         .then(res => {
    //             setChapters(res.data)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }, [])
    // console.log(chapters)
    const chapterState = useAppState().chapters
    const chapterActions = useActions().chapters

    useEffect(() => {
        if (!chapterState.chapterlist || chapterState.chapterlist.length === 0) {
            chapterActions.loadChapters();
        }
        
    }, [])
    console.log("HELLOOO: " + chapterState)

    const searchChapters = (searchInput, chapter) => {
        console.log("HEREEEEE: " + chapter)
        if (searchInput == "") {
            return chapter
        } 
       
    };

    filtered = chapterState.chapterlist.filter((chapter) => searchChapters(searchInput, chapter))



    return (
        <Box pt={5} pl={5} >
            <div className="pageTitle">
                <h1 style={{fontSize: '30px', fontWeight: 'bold', marginBottom: "25px"}}>Chapters</h1>
            </div>
            {console.log("here", chapterState)}
            {
                !chapterState.chapterlist || chapterState.chapterlist.length === 0 ? ( 
                <div>Loading...</div>) : (
                    filtered.map((chapter) => {
                        <Grid container spacing={3}>
                            {
                                chapterState.chapterlist.map((chapter) => {
                                    return (
                                        <Grid key={chapter._id} item>
                                            <ChapterCard chapter={chapter} />
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    })
                )
            }
        </Box>
    )
}

export default Chapters