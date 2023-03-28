
import React, { useEffect, useRef, useState } from 'react'
import "./Flashcard.css"
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import { Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';


function Flashcard({flashcard, flashcardsList, setFlashcards}) {

    // const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))

    const [flip, setFlip] = useState(false);
    const [height, setHeight] = useState('initial')

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);

        if (!event) {
            var e = window.event;
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
        const frontHeight = frontEl.current.getBoundingClientRect().height
        // const backHeight = backEl.current.getBoundingClientRect().height
        setHeight(Math.max(frontHeight, 250))
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
        
        let filteredArray = flashcardsList.filter(flashcardFromList => flashcardFromList._id !== flashcard._id)
        setFlashcards(filteredArray)

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
    }, [flashcard.question, flashcard.answer])


    return (
        <div className={`card ${flip ? 'flip' : ''}`} style={{ height: height }} onClick={() => setFlip(!flip)}>
            <div className="front" ref={frontEl}>
                <div className="deleteButton">
                    <MoreVertIcon 
                        sx={{color: "#b5b5b5"}} 
                        // onClick={handleDelete}
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    />

                    {
                        user.userType == "senior" ? (
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

                                <MenuItem>
                                    <Link to={`/Flashcards/${flashcard._id}`}>
                                        Edit
                                    </Link>
                                </MenuItem>
                            </Menu> ) : null
                    }
                </div>
                <div>
                    <h5 className="cardText">{ flashcard.question }</h5>
                </div>
            </div>
            <div className="back" ref={backEl} style={{ height: height }}>
                { flashcard.answer }
            </div>
        </div>
    )
}

export default Flashcard
