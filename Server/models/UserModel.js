import mongoose from 'mongoose';
import subchapterSchema from './SubchapterModel.js';
import chapterSchema from './ChapterModel.js';
import bookmarkSchema from './BookmarkModel.js';

const UserSchema = new mongoose.Schema({
  googleId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
    },
    picture: {
      type: String
    },
    userType: {
      type: String,
      required: true
    },
    bookmarks: [
      bookmarkSchema
    ]
});

const User = mongoose.model("user", UserSchema);
export default User;
