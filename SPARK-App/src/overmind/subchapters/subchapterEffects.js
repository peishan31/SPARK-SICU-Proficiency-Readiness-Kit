import axios from 'axios'

export const getAllSubchaptersWithChapterId = async (chapterId, userId) => {
    const API_URL = `http://localhost:8080/user/${userId}/bookmarks/chapters/${chapterId}`
    try {
        const response = await axios.get(API_URL)
        if (response.status === 200) {
            const foundSubchapters = response.data[1].subchapters
            return foundSubchapters
        }
    } catch (err) {
        console.log("HERE ERROR: ", err)
        if (err.response.status === 400) {
            alert("Wrong username or password entered")

        }
        if (err.response.status === 500) {
            alert("server error")
        }
        throw err
    }
}
