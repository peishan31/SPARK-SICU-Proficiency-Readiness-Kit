import express from 'express'

import multer from 'multer'
import sharp from 'sharp'
import crypto from 'crypto'
import cors from 'cors'
import bodyParser from 'body-parser'

import { PrismaClient } from '@prisma/client'
import { uploadFile, deleteFile, getObjectSignedUrl } from './s3.js'

const app = express()
const prisma = new PrismaClient()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//This function will create a new chapter
app.post("/api/addChapter", async (req, res) => {
  console.log("req.body: ",req.body);
  const { chapterTitle, chapterIcon } = req.body
  const result = await prisma.chapters.create({
    data: {
      chapterTitle,
      chapterIcon,
    },
  })
  res.json(result)
})

//This function will find all the chapters
app.get('/api/chapters', async (req, res) => {
  const chapters = await prisma.chapters.findMany({})
  res.send(chapters)
})

app.get("/api/posts", async (req, res) => {
  const posts = await prisma.posts.findMany({orderBy: [{ created: 'desc'}]})
  for (let post of posts) {
    post.imageUrl = await getObjectSignedUrl(post.imageName)
    console.log("imageUrl: ", post.imageUrl);
  }
  res.send(posts)
})

app.post('/api/posts', upload.single('image'), async (req, res) => {

  //console.log("hello: ", req.files);
  // if (!req.files) {
  //   return res.status(400).send('No files were uploaded.');
  // }
  // console.log("hey",req);

  res.send({'location': "https://testing-bucket-clt.s3.us-east-1.amazonaws.com/363c2519cfb9f8a2aca0b6a4b390c8f49f7a4038978c545c36d76e54c81210dd"})

  // console.log("req.body: ",req.body);
  // console.log("req.file: ",req.file); // image obj
  // // req.file.buffer --> image send to S3
  // const file = req.file
  // const caption = req.body.caption
  // const imageName = generateFileName()

  // const fileBuffer = await sharp(file.buffer)
  //   .resize({ height: 1920, width: 1080, fit: "contain" })
  //   .toBuffer() //can delete this later

  // await uploadFile(fileBuffer, imageName, file.mimetype).then( (i) => {
  //   console.log("Upload image done! ",imageName);
  //   console.log("Upload image done! ImageUrl: https://testing-bucket-clt.s3.us-east-1.amazonaws.com/"+imageName);
  //   res.send({'location': "https://testing-bucket-clt.s3.us-east-1.amazonaws.com/"+ imageName})
  // })
  
})

app.delete("/api/posts/:id", async (req, res) => {
  const id = req.params.id
  const post = await prisma.posts.findUnique({where: {id}}) 

  await deleteFile(post.imageName)

  await prisma.posts.delete({where: {id: post.id}})
  res.send(post)
})

// Rich-text-editor stuffs
app.get("/testing", async (req, res) => {
  const notes = await prisma.notes.findMany()
  res.send(notes)
})

app.post('/api/newpost', async (req, res) => {
  
  const post = await prisma.notes.create({
    data: {
      richText: req.body.richText 
    }
  })
  res.status(201).send(post)
})

app.post('/api/subchapter', async (req, res) => {
  
  const subchapter = await prisma.subchapter.create({
    data: {
      richText: req.body.richText 
    }
  })
  res.status(201).send(subchapter)
})

app.listen(8080, () => console.log("listening on port 8080"))