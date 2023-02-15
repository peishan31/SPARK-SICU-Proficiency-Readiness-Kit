import mongoose from 'mongoose';
import subchapterSchema from './SubchapterModel.js';
import chapterSchema from './ChapterModel.js';
import bookmarkSchema from './BookmarkModel.js';

const UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    bookmarks: [
      bookmarkSchema
    ]
    // subchapters: [
    //     subchapterSchema
    // ]
});

const User = mongoose.model("user", UserSchema);
export default User;
