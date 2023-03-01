import * as React from 'react';
import { useState } from 'react';
import { Typography, Card, CardContent, CardMedia, CardActionArea, IconButton, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export default function MultiActionAreaCard({ subchapter }) {
    
    const navigate = useNavigate();
    const chapterId = subchapter.chapterId;
    const currentSubchapterId = subchapter._id;
    const [visible, setVisible] = useState(true);

    async function removeBookmark(bookmarkId) {
        await axios.delete(
            `http://localhost:8080/user/63e87a7780b6c0bcb29d15d0/bookmarks/${bookmarkId}`
        ).then(
            res => {
                setVisible((prev) => !prev);
                console.log('remove');
                return 200;
            }
        ).catch(
            err => {
                return 500
            }
        )
    }

    if (!visible) return null;
    return (
        <Card sx={{ maxWidth: 445,
            borderRadius: "20px",
            ':hover': {
                bgcolor: '#41ADA4',
                color: 'white'
            },
            ".cardText": {
                color: "text.secondary"
            },
            ".bookmark": {
                color: "#41ADA4"
            },
            ".bookmarkOutline": {
                color: "#41ADA4"
            }, 
            "&:hover .cardText": {
                color: "white"
            },
            "&:hover .bookmark": {
                color: "white"
            },
            "&:hover .bookmarkOutline": {
                color: "white"
            }
             }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="225"
                    image={subchapter.thumbnail}
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
                    <Grid pb={1} display="flex" justifyContent="space-between">
                        <Typography display="contents" gutterBottom sx={{fontSize: "20px", fontWeight: "bold", lineHeight: 1.3}} component="div">
                            {subchapter.subchapterTitle}
                        </Typography>
                        <Box ml="auto">
                            <IconButton color="primary" onClick={
                                e => {
                                    removeBookmark(subchapter.bookmarkId)
                                    // navigate(0);
                                }}>
                                <BookmarkIcon className="bookmark"/> 
                            </IconButton>
                        </Box>
                    </Grid>
                    <Typography variant="body2" className="cardText">
                        {subchapter.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}