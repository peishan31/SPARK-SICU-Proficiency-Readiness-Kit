import * as React from 'react';
import { useState } from 'react';
import { Typography, Card, CardContent, CardMedia, CardActionArea, IconButton, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useAppState } from '../../overmind';

export default function MultiActionAreaCard(props) {
    
    const navigate = useNavigate();
    const chapterId = props.subchapter.chapterId;
    const currentSubchapterId = props.subchapter._id;
    const [visible, setVisible] = useState(true);

    const userState = useAppState().user;
    const userId = userState.currentUser.googleId;
    const API_URL = import.meta.env.VITE_API_URL;


    async function removeBookmark(bookmarkId) {
        await axios.delete(
            API_URL + `/user/${userId}/bookmarks/${bookmarkId}`
        ).then(
            res => {
                setVisible((prev) => !prev);
                // when it is unbookmarked, send the status back to bookmark parent component
                props.isUnbookmarked(true);
                console.log('remove');
                return 200;
            }
        ).catch(
            err => {
                // return 500
                if(err.response.status == 500) {
                    navigate("/500");
                } else if(err.response.status == 404) {
                    navigate("/404");
                } else {
                    navigate("/other-errors");
                }
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
                    image={props.subchapter.thumbnail}
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
                                        bookmarkId: props.subchapter.bookmarkId
                                    }
                                })
                        }
                    }
                />
                <CardContent>
                    <Grid pb={1} display="flex" justifyContent="space-between">
                        <Typography display="contents" gutterBottom sx={{fontSize: "20px", fontWeight: "bold", lineHeight: 1.3}} component="div">
                            {props.subchapter.subchapterTitle}
                        </Typography>
                        <Box ml="auto">
                            <IconButton color="primary"  onClick={
                                e => {
                                    removeBookmark(props.subchapter.bookmarkId);
                                    // navigate(0);
                                }}>
                                <BookmarkIcon className="bookmark" /> 
                            </IconButton>
                        </Box>
                    </Grid>
                    <Typography className="cardText" variant="body2">
                        {props.subchapter.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}