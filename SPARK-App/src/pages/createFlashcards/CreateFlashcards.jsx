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
                        <Typography style={{ fontSize: '25px', fontWeight: 'bold' }}>
                            Add Flashcards
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container>
                            {/* <Grid item className="errorMessage" style={{marginBottom: '20px'}}>
                                {errorMessage}
                            </Grid> */}    
                            <Grid item xs={12} >
                                <Grid container>
                                    <Grid item xs={12} md={9} lg={9}>
                                        <TextField sx={{marginBottom: "2ch"}}
                                            fullWidth
                                            value={category}
                                            onChange={(event) =>
                                                setCategory(event.target.value)
                                            }
                                            label='Category'
                                            // error={category.length < 1}
                                        ></TextField>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={9} lg={9}>
                                <TextField sx={{marginBottom: "2ch"}}
                                    fullWidth
                                    label='Flashcard Question'
                                    variant='outlined'
                                    onChange={(event) => {
                                        setFlashcardQuestion(event.target.value);
                                    }}
                                    // error={flashcardQuestion.length < 1}
                                ></TextField>
                            </Grid>
                        </Grid>
                    </Grid>
                
                    <Grid item xs={12} >
                        <Grid container>
                            <Grid item xs={12} md={9} lg={9}>
                                <TextField fullWidth
                                    id="outlined-textarea"
                                    label="Answer"
                                    placeholder="Placeholder"
                                    rows={8}
                                    multiline
                                    onChange={(event) => {
                                        setFlashcardAnswer(event.target.value);
                                    }}
                                    // error={flashcardAnswer.length < 1}
                                ></TextField>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} >
                        <Button
                            variant='outlined'
                            onClick={() => {
                                addFlashcard();
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
                            }}
                            // disabled={
                            //     flashcardQuestion.length < 1 ||
                            //     flashcardAnswer.length < 1 ||
                            //     category.length < 1
                            // }
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Box>
    )
}

export default CreateFlashcards