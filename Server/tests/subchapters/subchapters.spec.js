const axios = require("axios")

const CHAPTER_ID = "6415b83df79d4564b394fbea"
const SUBCHAPTER_ID = "641713712206cdb94e8b307d"
const API_URL = "https://spark-sicu-proficiency-readiness-kit-backend.vercel.app"

const getAllSubchaptersForChapter = async (chapterId) => {
    const response = await axios.get(API_URL + `/chapters/${chapterId}/subchapters/`);
    return response.status;
}

const getSubchapterContent = async (chapterId, subchapterId) => {
    const response = await axios.get(API_URL + `/chapters/${chapterId}/subchapters/${subchapterId}`);
    return response.status;
}


describe("Testing getAllChapters route", () => {
    it("should return all subchapter of chapter with chapter ID", async () => {
        const status = await getAllSubchaptersForChapter(CHAPTER_ID);
        expect(status).toEqual(200)
    })
})

describe("Testing getSubchapterContent route", () => {
    it("should return subchapter content", async () => {
        const status = await getSubchapterContent(CHAPTER_ID, SUBCHAPTER_ID);
        expect(status).toEqual(200)
    })
})