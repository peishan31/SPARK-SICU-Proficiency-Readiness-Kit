 import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from "../components/sidebar/Sidebar"
import Widget from "../components/widget/Widget"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';
import {Button, Box, Stack, TextField, MenuItem, Grid, Input, CircularProgress, IconButton, Typography} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import { useAppState } from '../overmind';


export default function CreateChapter() {  

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [chapterTitle, setChapterTitle] = useState('');
    const [chapterIcon, setChapterIcon] = useState('');
    const [untouched, setUntouched] = useState(true);

    const userState = useAppState().user
    const navigate = useNavigate();

    const BASE_URL = import.meta.env.VITE_API_URL
    
    async function addChapter() {
        setErrorMessage(""); // initialize error message
        setLoading(true);
        // if (chapterTitle == undefined || chapterTitle == '' || chapterIcon == null || chapterIcon == undefined || chapterIcon == '' || chapterIcon == null) {
        //     setLoading(false);
        //     setErrorMessage("Fields cannot be empty");
        //     return;
        // 

        await axios
            .post(BASE_URL + '/chapters/', {
                title: chapterTitle,
                chapterIcon: chapterIcon
            })
            .then(() => {
                setLoading(false);
                alert("Successfully Created Chapter")
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
        
        <Box margin={4}>
            
            {loading ? (
                <Grid pb={2} display="flex" alignItems="center" mb={1}>
                    <CircularProgress color='info' size={40} thickness={4} />  
                </Grid>
            ) : (
                <Grid pb={2} alignItems="center" mb={1}>
                    <Grid item xs={12} display="flex" sx={{marginBottom: "35px"}}>
                        <IconButton onClick={
                            () => { navigate(-1) }}>
                            <ArrowBackIcon />
                        </IconButton>   
                        <Typography style={{fontSize: '25px', fontWeight: 'bold'}}>Add Chapter</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={12} md={9} lg={9}>
                                <TextField sx={{marginBottom: "2ch"}}
                                    fullWidth
                                    label='Title'
                                    variant='outlined'
                                    value={chapterTitle}
                                    onChange={(event) =>{
                                        setUntouched(false);
                                        setChapterTitle(event.target.value)
                                    }}
                                    error={chapterTitle.length < 1 && !untouched}
                                    helperText={chapterTitle.length < 1 && !untouched ? "Title cannot be empty" : ""}
                                ></TextField>
                            {/* <Grid item className="errorMessage" style={{marginBottom: '20px'}}>
                                {errorMessage}
                            </Grid> */}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} >
                        <Grid container>
                            <Grid item xs={12} md={9} lg={9}>
                                <TextField fullWidth
                                    label='Icon' 
                                    variant='outlined'
                                    value={chapterIcon}
                                    onChange={(event) =>{
                                        setUntouched(false);
                                        setChapterIcon(event.target.value)
                                    }}
                                    inputProps={{ maxLength: 2 }}
                                    error={chapterIcon.length < 1 && !untouched}
                                    helperText={chapterIcon.length < 1 && !untouched ? "Icon cannot be empty" : ""}
                                ></TextField>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} >
                        <Button 
                            variant='outlined'
                            onClick={() => {
                                addChapter();
                            }}
                                component='span'
                                sx={{
                                    marginTop: '5ch',
                                    color: 'white',
                                    backgroundColor: '#41ADA4',
                                    borderColor: '#41ADA4',
                                    '&:hover': {
                                        backgroundColor: 'white', // Set background color on hover
                                        borderColor: '#41ADA4 !important', // Set border color on hover
                                        color: '#41ADA4',
                                    },
                                    '&.Mui-disabled': {
                                        backgroundColor: '#98d8d3',
                                        color: 'white',
                                        borderColor: '#98d8d3',
                                    }
                                }}
                                disabled={
                                    chapterTitle.length < 1 ||
                                    chapterIcon.length < 1
                                }
                            >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
}