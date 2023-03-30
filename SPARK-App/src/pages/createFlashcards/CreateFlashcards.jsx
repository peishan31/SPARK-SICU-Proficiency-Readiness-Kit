import React from 'react'
import axios from 'axios'

import { useState, useEffect } from 'react'
import {
    Button,
    Box,
    TextField,
    MenuItem,
    Grid,
    Input,
    CircularProgress,
    IconButton,
    Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'
import { useAppState, useActions } from '../../overmind'

const CreateFlashcards = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState("")
    const [flashcardQuestion, setFlashcardQuestion] = useState("")
    const [flashcardAnswer, setFlashcardAnswer] = useState("")

    const userState = useAppState().user;

    const BASE_URL = import.meta.env.VITE_API_URL;


    useEffect(() => {

        if (userState.currentUser.userType != "senior") {
            navigate("/");
        }
    }, []);

    async function addFlashcard() {
        setLoading(true)
        await axios.post(BASE_URL + "/flashcards", {
            "category": category,
            "question": flashcardQuestion,
            "answer": flashcardAnswer
        })
        alert("Flashcard added successfully")
        setLoading(false)
        navigate("/Flashcards");
    }


    return (
        <div>
            {
                loading ? (
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
                    <div className='homeContainer'>
                            <div className='pageTitle'>
                                <Grid pb={2} display="flex" alignItems="center" mb={1}>
                                    <IconButton onClick={
                                        () => { navigate(-1) }}>
                                        <ArrowBackIcon />
                                    </IconButton>
                                    <Typography style={{ fontSize: '25px', fontWeight: 'bold' }}>
                                        Add Flashcards
                                    </Typography>
                                </Grid>
                            </div>
                            {/* flashcard question */}
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
                                        label='Flashcard Question'
                                        variant='outlined'
                                        onChange={(event) => {
                                            setFlashcardQuestion(event.target.value);
                                        }}
                                        error={flashcardQuestion.length < 1}
                                    ></TextField>
                                </Box>
                            </Grid>
                            {/* Category */}
                            <Grid item xs={12} sm={12} lg={12}>
                                <Box
                                    component='form'
                                    sx={{
                                        '& .MuiTextField-root': {
                                            width: '25ch',
                                            marginTop: '2ch',
                                        },
                                    }}
                                >
                                    <TextField
                                        value={category}
                                        onChange={(event) =>
                                            setCategory(event.target.value)
                                        }
                                        label='Category'
                                        error={category.length < 1}
                                    >
                                    </TextField>
                                </Box>
                            </Grid>
                            {/* flashcard answer */}
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
                                    
                                    <textarea style={{width: "100%", minWidth: "100px", maxWidth: "800px", marginTop: "30px", height: "100px"}}
                                        onChange={(event) => {
                                            setFlashcardAnswer(event.target.value);}}
                                        >

                                    </textarea>
                                </Box>
                            </Grid>
                            
                            {/* Save button */}
                            <Grid item xs={12} sm={12} lg={12}>
                                <Box
                                    sx={{
                                        marginTop: '5ch',
                                    }}
                                >
                                    <Button
                                        variant='outlined'
                                        onClick={() => {
                                            addFlashcard();
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
                                        disabled={
                                            flashcardQuestion.length < 1 ||
                                            flashcardAnswer.length < 1 ||
                                            category.length < 1
                                        }
                                    >
                                        Save
                                    </Button>
                                </Box>
                            </Grid>
                    </div>
                )
            }
        </div>
    )
}

export default CreateFlashcards