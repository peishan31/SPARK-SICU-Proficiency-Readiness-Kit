import React from 'react'
import { useState, useEffect } from 'react'
import {
    useParams,
    useNavigate
} from "react-router-dom";
import {
    Button,
    Box,
    TextField,
    MenuItem,
    Grid,
    Input,
    CircularProgress,
    IconButton,
    Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios'


const EditFlashcards = () => {
    const { flashcardId } = useParams();
    const [currentFlashCard, setCurrentFlashCard] = useState(null);
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        // fetch flashcard with id
        setLoading(true)
        const fetchFlashcard = async () => {
            await axios.get(import.meta.env.VITE_API_URL + '/flashcards/' + flashcardId)
            .then((res) => {
                const currentFlashCard = res.data
                console.log(currentFlashCard)
                setCurrentFlashCard(currentFlashCard);
            })
            setLoading(false)
        }

        fetchFlashcard()
    }, [setCurrentFlashCard, flashcardId])

    async function updateFlashcard() {
        setLoading(true)
        await axios.put(import.meta.env.VITE_API_URL + "/flashcards/" + flashcardId, {
            "category": currentFlashCard.category,
            "question": currentFlashCard.question,
            "answer": currentFlashCard.answer
        })
        alert("Flashcard edited successfully")
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
                                        Edit Flashcard
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
                                        value={currentFlashCard.question}
                                        onChange={(event) => {
                                            setCurrentFlashCard({
                                                ...currentFlashCard,
                                                question: event.target.value
                                            })
                                        }}
                                        error={currentFlashCard.question.length < 1}
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
                                        value={currentFlashCard.category}
                                        onChange={(event) =>
                                            setCurrentFlashCard({
                                                ...currentFlashCard,
                                                category: event.target.value,
                                            })
                                        }
                                        label='Category'
                                        error={currentFlashCard.category.length < 1}
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
                                    <TextField
                                        id="outlined-textarea"
                                        label="Answer"
                                        placeholder="Placeholder"                                        
                                        multiline
                                        rows={8}
                                        value={currentFlashCard.answer}
                                        onChange={(event) => {
                                            setCurrentFlashCard({
                                                ...currentFlashCard,
                                                answer: event.target.value,
                                            })
                                        }}
                                        error={currentFlashCard.answer.length < 1}

                                    />
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
                                            updateFlashcard();
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
                                            currentFlashCard.question.length < 1 ||
                                            currentFlashCard.category.length < 1 ||
                                            currentFlashCard.answer.length < 1
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

export default EditFlashcards