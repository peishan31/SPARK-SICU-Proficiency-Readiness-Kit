import express from 'express';
import User from '../models/userModel.js';
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
        res.status(200).json({
          msg: 'Login Successful!'
        })
      }
      res.status(400).json({
        msg: 'Invalid Login Credentials'
      })
    }

  } catch (error) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @description: Authenticate user
// @route POST user/register
userRouter.post("/register", async (req, res) => { 

  try {
    const { email, password } = req.body;
    const newUser = new User({
      email,
      password
    });

    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

export default userRouter;