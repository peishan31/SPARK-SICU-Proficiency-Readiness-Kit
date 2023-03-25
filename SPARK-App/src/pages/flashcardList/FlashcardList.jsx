import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Flashcard from '../../components/flashcard/Flashcard';
import './FlashcardList.css'

function FlashcardList() {
    const [flashcards, setFlashcards] = useState([]);

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + '/flashcards/')
        .then((res) => {
            setFlashcards(res.data)
        })
    }, [])

    return (
        <Box p={4}>
            <div className="pageTitle">
                <h1 style={{fontSize: '30px', fontWeight: 'bold', marginBottom: "25px"}}>Flashcards</h1>
            </div>
            <div className="card-grid">
                {
                    flashcards.map((flashcard) => {
                        return (
                            <Flashcard key={flashcard._id} flashcard={flashcard} />
                        )
                    })
                }
            </div>
        </Box>
    )
}

export default FlashcardList
