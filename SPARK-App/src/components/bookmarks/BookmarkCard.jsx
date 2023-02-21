import * as React from 'react';
import { Typography, Card, CardContent, CardMedia, CardActionArea, IconButton, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export default function MultiActionAreaCard({ subchapter }) {
    
    const navigate = useNavigate();
    const chapterId = subchapter.chapterId;
    const currentSubchapterId = subchapter._id;

    async function removeBookmark(bookmarkId) {
        await axios.delete(
            `http://localhost:8080/user/63e87a7780b6c0bcb29d15d0/bookmarks/${bookmarkId}`
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
                    onClick={
                        () => {
                            navigate(`/Chapters/${chapterId}/subchapters/${currentSubchapterId}/subchapterContent`,
                                {
                                    state: {
                                        parentChapterId: chapterId,
                                        parentSubchapterId: currentSubchapterId,
                                        // bookmark status will always be true here 
                                        // because bookmark page only listed the bookmarked subchapters
                                        bookmarkStatus: true,
                                        bookmarkId: subchapter.bookmarkId
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
                    <Box ml="auto">
                    <IconButton color="primary"  onClick={
                        e => {
                            removeBookmark(subchapter.bookmarkId)
                            navigate(0);
                        }}>
                        <BookmarkIcon /> 
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