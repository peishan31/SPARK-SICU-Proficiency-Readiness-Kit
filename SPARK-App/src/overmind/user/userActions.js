export const loginUser = async ({ state, effects }, inputObject) => {
    console.log("inputEmail", inputObject.email)
    console.log("inputPassword", inputObject.password)
    try {
        console.log("Current user", state.user.currentUser)
        state.user.currentUser = await effects.user.loginUser(inputObject)

    } catch (err) {
        console.log(err);
    }
}

