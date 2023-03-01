import React from 'react';
import { Typography, Grid, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BookmarkCard from '../components/bookmarks/BookmarkCard';

const Bookmarks = ({ searchInput }) => {
    const [subchapters, setSubchapters] = useState([]);
    const [unbookmark, setUnbookmark] = useState(false);
    // retrieve the unbookmark status from bookmark card component
    const isUnbookmarked = (unbookmark) => {
        setUnbookmark(unbookmark)
        axios.get(`http://localhost:8080/user/63e87a7780b6c0bcb29d15d0/bookmarks`)
            .then(res => {
                setSubchapters(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/user/63e87a7780b6c0bcb29d15d0/bookmarks`)
            .then(res => {
                setSubchapters(res.data)
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
        <Box margin={3} >
            <Grid pb={2} display="flex" alignItems="center">
                <Typography variant="h4">Bookmarks</Typography>
            </Grid>
            <Grid container spacing={4}>
                {
                    !filtered.length ? 
                        <Grid item md={4}>
                            <Typography variant="h6" ml={""}>No subchapters found</Typography>
                        </Grid> :
                        filtered.map((subchapter) => {
                            return (
                                <Grid item key={subchapter._id} md={4}>
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