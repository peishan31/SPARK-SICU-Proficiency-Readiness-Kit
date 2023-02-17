import * as React from 'react'
import { Typography, Card, CardContent, CardMedia, CardActionArea, IconButton, Box, Grid } from '@mui/material'
import { useState } from 'react'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import axios from 'axios'


export default function MultiActionAreaCard({ subchapter }) {
    const currentSubchapterId = subchapter._id;
    const [clicked, setClicked] = useState('')
    async function addBookmark() {
        await axios.put(
            'http://localhost:8080/user/63e87a7780b6c0bcb29d15d0/bookmarks/',
            {
                subchapterId: currentSubchapterId,
                chapterId: "63ea35d26c0ef100ca017647"
            }
        );
    }

    async function removeBookmark() {
        await axios.delete(
            'http://localhost:8080/user/63e87a7780b6c0bcb29d15d0/bookmarks/63ec93ea8da3af3690c762d5',
            {
                subchapterId: currentSubchapterId,
                chapterId: "63ea35d26c0ef100ca017647"
            }
        );
    }

    return (
        <Card sx={{ maxWidth: 445 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="225"
                    image="../../assets/handbook1.jpg"
                    alt="green iguana"
                />
                <CardContent>
                    <Grid pb={1} display="flex" alignItems="center">
                    <Typography display="contents" gutterBottom variant="h5" component="div">
                        {subchapter.subchapterTitle}
                    </Typography>
                    <Box ml="auto">
                    <IconButton color="primary" onClick={
                        e => {setClicked(!clicked)
                            if(clicked) {
                                console.log("yes")
                            }else{
                                addBookmark()
                            }
                        }}>
                        {clicked ? <BookmarkIcon /> : <BookmarkBorderIcon /> 
                        }
                    </IconButton>
                    </Box>
                    </Grid>
                    <Typography variant="body2" color="text.secondary">
                        {subchapter.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}