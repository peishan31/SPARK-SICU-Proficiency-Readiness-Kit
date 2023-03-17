import mongoose from 'mongoose';

const subchapterSchema = new mongoose.Schema({
    subchapterTitle: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
    },
    description: {
        type: String,
    },
    content: {
        // this will store the html string from TinyMCE
        type: String
    }
});

export default subchapterSchema;