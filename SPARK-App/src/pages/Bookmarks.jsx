import React from 'react';
import { Typography, Grid, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BookmarkCard from '../components/bookmarks/BookmarkCard';

const Bookmarks = () => {
    const [subchapters, setSubchapters] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/user/63e87a7780b6c0bcb29d15d0/bookmarks`)
            .then(res => {
                setSubchapters(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <Box margin={3} >
            <Grid pb={2} display="flex" alignItems="center">
                <Typography variant="h4">Bookmarks</Typography>
            </Grid>
            <Grid container spacing={4}>
            {
                subchapters.map((subchapter) => {
                    return (
                        <Grid item md={4}>
                            <BookmarkCard subchapter={subchapter} />
                        </Grid>
                    )
                })
            }
            </Grid>
        </Box>
    )
}

export default Bookmarks