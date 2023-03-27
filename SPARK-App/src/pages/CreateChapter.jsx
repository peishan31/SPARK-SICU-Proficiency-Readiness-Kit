 import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from "../components/sidebar/Sidebar"
import Widget from "../components/widget/Widget"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';
import {Button, Box, TextField, MenuItem, Grid, Input, CircularProgress, IconButton, Typography} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import "./home.css"
import { useAppState } from '../overmind';


export default function CreateChapter() {  

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [chapterTitle, setChapterTitle] = useState('');
    const [chapterIcon, setChapterIcon] = useState('');

    const userState = useAppState().user
    const navigate = useNavigate();

    const BASE_URL = import.meta.env.VITE_API_URL
    
    async function addChapter() {
        setErrorMessage(""); // initialize error message
        setLoading(true);
        if (chapterTitle == undefined || chapterTitle == '' || chapterIcon == null || chapterIcon == undefined || chapterIcon == '' || chapterIcon == null) {
            setLoading(false);
            setErrorMessage("Fields cannot be empty");
            return;
        }
        await axios
            .post(BASE_URL + '/chapters/', {
                title: chapterTitle,
                chapterIcon: chapterIcon
            })
            .then(() => {
                setLoading(false);
                window.location.href = "/Chapters"
                // navigate(-1);
            })
            .catch((error) => {
                setLoading(false);
                console.log("error",error);
                
                if (error.response.status == 404) {
                    setErrorMessage(error.response.data.msg);
                    return;
                }
                setErrorMessage(error.response.data.msg);
            });
    }

    useEffect(() => {
        if ( userState.currentUser.userType != "senior" ) {
            navigate("/");
        }
    }, [])

    return (
        <div className="home">
            {loading ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        width: '200px',
                        margin: '0 auto',
                    }}
                >
                    <CircularProgress color='info' size={40} thickness={4} />
                </Box>
            ) : (
            <div className="homeContainer">
               <div className='pageTitle'>
                        <Grid pb={2} display="flex" alignItems="center" mb={1}>
                            <IconButton onClick={
                                () => { navigate(-1) }}>
                                <ArrowBackIcon />
                            </IconButton>
                            <Typography style={{fontSize: '25px', fontWeight: 'bold'}}>
                                Add Chapter
                            </Typography>
                        </Grid>
                        {/* <p className='fs-1 fw-bold'>Add Subchapter</p> */}
                    </div>
                    <div className="errorMessage">
                        {errorMessage}
                    </div>
                    <Grid item xs={6} sm={12} lg={12}>
                        <Box
                            component='form'
                            sx={{
                                '& .MuiTextField-root': {
                                    width: '101ch',
                                    marginTop: '2ch',
                                },
                            }}
                        >
                            <TextField
                                label='Title'
                                variant='outlined'
                                value={chapterTitle}
                                onChange={(event) =>
                                    setChapterTitle(event.target.value)
                                }
                            ></TextField>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={12} lg={12}>
                        <Box
                            component='form'
                            sx={{
                                '& .MuiTextField-root': {
                                    width: '101ch',
                                    marginTop: '2ch',
                                },
                            }}
                        >
                            <TextField label='Icon'
                                variant='outlined'
                                value={chapterIcon}
                                onChange={(event) =>
                                    setChapterIcon(event.target.value)
                                }
                            ></TextField>
                        </Box>
                    </Grid>
                
                    <Grid item xs={12} sm={12} lg={12}>
                        <Box
                            sx={{
                                marginTop: '5ch',
                            }}
                        >
                            <Button
                                variant='outlined'
                                onClick={() => {
                                    addChapter();
                                }}
                                component='span'
                                sx={{
                                    color: 'white',
                                    backgroundColor: '#41ADA4',
                                    borderColor: '#41ADA4',
                                    '&:hover': {
                                        backgroundColor: 'white', // Set background color on hover
                                        borderColor: '#41ADA4 !important', // Set border color on hover
                                        color: '#41ADA4',
                                    },
                                }}
                            >
                            Save
                            </Button>
                        </Box>
                    </Grid>
                </div>
            )}
        </div>
    );
}