const axios = require("axios")
const PORT = 8080 || process.env.PORT;
// const API_URL = "https://spark-sicu-proficiency-readiness-kit-backend.vercel.app"
const API_URL = "http://localhost:8080"
const getAllChapters = async () => {
    const response = await axios.get(API_URL + "/chapters/");
    return response.status;
}

const getChaptersHealth = async () => {
    const response = await axios.get(API_URL + "/chapters/health");
    return response.status;
}


describe("Testing getAllChapters route", () => {
    it("should return all chapters", async () => {
        const status = await getAllChapters();
        expect(status).toEqual(200)
    })

    it("should return 200 for health check", async () => {
        const status = await getChaptersHealth();
        expect(status).toEqual(200)
    })
})