import { Box, Button, FormControl, Grid, MenuItem, Select } from '@mui/material'
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
            <div className="pageTop">
                <div className="pageTitle">
                    <h1 style={{fontSize: '30px', fontWeight: 'bold', marginBottom: "25px"}}>Flashcards</h1>
                </div>
                {/* <div className="dropdownContainerDiv">
                    <div className="dropdown">
                        <FormControl fullWidth>
                            <Select value={"Option 1"}>
                                <MenuItem value={"Option 1"}>Option 1</MenuItem>
                                <MenuItem value={"Option 2"}>Option 2</MenuItem>
                                <MenuItem value={"Option 3"}>Option 3</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <Button sx={{height: "90%"}} variant="contained">Search</Button>
                </div> */}
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
