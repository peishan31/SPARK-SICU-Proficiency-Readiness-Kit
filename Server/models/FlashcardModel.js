import mongoose from 'mongoose';
const FlashcardSchema = new mongoose.Schema({
    category: {
        type: String
    },
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true
    }
});

const Flashcard = mongoose.model("flashcard", FlashcardSchema);
export default Flashcard;
