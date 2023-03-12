
export const loadChapters = async ({ state, effects }) => {
    try {
        state.chapters = await effects.chapters.getAllChapters();
        console.log("state.chapters", state.chapters)
    } catch (err) {
        console.log(err);
    }
}