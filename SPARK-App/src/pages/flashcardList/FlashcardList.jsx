import { Box, Button, FormControl, Grid, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Flashcard from '../../components/flashcard/Flashcard';
import './FlashcardList.css'
import { useLocation, useNavigate, Link } from 'react-router-dom';

function FlashcardList() {
    const [flashcards, setFlashcards] = useState([]);
    const [allFlashcards, setAllFlashcards] = useState([]);
    const [categories, setCategories] = useState([]);
    const [dropdownValue, setDropdownValue] = useState("All");

    const location = useLocation();
    const navigate = useNavigate();
    
    // get user details from session storage
    const user = JSON.parse(sessionStorage.getItem('user'));

    function getCategories() {
        console.log("getCategories")
        let result = allFlashcards.map(flashcard => flashcard.category);
        setCategories(result);
    }

    function handleChange(e) {
        setDropdownValue(e.target.value)
    }

    function filterFlashcards() {
        if (dropdownValue != "All") {
            let filteredArray = allFlashcards.filter(flashcard => flashcard.category === dropdownValue)
            setFlashcards(filteredArray)
        } else {
            setFlashcards(allFlashcards)
        }
    }

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + '/flashcards/')
        .then((res) => {
            setFlashcards(res.data)
            setAllFlashcards(res.data)
        })
    }, [])

    useEffect(() => {
        getCategories();
    }, [allFlashcards])

    return (
        <Box p={4}>
            <div className="pageTop">
                <div className="pageTitle">
                    <h1 style={{fontSize: '30px', fontWeight: 'bold', marginBottom: "25px"}}>Flashcards</h1>
                </div>
            </div>

            <div className="dropdownContainerDiv">
                <div className="dropdown">
                    <FormControl sx={{width: "200px"}}>
                        <Select value={dropdownValue} onChange={(e) => handleChange(e)}>
                            <MenuItem value="All">All</MenuItem>
                            {
                                categories.map((category) => {
                                    return (
                                        <MenuItem key={category} value={category}>{category}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </div>
                <Button variant="contained" 
                    onClick={filterFlashcards}
                    sx={{ 
                        backgroundColor: "#41ADA4",
                        ':hover': {
                            bgcolor: '#41ADA4'
                        }
                    }}>Search</Button>
                {
                    user.userType === "senior" ?
                        <Button
                            component={Link}
                            to="/createFlashcards"
                            variant="outlined"
                            sx={{
                                color: 'white',
                                marginLeft: "15px",
                                backgroundColor: "white",
                                borderColor: "#41ADA4 !important",
                                color: "#41ADA4",
                                '&:hover': {
                                    backgroundColor: '#41ADA4',
                                    borderColor: '#41ADA4',
                                    color: 'white',
                                },
                            }}
                            onClick={() => { }}
                        >
                            Add Flashcard
                        </Button> : null
                }
        </div>
            
            <div className="card-grid">
                {
                    flashcards.map((flashcard) => {
                        return (
                            <Flashcard key={flashcard._id} flashcard={flashcard} flashcardsList={flashcards} setFlashcards={setFlashcards} />
                        )
                    })
                }
            </div>
        </Box>
    )
}

export default FlashcardList
