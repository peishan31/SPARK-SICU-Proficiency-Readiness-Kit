import axios from 'axios'
const BASE_URL = import.meta.env.VITE_API_URL

export const getAllSubchaptersWithChapterId = async (chapterId, userId) => {
    const API_URL = BASE_URL + `/user/${userId}/bookmarks/chapters/${chapterId}`
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
            // alert("server error")
            window.location.href="/500"
        }
        throw err
    }
}
