import * as React from 'react';
import { useState } from 'react'
import { Typography, Card, CardContent, CardMedia, CardActionArea, IconButton, Box, Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Button from '@mui/material/Button';

export default function SubchapterCard({ subchapter, chapterId }) {
    const navigate = useNavigate();
    const currentSubchapterId = subchapter._id;
    const [isBookmarked, setIsBookmarked] = useState(subchapter.isBookmarked);

    async function addBookmark() {
        // console.log("add")
        await axios.put(
            'http://localhost:8080/user/63e87a7780b6c0bcb29d15d0/bookmarks/',
            {
                subchapterId: currentSubchapterId,
                chapterId: chapterId
            }
        ).then(
            res => {
                subchapter.bookmarkId = res.data.bookmarkId
                subchapter.isBookmarked = true
                return 200
            }
        ).catch(
            err => {
                return 500
            }
        )
    }

    async function removeBookmark(bookmarkId) {
        // console.log("remove")
        await axios.delete(
            `http://localhost:8080/user/63e87a7780b6c0bcb29d15d0/bookmarks/${bookmarkId}`
        ).then(
            res => {
                subchapter.isBookmarked = false
                return 200;
            }
        ).catch(
            err => {
                return 500
            }
        )}

    async function bookmarkHandler() {
        if(isBookmarked) {
            await removeBookmark(subchapter.bookmarkId)
            setIsBookmarked(false)            
        }
        else{
            await addBookmark()
            setIsBookmarked(true)
        }
    }

    return (
        <Card sx={{ maxWidth: 445 }}>
            <CardActionArea disableRipple>
                <CardMedia
                    component="img"
                    height="225"
                    image="../../assets/handbook1.jpg"
                    alt="green iguana"
                    onClick={
                        () => {
                            navigate(`${currentSubchapterId}/subchapterContent`,
                                {
                                    state: {
                                        parentChapterId: chapterId,
                                        parentSubchapterId: currentSubchapterId,
                                        bookmarkStatus: subchapter.isBookmarked
                                    }
                                })
                        }
                    }
                />
                <CardContent>
                    <Grid pb={1} display="flex" alignItems="center">
                        <Typography display="contents" gutterBottom variant="h5" component="div">
                            {subchapter.subchapterTitle}
                        </Typography>
                        <Box ml="auto" >
                            {
                                isBookmarked ? 
                                    <BookmarkIcon margin={"4"} color="primary" onClick={e => { bookmarkHandler() }} /> : <BookmarkBorderIcon color="primary" margin={"4"} onClick={e => { bookmarkHandler() }} />
                            }
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