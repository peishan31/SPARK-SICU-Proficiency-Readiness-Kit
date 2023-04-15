import { Box, Button, CircularProgress, FormControl, Grid, MenuItem, Select, Container } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Flashcard from '../../components/flashcard/Flashcard';
import Carousel from 'react-material-ui-carousel';
import './FlashcardList.css'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAppState } from '../../overmind';

function FlashcardList() {
    const [flashcards, setFlashcards] = useState([]);
    const [allFlashcards, setAllFlashcards] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [dropdownValue, setDropdownValue] = useState("All");
    const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
    const [height, setHeight] = useState('auto')


    const location = useLocation();
    const navigate = useNavigate();
    
    // get user details from overmind state
    const user = useAppState().user.currentUser;

    function getCategories() {
        let result = allFlashcards.map(flashcard => flashcard.category);
        let resultSet = [... new Set(result)]
        setCategories(resultSet);
    }

    function handleChange(e) {
        setDropdownValue(e.target.value)
    }

    const handleSlideChange = (newIndex, oldIndex) => {
        setCurrentCarouselIndex(newIndex)
    };

    const clampIndex = () => {
        const lastIndex = flashcards.length - 1;
        let index = Math.min(Math.max(currentCarouselIndex, 0), lastIndex)
        return index
      };

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
            setAllFlashcards(res.data)
            setFlashcards(res.data)
            setLoaded(true)
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

            {
                !loaded ?
                (
                    <div
                        style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%"}}
                        >
                        <CircularProgress color='info' size={40} thickness={4} />
                    </div>
                ) :
                (
                    <div className="wrapper">
                        <div className="dropdownContainerDiv">
                            <div className="dropdown">
                                <FormControl sx={{width: "200px"}}>
                                    <Select value={dropdownValue} 
                                            onChange={(e) => handleChange(e)}>
                                        <MenuItem value="All">All</MenuItem>
                                        {
                                            categories.map((category) => {
                                                return (
                                                    <MenuItem value={category}>{category}</MenuItem>
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
                                        to="createFlashcards"
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
                        
                        <Box sx={{display: "flex", justifyContent: "center"}}>
                            <Carousel
                                sx={{p: "10px 3px 0px", width: "100%", maxWidth: "600px"}}
                                swipe={true}
                                autoPlay={false}
                                height={300}
                                animation="slide"
                                onChange={handleSlideChange}
                                fullHeightHover={false}
                                index={clampIndex()}
                                >
                                {
                                    flashcards.map(
                                        (flashcard) => {
                                            return (
                                            <Flashcard key={flashcard._id} flashcard={flashcard} flashcardsList={flashcards} setFlashcards={setFlashcards} setHeight={setHeight} height={height} />
                                            )
                                        }
                                    )
                                }
                            </Carousel>
                        </Box>

                        {/* <div className="card-grid">
                            {
                                flashcards.map((flashcard) => {
                                    return (
                                        <Flashcard key={flashcard._id} flashcard={flashcard} flashcardsList={flashcards} setFlashcards={setFlashcards} />
                                    )
                                })
                            }
                        </div> */}
                    </div>
                )
            }
            
        </Box>
    )
}

export default FlashcardList
