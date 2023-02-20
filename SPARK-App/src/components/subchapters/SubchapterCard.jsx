import * as React from 'react';
import { Typography, Card, CardContent, CardMedia, CardActionArea, IconButton, Box, Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

export default function SubchapterCard({ subchapter }) {
    
    const location = useLocation();
    const navigate = useNavigate();
    const chapterId = location.state.parentChapterId;
    const currentSubchapterId = subchapter._id;

    async function addBookmark() {
        await axios.put(
            'http://localhost:8080/user/63e87a7780b6c0bcb29d15d0/bookmarks/',
            {
                subchapterId: currentSubchapterId,
                chapterId: chapterId
            }
        );
    }

    async function removeBookmark(bookmarkId) {
        await axios.delete(
            `http://localhost:8080/user/63e87a7780b6c0bcb29d15d0/bookmarks/${bookmarkId}`
        );
    }

    async function bookmarkHandler() {
        if(subchapter.isBookmarked == true) {
            removeBookmark(subchapter.bookmarkId)
            navigate(0);
        }else{
            addBookmark();
            navigate(0);
        }
    }


    return (
        <Card sx={{ maxWidth: 445 }} onClick={
            () => {
                navigate(`${currentSubchapterId}/subchapterContent`,
                    {
                        state: {
                            parentChapterId: chapterId,
                            parentSubchapterId: currentSubchapterId,
                        }
                    })
                }
        }>
            <CardActionArea disableRipple>
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
                        <Box ml="auto" >
                            {
                                subchapter.isBookmarked ? 
                                <BookmarkIcon color="primary" onClick={e => {bookmarkHandler()}}/> : <BookmarkBorderIcon color="primary" onClick={e => {bookmarkHandler()}}/>
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