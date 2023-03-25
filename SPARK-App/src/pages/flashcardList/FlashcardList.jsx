import { Box } from '@mui/material'
import React from 'react'
import Flashcard from '../../components/flashcard/Flashcard'

function FlashcardList() {
    return (
        <Box p={4}>
            <div className="pageTitle">
                <h1 style={{fontSize: '30px', fontWeight: 'bold', marginBottom: "25px"}}>Flashcards</h1>
            </div>
            <div className="flashcards">
                <Flashcard/>
            </div>
        </Box>
    )
}

export default FlashcardList
