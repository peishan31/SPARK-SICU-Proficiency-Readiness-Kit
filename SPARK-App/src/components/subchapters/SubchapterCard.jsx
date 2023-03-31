import * as React from 'react';
import { useState } from 'react'
import { Typography, Card, CardContent, CardMedia, CardActionArea, IconButton, Box, Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppState, useActions } from '../../overmind';

export default function SubchapterCard({ subchapter, chapterId }) {
    const navigate = useNavigate();
    const currentSubchapterId = subchapter._id;
    const [isBookmarked, setIsBookmarked] = useState(subchapter.isBookmarked);

    const userState = useAppState().user;
    const userId = userState.currentUser.googleId;
    const API_URL = import.meta.env.VITE_API_URL;

    const subchapterState = useAppState().subchapters
    const subchapterActions = useActions().subchapters

    const [open, setOpen] = useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    const handleToggle = () => {
      setOpen(!open);
    };

    async function addBookmark() {
        console.log("add")
        console.log(userId)
        // handleToggle()
        await axios.put(
            API_URL + `/user/${userId}/bookmarks/`,
            {
                subchapterId: currentSubchapterId,
                chapterId: chapterId
            }
        ).then(
            res => {
                // subchapter.bookmarkId = res.data.bookmarkId
                subchapterActions.setBookmarkId(res.data.bookmarkId)
                subchapterActions.isBookmarked(true)
                // subchapter.isBookmarked = true
                // console.log(subchapter.isBookmarked)
                // handleClose()
                return 200;
            }
        ).catch(
            err => {
                return 500;
            }
        )
    }

    async function removeBookmark(bookmarkId) {
        console.log("remove")
        console.log(userId)
        // handleToggle()
        await axios.delete(
            API_URL + `/user/${userId}/bookmarks/${bookmarkId}`
        ).then(
            res => {
                subchapter.isBookmarked = false
                // handleClose()
                return 200;
            }
        ).catch(
            err => {
                return 500;
            }
        )}

    async function bookmarkHandler() {
        if(isBookmarked) {
            await removeBookmark(subchapterState.bookmarkId)
            setIsBookmarked(false)            
        }
        else{
            await addBookmark()
            setIsBookmarked(true)
        }
    }


    return (
        <Card sx={{ 
                    maxWidth: 445, 
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
                    },
                    // "@media (max-width: 380px)": {
                    //   maxWidth: 400,
                    // },
                    // "@media (max-width: 600px)": {
                    //     maxWidth: 445,
                    // }
                }}
            >
            <CardActionArea disableRipple>
                <CardMedia
                    component="img"
                    height="225"
                    image={subchapter.thumbnail}
                    alt="green iguana"
                    onClick={
                        () => {
                            navigate(`${currentSubchapterId}/subchapterContent`,
                                {
                                    state: {
                                        parentChapterId: chapterId,
                                        parentSubchapterId: currentSubchapterId,
                                        bookmarkStatus: subchapterState.isBookmarked
                                    }
                                })
                        }
                    }
                />
                <CardContent
                          onClick={
                            () => {
                                navigate(`${currentSubchapterId}/subchapterContent`,
                                    {
                                        state: {
                                            parentChapterId: chapterId,
                                            parentSubchapterId: currentSubchapterId,
                                            bookmarkStatus: subchapterState.isBookmarked
                                        }
                                    })
                            }
                        }
                >
                    <Grid pb={1} display="flex" justifyContent="space-between">
                        <Typography display="contents" gutterBottom sx={{fontSize: "20px", fontWeight: "bold", lineHeight: 1.3}} component="div">
                            {subchapter.subchapterTitle}
                        </Typography>
                        <Box>
                            {
                                isBookmarked ? 
                                    <BookmarkIcon className="bookmark" margin={4} onClick={e => { bookmarkHandler() }} /> : <BookmarkBorderIcon className="bookmarkOutline" margin={"4"} onClick={e => { bookmarkHandler() }} />
                            }
                        </Box>
                    </Grid>
                    <Typography className="cardText" variant="body2">
                        {subchapter.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Card>
    );
}