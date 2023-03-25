import { QuestionAnswerOutlined } from '@material-ui/icons';
import { Card, CardContent } from '@mui/material'
import React, { useState } from 'react'
import "./Flashcard.css"

function Flashcard() {

    const [flip, setFlip] = useState(false);
    const question = "Question"
    const answer = "Answer"

    return (
        <div className={`card ${flip ? 'flip' : ''}`} onClick={() => setFlip(!flip)}>
            <div className="front">
                { question }
            </div>
            <div className="back">
                { answer }
            </div>
        </div>
    )
}

export default Flashcard
