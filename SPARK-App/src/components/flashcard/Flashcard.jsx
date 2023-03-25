
import React, { useEffect, useRef, useState } from 'react'
import "./Flashcard.css"
import DeleteIcon from '@mui/icons-material/Delete';

function Flashcard({flashcard}) {

    const [flip, setFlip] = useState(false);
    const [height, setHeight] = useState('initial')
    
    const frontEl = useRef()
    const backEl = useRef()

    function setMaxHeight() {
        const frontHeight = frontEl.current.getBoundingClientRect().height
        // const backHeight = backEl.current.getBoundingClientRect().height
        setHeight(Math.max(frontHeight, 250))
    }

    useEffect(() => {
        setMaxHeight();

    }, [flashcard.question, flashcard.answer])


    return (
        <div className={`card ${flip ? 'flip' : ''}`} style={{ height: height }} onClick={() => setFlip(!flip)}>
            <div className="front" ref={frontEl}>
                <DeleteIcon/>
                <h5>{ flashcard.question }</h5>
            </div>
            <div className="back" ref={backEl} style={{ height: height }}>
                { flashcard.answer }
            </div>
        </div>
    )
}

export default Flashcard
