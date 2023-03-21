export const loadAllSubchaptersWithUserId = async ( { state, effects }, idObject ) => {
    console.log("USERID", idObject.userId)
    console.log("CHAPTERID", idObject.chapterId)
    try {
        state.subchapters.subchapterlist = await effects.subchapters.getAllSubchaptersWithChapterId(idObject.chapterId, idObject.userId);
        console.log(state.subchapters.subchapterlist)
    } catch (err) {
        console.log(err);
    }
}

export const setSubchapterSearchInput = ( { state }, searchInput ) => {
    state.subchapters.subchapterSearchInput = searchInput;
}

export const clearSubchapterState = ( { state } ) => {
    state.subchapters.subchapterlist = [];
    state.subchapters.subchapterSearchInput = "";
    state.subchapters.selectedSubchapter = null;
}