import axios from 'axios';

export const getAllChapters = async () => {
    const API_URL = `http://localhost:8080/chapters`
    try {
        const response = await axios.get(API_URL)
        if (response.status === 200) {
            const foundChapters = response.data
            return foundChapters
        }
    } catch (err) {
        console.log("HERE ERROR: ", err)
        if (err.response.status === 400) {
            alert("Request Error")

        }
        if (err.response.status === 500) {
            alert("Server Error")
        }
        throw err
    }
};