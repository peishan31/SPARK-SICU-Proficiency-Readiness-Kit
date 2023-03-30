const axios = require("axios")
const PORT = 8080 || process.env.PORT;
// const API_URL = "https://spark-sicu-proficiency-readiness-kit-backend.vercel.app"
const API_URL = "http://localhost:8080"

const getAllFlashcards = async () => {
    const response = await axios.get(API_URL + "/flashcards/");
    return response.status;
}

const getAFlashcardById = async (flashcardId) => {
    const response = await axios.get(API_URL + `/flashcards/${flashcardId}/`);
    return response.status;
};

const updateAFlashcardById = async (flashcardId, data) => {
    const response = await axios.put(API_URL + `/flashcards/${flashcardId}/`, data);
    return response.status;
};

const addAFlashcardById = async (data) => {
    const response = await axios.post(API_URL + `/flashcards/`, data);
    return response;
};

const removeAFlashcardById = async (flashcardId) => {
    const response = await axios.delete(API_URL + `/flashcards/${flashcardId}/`);
    return response.status;
};

describe("Testing getAllFlashcards route", () => {
    it("should return all flashcards", async () => {
        const status = await getAllFlashcards();
        expect(status).toEqual(200)
    })
})

describe("Testing getAFlashcardById route", () => {
    it("should return a flashcard", async () => {
        const status = await getAFlashcardById("641ded4acb1a1a5dcc500d95");
        expect(status).toEqual(200)
    })

    // it("should return an error: flashcard id not found", async () => {
    //     const status = await getAFlashcardById("641ded4acb1a1a5dcc500d94");
    //     expect(status).toEqual(404)
    // })
})

describe("Testing updateAFlashcardById route", () => {
    it("should return the updated flashcard", async () => {
        const data = {
            "question": "edited",
            "answer": "Prolonged MV\nUpper airway obstruction\nAccess to tracheobronchael secreations\nFaciliated HEad/neck surgery"
        }
        const status = await updateAFlashcardById("641df4e88aced2f587f7843a", data);
        expect(status).toEqual(200)
    })

    // it("should return error: update unsuccessful, flashcard id not found", async () => {
    //     const data = {
    //         "question": "edited",
    //         "answer": "Prolonged MV\nUpper airway obstruction\nAccess to tracheobronchael secreations\nFaciliated HEad/neck surgery"
    //     }
    //     const status = await updateAFlashcardById("641df4e88aced2f587f7843b", data);
    //     expect(status).toEqual(404)
    // })
})

describe("Testing Add and Remove Flashcard By addAFlashcardById and removeAFlashcardById route", () => {
    let addedFlashcardId = "";

    it("should return the flashcard details for the new flashcard", async () => {
        const data = {
            "question": "testAdd",
            "answer": "testAdd"
        }
        const res = await addAFlashcardById(data);
        expect(res.status).toEqual(201);
        addedFlashcardId = res.data._id;
    })

    it("should remove the flashcard", async () => {
        const res = await removeAFlashcardById(addedFlashcardId);
        expect(res).toEqual(200);
    })

    afterAll(() => {
        console.log(JSON.stringify(addedFlashcardId));
    });

})