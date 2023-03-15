import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import chapterRouter from './routes/chapterRouter.js'
import userRouter from './routes/userRouter.js'
import { connectDB } from './config/db.js'

const app = express()
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
connectDB();


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(cors());


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

// create subrouter
app.use("/chapters", chapterRouter)

// create user
app.use("/user", userRouter)

app.listen(8080, () => console.log("listening on port 8080"))