import React from 'react'
import { Button } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import AddIcon from '@mui/icons-material/Add'
import ChapterCard from '../components/chapters/ChapterCard'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react'
import { useAppState, useActions } from '../overmind'


const Chapters = () => {

    
    const chapterState = useAppState().chapters
    const chapterActions = useActions().chapters

    useEffect(() => {
        if (!chapterState.chapterlist || chapterState.chapterlist.length === 0) {
            chapterActions.loadChapters();
        }
    }, [])



    return (
        <Box pt={5} pl={5} >
            <div className="pageTitle">
                <h1 style={{fontSize: '30px', fontWeight: 'bold', marginBottom: "25px"}}>Chapters</h1>
            </div>
            {
                !chapterState.chapterlist || chapterState.chapterlist.length === 0 ? ( 
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '200px',
                            margin: '0 auto',
                        }}
                    >
                        <CircularProgress color='info' size={40} thickness={4} />
                    </Box>
                )
                : (
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
                )
            }
        </Box>
    )
}

export default Chapters