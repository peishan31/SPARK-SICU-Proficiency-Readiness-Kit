import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import "./Flashcard.css"
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import { Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import { useAppState } from '../../overmind';


function NewFlashcard({flashcard, allFlashcardsList, setAllFlashcards, activeCard, currentCarouselIndex, setActiveHeight, idx, flashcards}) {
    // get user details from overmind state
    const user = useAppState().user.currentUser;
    const [height, setHeight] = useState('auto')
    const [flip, setFlip] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);

        if (!event) {
            var event = window.event;
        }
    
        event.cancelBubble = true;
    
        if (event.stopPropagation) {
            event.stopPropagation();
        }
    };

    const handleClose = (event) => {
        setAnchorEl(null);
    
        if (!event) {
            var event = window.event;
        }

        event.cancelBubble = true;

        if (event.stopPropagation) {
            event.stopPropagation();
        }
    };
    
    const frontEl = useRef()
    const backEl = useRef()

    const setMaxHeight = () => {
        const frontHeight = frontEl.current.getBoundingClientRect().height
        setHeight(Math.max(frontHeight, 300))
    }

    function handleDelete(e) {
        axios.delete(import.meta.env.VITE_API_URL + '/flashcards/' + flashcard._id)
        .then((res) => {
            if (res.status == "200") {
                alert("Deleted flashcard!")
            } else {
                alert("Something went wrong")
            }
            
        }).catch((err) => {
            alert("Something went wrong")
        });
        
        let filteredArray = allFlashcardsList.filter(flashcardFromList => flashcardFromList._id !== flashcard._id)
        setAllFlashcards(filteredArray)

        setAnchorEl(null);

        if (!e) {
            var e = window.event;
        }
        
        e.cancelBubble = true;
        
        if (e.stopPropagation) {
            e.stopPropagation();
        }
    }

    useLayoutEffect(() => {
        setMaxHeight();
    }, [flashcard, flashcards])

    useEffect(() => {
        if (activeCard) {
            setActiveHeight(height)
        }
    }, [currentCarouselIndex, height])

    return (
        <div className={`card ${flip ? 'flip' : ''}`} style={{ height: height }} onClick={() => setFlip(!flip)}>
            <div className="front" ref={frontEl}>
            {
                user.userType == "senior" && (
                    <div className="moreButton">
                        <MoreVertIcon 
                                sx={{color: "#b5b5b5"}} 
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            />
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleDelete}>
                                Delete
                            </MenuItem>

                            <MenuItem onClick={(e) => {
                                    e.stopPropagation();
                                }}>
                                <Link to={`/Flashcards/${flashcard._id}`}>
                                    Edit
                                </Link>
                            </MenuItem>
                        </Menu> 
                    </div>) 
                }
            
                {flashcard.question}
            </div>
            <div className="back" style={{ whiteSpace: "pre-line" }}>
                {flashcard.answer}
            </div>
        </div>
    )
}

export default NewFlashcard
