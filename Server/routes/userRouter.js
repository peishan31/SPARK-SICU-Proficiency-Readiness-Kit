import express from 'express';
import bookmarkRouter from './bookmarkRouter.js';
import User from '../models/UserModel.js';
const userRouter = express.Router();

// @description: Get health status of user route
// @route GET user/health
// Working!
userRouter.get("/health", async (req, res) => {
  try {
      res.send("User Route Healthy")
  } catch (error) {
      console.error(err.message)
      res.status(500).send('Server Error')
  }
});

// @description: Authenticate user
// @route GET user/login
userRouter.get("/login", async (req, res) => {
  try{
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }); 

    if (user) {
      // check password
      if (user.password == password) {
        return res.status(200).json(user);
      }
      return res.status(400).json({
        msg: 'Invalid Login Credentials'
      });
    }

  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
});

// @description: Authenticate user
// @route POST user/register
userRouter.post("/register", async (req, res) => { 

  try {
    const { email, userType, password } = req.body;
    const newUser = new User({
      email,
      userType,
      password
    });

    const user = await newUser.save();
    return res.status(201).json(user);
  } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

/*
// link to subchapter route
userRouter.use("/:userId/subchapters", (req, res, next) => {
  req.userId = req.params.userId;
  next();
}, bookmarkRouter);
*/

// link to bookmark route
userRouter.use("/:userId/bookmarks", (req, res, next) => {
  req.userId = req.params.userId;
  next();
}, bookmarkRouter);

export default userRouter;