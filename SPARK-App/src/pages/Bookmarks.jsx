import React from 'react';
import { Typography, Grid, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BookmarkCard from '../components/bookmarks/BookmarkCard';
import SubchapterCard from "../components/subchapters/SubchapterCard";
import { useAppState } from '../overmind';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";

const Bookmarks = ({ searchInput }) => {
    const [subchapters, setSubchapters] = useState(null);
    const [unbookmark, setUnbookmark] = useState(false);

    const userState = useAppState().user;
    const userId = userState.currentUser.googleId;

    const navigate = useNavigate();

    const BASE_URL = import.meta.env.VITE_API_URL
    // retrieve the unbookmark status from bookmark card component
    const isUnbookmarked = (unbookmark) => {
        setUnbookmark(unbookmark)
        axios.get(BASE_URL+`/user/` + userId + `/bookmarks`)
            .then(res => {
                console.log(res.data)
                setSubchapters(res.data)
            })
            .catch(err => {
                console.log(err)
                if(err.response.status == 500) {
                    navigate("/500");
                } else if(err.response.status == 404) {
                    navigate("/404");
                } else {
                    navigate("/other-errors");
                }
            })
    };

    useEffect(() => {
        axios.get(BASE_URL + `/user/` + userId + `/bookmarks`)
            .then(res => {
                setSubchapters(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
                if(err.response.status == 500) {
                    navigate("/500");
                } else if(err.response.status == 404) {
                    navigate("/404");
                } else {
                    navigate("/other-errors");
                }
            })
    }, [])


    if ( subchapters == null ) {
        return (
            <div
                style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%", marginTop: "2px"}}
                >
                    <CircularProgress color='info' size={40} thickness={4} />
            </div>
        )
    }  
    
    var filtered = subchapters.filter(n => n)
    
    return (
        <Box margin={4} >
            <div className="pageTitle">
                <h1 style={{fontSize: '30px', fontWeight: 'bold', marginBottom: "25px"}}>Bookmarks</h1>
            </div>
            <Grid container spacing={4}>
                {
                    !filtered.length ? 
                        <Grid item md={4}>
                            <Typography variant="h6" ml={""}>No bookmarked subchapters yet!</Typography>
                        </Grid> :
                        filtered.map((subchapter) => {
                            return (

                                <Grid item key={subchapter._id} xs={12} sm={6} md={4} lg={3}>
                                    <BookmarkCard key={subchapter._id} subchapter={subchapter} isUnbookmarked={isUnbookmarked} />
                                </Grid>
                            )
                        })

                }
            </Grid>
        </Box>
    )
}

export default Bookmarks