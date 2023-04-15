
import React, { useEffect, useRef, useState } from 'react'
import "./Flashcard.css"
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import { Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import { useAppState } from '../../overmind';


function Flashcard({flashcard, allFlashcardsList, setAllFlashcards, activeCard, currentCarouselIndex, setActiveHeight}) {

    // get user details from overmind state
    const user = useAppState().user.currentUser;
    const [height, setHeight] = useState('auto')
    const [flip, setFlip] = useState(false);
    // const [height, setHeight] = useState('auto')

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

    function setMaxHeight() {
        console.log("setMaxHeight")
        const frontHeight = frontEl.current.getBoundingClientRect().height
        const backHeight = backEl.current.getBoundingClientRect().height

        console.log(Math.max(frontHeight, 300))
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

    useEffect(() => {
        setMaxHeight();
    }, [flashcard])

    useEffect(() => {
        if (activeCard) {
            setActiveHeight(height)
        }
    }, [currentCarouselIndex, flashcard, height])


    return (
        <div className={`card ${flip ? 'flip' : ''}`} style={{ height: height }} onClick={() => setFlip(!flip)}>
            <div className="front" ref={frontEl} >
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
                    <h5 className="cardText" style={{whiteSpace: "pre-line"}}>
                        {flashcard.question}
                    </h5>
            </div>
            <div className="back" ref={backEl} style={{ height: height, whiteSpace: "pre-line" }}>
                { flashcard.answer }
            </div>
        </div>
    )
}

export default Flashcard
