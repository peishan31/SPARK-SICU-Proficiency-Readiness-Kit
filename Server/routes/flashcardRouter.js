import express from 'express';
import Flashcard from '../models/FlashcardModel.js';
const flashcardRouter = express.Router();

// @description: Get health status of flashcard route
// @route GET flashcards/health
// Working!
flashcardRouter.get("/health", async (req, res) => {
    try {
        res.send("Flashcard Route Healthy")
    } catch (error) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});


// @description: Get all flashcards
// @route GET flashcards/
// Working! 
flashcardRouter.get("/", async (req, res) => {
    try {
        const flashcards = await Flashcard.find()
        res.status(200).json(flashcards)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

// @description: Get individual flashcard by id
// @route GET flashcards/:flashcardId
// Working!
flashcardRouter.get('/:flashcardId', async (req, res) => {
    try {
        const flashcard = await Flashcard.findById(req.params.flashcardId)
        if (!flashcard) {
            return res.status(404).json({ msg: 'Flashcard not found' })
        }
        res.status(200).json(flashcard)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

// @description: Create a flashcard
// @route POST flashcards/
// Working!
flashcardRouter.post("/", async (req, res) => {
    try {
        const { question, answer } = req.body;
        const newFlashcard = new Flashcard ({
            question,
            answer
        });
        const flashcard = await newFlashcard.save();
        res.status(201).json(flashcard);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @description: Update a Flashcard by FlashcardId
// @route PUT flashcards/:flashcardId/
// Working!
flashcardRouter.put("/:flashcardId", async (req, res) => {

    try {
        let { question, answer } = req.body;

        if (question.length === 0 || question == undefined || question == "" || 
            answer.length === 0 || answer == undefined || answer == "") { 
                return res.status(404).json({ msg: 'Fields cannot be empty' })
        }
        
        const flashcardId = req.params.flashcardId;
        const flashcard = await Flashcard.findById(req.params.flashcardId)

        if (!flashcard) {
            return res.status(404).json({ msg: 'Flashcard not found! Cannot be updated.' })
        }else{
           var newFlashcard = await Flashcard.findByIdAndUpdate(flashcardId, {question: question, answer: answer}, {new: true});
           newFlashcard = await Flashcard.findById(flashcardId);
            return res.status(200).json(newFlashcard) 
        }
        
    } catch (err) {
        console.error(err.message)
        return res.status(500).send('Server Error')
    }
});

// @description: delete a flashcard using flashcardId
// @route DELETE flashcards/:flashcardId
// Working!
flashcardRouter.delete('/:flashcardId', async (req, res) => {
    try {
        const flashcardId = req.params.flashcardId;
        const flashcards = await Flashcard.findByIdAndDelete(flashcardId)
        if (!flashcards) {
            return res.status(404).json({ msg: 'Flashcard not found' })
        }
        res.status(200).json(flashcards)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});


export default flashcardRouter;