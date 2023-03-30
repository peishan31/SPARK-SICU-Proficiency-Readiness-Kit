import express from 'express';
import subchapterRouter from './subchapterRouter.js';
import Chapter from '../models/ChapterModel.js';
const chapterRouter = express.Router();

// @description: Get health status of chapter route
// @route GET chapters/health
// Working!
chapterRouter.get("/health", async (req, res) => {
    try {
        res.send("Chapter Route Healthy")
    } catch (error) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});


// @description: Get all chapters
// @route GET chapters/
// Working! 
chapterRouter.get("/", async (req, res) => {
    try {
        const chapters = await Chapter.find()
        res.status(200).json(chapters)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

// @description: Get health status of chapter route
// @route GET chapters/:chapterId
// Working!
chapterRouter.get('/:chapterId', async (req, res) => {
    try {
        const chapter = await Chapter.findById(req.params.chapterId)
        if (!chapter) {
            return res.status(404).json({ msg: 'Chapter not found' })
        }
        res.status(200).json(chapter)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

// @description: Create a chapter
// @route POST chapters/
// Working!
chapterRouter.post("/", async (req, res) => {
    try {
        const { title, description, chapterIcon, subchapters } = req.body;
        if (title.length === 0 || title == undefined || title == "" || 
            chapterIcon.length===0 || chapterIcon == undefined || chapterIcon == "") { 
                return res.status(404).json({ msg: 'Fields cannot be empty' })
        }
        const newChapter = new Chapter({
            title,
            // description,
            chapterIcon,
            // subchapters
        });
        const chapter = await newChapter.save();
        res.status(201).json(chapter);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @description: Update a chapter
// @route PUT chapters/
// Working!
chapterRouter.put("/:chapterId", async (req, res) => {
    console.log("edit chapter")
    try {
        const chapterId = req.params.chapterId;
        let { title, chapterIcon } = req.body;
        if (title.length === 0 || title == undefined || title == "" || 
            chapterIcon.length===0 || chapterIcon == undefined || chapterIcon == "") { 
                return res.status(404).json({ msg: 'Fields cannot be empty' })
        }

        const chapter = await Chapter.findByIdAndUpdate(
            { _id: chapterId },
            { $set: { title: title, chapterIcon: chapterIcon }},
            { new: true }
        );
        res.status(200).json(chapter);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
});

// @description: delete a chapter using chapterId
// @route DELETE chapters/:chapterId
// Working!
chapterRouter.delete('/:chapterId', async (req, res) => {
    try {
        const chapterId = req.params.chapterId;
        const chapters = await Chapter.findByIdAndDelete(chapterId)
        if (!chapters) {
            return res.status(404).json({ msg: 'Chapter not found' })
        }
        res.status(200).json(chapters)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

// link to subchapter route
chapterRouter.use("/:chapterId/subchapters", (req, res, next) => {
    req.chapterId = req.params.chapterId;
    next();
}, subchapterRouter);

export default chapterRouter;