import React from 'react';
import { Typography, Grid, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BookmarkCard from '../components/bookmarks/BookmarkCard';
import SubchapterCard from "../components/subchapters/SubchapterCard";

const Bookmarks = ({ searchInput }) => {
    const [subchapters, setSubchapters] = useState([]);
    const [unbookmark, setUnbookmark] = useState(false);

    const BASE_URL = import.meta.env.VITE_API_URL
    const USER_ID = import.meta.env.VITE_USER_ID
    // retrieve the unbookmark status from bookmark card component
    const isUnbookmarked = (unbookmark) => {
        setUnbookmark(unbookmark)
        axios.get(BASE_URL+`/user/` + USER_ID + `/bookmarks`)
            .then(res => {
                console.log(res.data)
                setSubchapters(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    };

    useEffect(() => {
        axios.get(BASE_URL + `/user/` + USER_ID + `/bookmarks`)
            .then(res => {
                setSubchapters(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    let filtered = []
    const searchSubchapters = (searchInput, subchapter) => {
        if (searchInput == "") {
            return subchapter
        }
        else if (
            subchapter.description.toLowerCase().includes(searchInput.toLowerCase()) ||
            subchapter.subchapterTitle.toLowerCase().includes(searchInput.toLowerCase()) || 
            subchapter.content.toLowerCase().includes(searchInput.toLowerCase())) {
            return subchapter
        }
    };

    filtered = subchapters.filter((subchapter) => searchSubchapters(searchInput, subchapter))


    return (
        <Box margin={4} >
            <div className="pageTitle">
                <h1 style={{fontSize: '30px', fontWeight: 'bold', marginBottom: "25px"}}>Bookmarks</h1>
            </div>
            <Grid container spacing={4}>
                {
                    !filtered.length ? 
                        <Grid item md={4}>
                            <Typography variant="h6" ml={""}>No subchapters found</Typography>
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