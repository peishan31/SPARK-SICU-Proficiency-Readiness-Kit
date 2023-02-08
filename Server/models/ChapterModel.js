import mongoose from 'mongoose';
import subchapterSchema from './SubchapterModel.js';
const ChapterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    subchapters: [
        subchapterSchema
    ]
});

const Chapter = mongoose.model("chapter", ChapterSchema);
export default Chapter;