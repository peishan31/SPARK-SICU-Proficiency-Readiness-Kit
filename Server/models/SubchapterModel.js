import mongoose from 'mongoose';

const subchapterSchema = new mongoose.Schema({
    _id: {
        type: Number,
        requiered: true,
    },
    subchapterTitle: {
        type: String,
        required: true,
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