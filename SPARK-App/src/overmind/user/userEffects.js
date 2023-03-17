import axios from 'axios'
const BASE_URL = import.meta.env.VITE_API_URL
const USER_ID = import.meta.env.VITE_USER_ID
export const loginUser = async (inputObject) => {
    const API_URL = BASE_URL + `/user/login`
    try {
        const response = await axios.post(API_URL, {
            email: inputObject.email,
            password: inputObject.password
        })
        
        if (response.status === 200) {
            const foundUser = response.data
            return foundUser
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
