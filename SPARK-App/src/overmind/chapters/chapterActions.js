// export const onInitializeOvermind = async ({ state, actions, effects }, overmind) => {
//     const chapters = await effects.chapters.getAllChapters();
//     state.chapters = chapters;
// }


export const loadChapters = async ({ state, effects }) => {
    try {
        state.chapters.chapterlist = await effects.chapters.getAllChapters();
        console.log(state.chapters.chapterlist)
    } catch (err) {
        console.log(err);
    }
}
