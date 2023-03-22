import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';

import chapterRouter from './routes/chapterRouter.js'
import userRouter from './routes/userRouter.js'
import { connectDB } from './config/db.js'
import User from './models/UserModel.js';

const app = express()
app.use(express.json({limit: '50mb'}))
app.use(cookieParser());
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
connectDB();


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(cors({ credentials: true, origin: true }));


// @description: Get health status of basic route
// @route GET /health
// Working!
app.get('/health', async (req, res) => {
  try {
    res.send("Base Route Healthy")
  } catch (error) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})


app.get('/users', async(req, res) => {
  try {
    const userList = await User.find();
    res.status(200).json(userList);
    
  } catch (error) {
    console.log(error)
    res.status(500).send('Server Error')
  }
})


// create user
app.use("/user", userRouter)

// create subrouter
app.use("/chapters", chapterRouter)


app.listen(8080, () => console.log("listening on port 8080"))