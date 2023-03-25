import mongoose from 'mongoose';

const subchapterSchema = new mongoose.Schema({
    subchapterTitle: {
        type: String,
        required: true,
    },
    thumbnailPublicId: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        // this will store the html string from TinyMCE
        type: String,
        required: true
    },
    lastModifiedDateTime: {
        type: Date
    },
    lastModifiedUserID: {
        type: String
    },
    lastModifiedUsername: {
        type: String
    }
});

export default subchapterSchema;