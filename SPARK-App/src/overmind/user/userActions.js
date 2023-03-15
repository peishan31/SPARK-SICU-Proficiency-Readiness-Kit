export const loginUser = async ({ state, effects }, inputObject) => {
    // console.log("inputEmail", inputObject.email)
    // console.log("inputPassword", inputObject.password)
    try {
        const currentUser = await effects.user.loginUser(inputObject)
        state.user.currentUser = currentUser
        sessionStorage.setItem("currentUser", JSON.stringify(currentUser))

    } catch (err) {
        console.log(err);
    }
}

export const logoutUser = async ({ state }) => {
    state.user.currentUser = null
    sessionStorage.removeItem("currentUser")
}


