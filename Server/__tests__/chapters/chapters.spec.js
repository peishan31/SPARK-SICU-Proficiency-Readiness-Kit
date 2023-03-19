const axios = require("axios")
const PORT = 8080 || process.env.PORT;

const getAllChapters = async() => {
    const response = await axios.get("http://localhost:8080/chapters/");
    return response.status;
}


describe("Testing getAllChapters route", () => {
    it ("should return all chapters", async () => {
        const status = await getAllChapters();
        expect(status).toEqual(200)
    })
})