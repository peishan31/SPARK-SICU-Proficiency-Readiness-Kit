import express from 'express';
import bookmarkRouter from './bookmarkRouter.js';
import User from '../models/UserModel.js';
import { OAuth2Client } from 'google-auth-library'
import jwt_decode from 'jwt-decode';

const userRouter = express.Router();

// Google Auth
const client = new OAuth2Client(process.env.SSO_CLIENT_ID);

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
// @route POST user/login
userRouter.post('/login', (req,res)=>{
  let token = req.body.token;
  let user = {}
  
  async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.SSO_CLIENT_ID, 
      });
      const payload = ticket.getPayload();
      const userId = payload.sub;

      let user = await User.findOne({ googleId: userId });

      if (!user) {
        user = new User({
          googleId: payload.sub,
          name: payload.name,
          email: payload.email,
          picture: payload.picture,
          userType: "junior"
        })
      } else {
        // If the user already exists, update their information
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
      }

      await user.save();

      return user;
  }
  
  verify()
  .then(user => {
      res.cookie('session-token', token, {
        secure: false,
        httpOnly: true
      });
      res.send(user);
  })
  .catch(
    console.error
    );
})

const checkAdmin = function (req, res, next) {
  let token = req.cookies['session-token'];
  let decoded = jwt_decode(token);
  let id = decoded['sub'];
      
  const currentUser = User.findOne({googleId: id}, 
    function(err,obj) { 
      if ( obj.userType != "senior" ) {
        res.status(401).json({ message: "Unauthorized" });
      } else {
        return next()
      }
    });
}

// @description: Middleware function to check if user is admin
userRouter.put('/update', checkAdmin, (req, res)=>{
  async function updateUserType(userId, userType) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { googleId: userId }, 
        { userType: userType },
        { returnDocument: 'after' }
      );

      return updatedUser;
    
    } catch (error) {
      console.error(error);
    }
  }
  
  for (const [key, value] of Object.entries(req.body)) {
    console.log(`Update ${key}'s userType to ${value}`)

    try {
      const updatedUser = updateUserType(key, value)
      .then(user => {
        res.status(200).send(user);
      })

    } catch(error) {
      console.error(error.message);
      res.status(500).send('Server Error')
    }

    // .then(user => {
    //     res.end();
    // })
    // catch(err){
    //   console.log(err.response.data)
    //   res.status(500).send('Server Error')
    // } 
  }
})

// // @description: Create user
// // @route POST user/register
// userRouter.post("/register", async (req, res) => { 

//   try {
//     const { email, userType, password } = req.body;
//     const newUser = new User({
//       email,
//       userType,
//       password
//     });

//     const user = await newUser.save();
//     return res.status(201).json(user);
//   } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error')
//     }
// });

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