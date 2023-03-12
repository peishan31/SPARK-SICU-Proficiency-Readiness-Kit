import axios from 'axios'
export const loginUser = async (inputObject) => {
    const API_URL = `http://localhost:8080/user/login`
    try {
        const response = await axios.post(API_URL, {
            email: inputObject.email,
            password: inputObject.password
        })
        
        if (response.status === 200) {
            console.log("HERE: ", response.data)
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
