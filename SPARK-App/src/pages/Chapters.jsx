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


const Chapters = ({searchInput}) => {
    let filtered =[];
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
        // console.log("INSIDE USEeFFECT",chapterState.chapterlist)
        }
        
    }, [])
    // console.log("testing",chapterState.chapterlist[0])

    const searchChapters = (searchInput, chapter) => {
        // console.log(searchInput)
        if (searchInput == "" || searchInput==null) {
            return chapter
        } else{
            // console.log(chapter, " IN CHAPTERS.JSX")
            // console.log(chapter.subchapters)
            for(var subchapters of chapter.subchapters){
                // console.log(subchapters)
                if (
                    subchapters.description.toLowerCase().includes(searchInput.toLowerCase()) ||
                    subchapters.subchapterTitle.toLowerCase().includes(searchInput.toLowerCase()) || 
                    subchapters.content.toLowerCase().includes(searchInput.toLowerCase())){
                    return chapter
                }
            }

  
    }};
    filtered = chapterState.chapterlist.filter((chapter) => searchChapters(searchInput,chapter))




    return (
        <Box pt={5} pl={5}>
            <div className="pageTitle">
                <h1 style={{fontSize: '30px', fontWeight: 'bold', marginBottom: "25px"}}>Chapters</h1>
            </div>
            {/* {console.log("here", chapterState)} */}
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
                    ) : (
                    
                        <Grid container spacing={3}>

                    { !filtered.length ? 
                            <Grid item sm={6}>
                                <Typography variant="h6" ml={""}>No chapters found</Typography>
                            </Grid> :
                            
                                filtered.map((chapter) => {
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