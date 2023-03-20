const axios = require("axios")

const CHAPTER_ID = "6415b83df79d4564b394fbea"
const SUBCHAPTER_ID = "641713712206cdb94e8b307d"
//const API_URL = "https://spark-sicu-proficiency-readiness-kit-backend.vercel.app"
const API_URL = "http://localhost:8080"
const SUBCHAPTER_CONTENT = {
    "subchapterTitle": "Subchapter Id 2",
    "thumbnailPublicId": "",
    "thumbnail": "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
    "description": "Subchapter 2 description",
    "content": "<h1> This is html content in subchapter 2 for chapter 2 </h1>" 
}

const getAllSubchaptersForChapter = async (chapterId) => {
    const response = await axios.get(API_URL + `/chapters/${chapterId}/subchapters/`);
    return response.status;
}

const getSubchapterContent = async (chapterId, subchapterId) => {
    const response = await axios.get(API_URL + `/chapters/${chapterId}/subchapters/${subchapterId}`);
    return response.status;
}

const insertSubchapterContent = async (chapterId, content) => {
    const response = await axios.put(API_URL + `/chapters/${chapterId}/subchapters/`, content);
    return response;
}

const deleteSubchapterContent = async (chapterId, subchapterId) => {
    const response = await axios.delete(API_URL + `/chapters/${chapterId}/subchapters/${subchapterId}`);
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

describe("Testing add new subchapter and delete subchapter content route", () => {

    let newSubchapterId = ""
    // Increase the timeout for this test case to 30 seconds
    jest.setTimeout(30000)

    it("should return a status of 200 indicating that record has been successfully inserted", async () => {
        const res = await insertSubchapterContent(CHAPTER_ID, SUBCHAPTER_CONTENT);
        expect(res.status).toEqual(200)
        newSubchapterId = res.data
    })

    it("should remove a subchapter content", async () => {
        const status = await deleteSubchapterContent(CHAPTER_ID, newSubchapterId);
        expect(status).toEqual(200)
    })
})