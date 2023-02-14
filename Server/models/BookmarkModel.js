import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
    subchapterId: {
        type: String,
        required: true,
    },
    chapterId: {
        type: String,
        required: true,
    },
});

export default bookmarkSchema;
