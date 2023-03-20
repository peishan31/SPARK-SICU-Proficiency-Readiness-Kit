<<<<<<< HEAD
export const loginUser = async ({ state, effects }, inputObject) => {
    // console.log("inputEmail", inputObject.email)
    // console.log("inputPassword", inputObject.password)
    try {
        const currentUser = await effects.user.loginUser(inputObject)
        state.user.currentUser = currentUser
        sessionStorage.setItem("currentUser", JSON.stringify(currentUser))
=======
// export const loginUser = async ({ state, effects }, inputObject) => {
//     // console.log("inputEmail", inputObject.email)
//     // console.log("inputPassword", inputObject.password)
//     try {
//         state.user.currentUser = await effects.user.loginUser(inputObject)
>>>>>>> main

//     } catch (err) {
//         console.log(err);
//     }
// }

export const updateUser = async ({ state }, userObject) => {
    state.user.currentUser = userObject;
}

<<<<<<< HEAD
export const logoutUser = async ({ state }) => {
    state.user.currentUser = null
    sessionStorage.removeItem("currentUser")
}

export const logoutUser = async ({ state }) => {
    state.user.currentUser = null
    sessionStorage.removeItem("currentUser")
}



=======
export const signOutUser = async ({ state }) => {
    state.user.currentUser = null;
}
>>>>>>> main
