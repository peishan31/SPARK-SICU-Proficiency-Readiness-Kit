import express from 'express'

import multer from 'multer'
import sharp from 'sharp'
import crypto from 'crypto'
import cors from 'cors'
import bodyParser from 'body-parser'

import { uploadFile, deleteFile, getObjectSignedUrl } from './s3.js'
import chapterRouter from './routes/chapterRouter.js'
import { connectDB } from './config/db.js'
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
connectDB();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

// app.get("/api/posts", async (req, res) => {
//   const posts = await prisma.posts.findMany({orderBy: [{ created: 'desc'}]})
//   for (let post of posts) {
//     post.imageUrl = await getObjectSignedUrl(post.imageName)
//     console.log("imageUrl: ", post.imageUrl);
//   }
//   res.send(posts)
// })

app.post('/api/posts', upload.single('image'), async (req, res) => {

  const file = req.file
  const caption = req.body.caption
  const imageName = generateFileName()

  const fileBuffer = await sharp(file.buffer)
    .toBuffer() //can delete this later

  await uploadFile(fileBuffer, imageName, file.mimetype).then( (i) => {
    console.log("Upload image done! ",imageName);
    console.log("Upload image done! ImageUrl: https://testing-bucket-clt.s3.us-east-1.amazonaws.com/"+imageName);
    res.send({'location': "https://testing-bucket-clt.s3.us-east-1.amazonaws.com/"+ imageName})
  })
  
})
// app.delete("/api/posts/:id", async (req, res) => {
//   const id = +req.params.id
//   const post = await prisma.posts.findUnique({where: {id}}) 

//   await deleteFile(post.imageName)

//   await prisma.posts.delete({where: {id: post.id}})
//   res.send(post)
// })

// // Rich-text-editor stuffs
// app.get("/testing", async (req, res) => {
//   const notes = await prisma.notes.findMany()
//   res.send(notes)
// })

// app.post('/api/newpost', async (req, res) => {
  
//   const post = await prisma.notes.create({
//     data: {
//       richText: req.body.richText 
//     }
//   })
//   res.status(201).send(post)
// })

// create subrouter
app.use("/chapters", chapterRouter)


app.listen(8080, () => console.log("listening on port 8080"))