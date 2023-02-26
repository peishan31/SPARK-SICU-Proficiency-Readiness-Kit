const axios = require("axios")

const CHAPTER_ID = "63ea35d26c0ef100ca017647"
const SUBCHAPTER_ID = "63f8566d984d16ee2523c3e7"

const getAllSubchaptersForChapter = async (chapterId) => {
    const response = await axios.get(`http://localhost:8080/chapters/${chapterId}/subchapters/`);
    return response.status;
}

const getSubchapterContent = async (chapterId, subchapterId) => {
    const response = await axios.get(`http://localhost:8080/chapters/${chapterId}/subchapters/${subchapterId}`);
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