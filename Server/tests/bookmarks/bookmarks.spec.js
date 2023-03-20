describe("Testing objects ", () => {
    it("object assignment", () => {
        const data = { one: 1 };
        data["two"] = 2;
        expect(data).toEqual({ one: 1, two: 2 });
    })
})


// const axios = require('axios')

// const NO_BOOKMARKS_USER_ID = "63e87aed80b6c0bcb29d15d4"
// const WITH_BOOKMARKS_USER_ID = "63fb1b9e40628116ea970e57"
// const CHAPTER_ID = "6415b83df79d4564b394fbea"
// const API_URL = "https://spark-sicu-proficiency-readiness-kit-backend.vercel.app"

// const getBookmarks = async (userId) => {
//     const response = await axios.get(API_URL + `/user/${userId}/bookmarks`);
//     return response;
// };

// const getAllSubchaptersForAChapter = async (userId, chapterId) => {
//     const response = await axios.get(API_URL + `/user/${userId}/bookmarks/chapters/${chapterId}`);
//     return response;
// };

// const addBookmarkForASubchapter = async (userId, data) => {
//     const response = await axios.put(API_URL + `/user/${userId}/bookmarks/`, data);
//     return response;
// };

// const deleteBookmarkForASubchapter = async (userId, bookmarkId) => {
//     const response = await axios.delete(API_URL + `/user/${userId}/bookmarks/${bookmarkId}`);
//     return response;
// };

// describe("Testing Get all bookmarked subchapters for a user by userId route", () => {
//     it("should return empty data for user", async () => {
//         const expectedResult = [];
//         const res = await getBookmarks(NO_BOOKMARKS_USER_ID);
//         expect(res.data).toEqual(expectedResult);
//         // expect(res.status).toEqual(200)
//     })

//     it("should return all bookmark data for user", async () => {
//         const res = await getBookmarks(WITH_BOOKMARKS_USER_ID);
//         expect(res.status).toEqual(200);
//     })
// })

// describe("Testing Get all subchapters of a specified chapter for a user by userId route", () => {
//     it("should return all the subchapters data for user", async () => {
//         const res = await getAllSubchaptersForAChapter(WITH_BOOKMARKS_USER_ID, CHAPTER_ID);
//         expect(res.status).toEqual(200);
//     })
// })

// describe("Testing Add and Remove Bookmark to User By UserId route", () => {
//     var addedBookmarkId = "";

//     it("should return the bookmark id for the new bookmark", async () => {
//         const data = {
//             "subchapterId": "63f8566d984d16ee2523c3e7",
//             "chapterId": "63ea35d26c0ef100ca017647"
//         }
//         const res = await addBookmarkForASubchapter(WITH_BOOKMARKS_USER_ID, data);
//         expect(res.status).toEqual(200);
//         addedBookmarkId = res.data.bookmarkId;
//     })

//     it("should remove bookmark for user", async () => {
//         const res = await deleteBookmarkForASubchapter(WITH_BOOKMARKS_USER_ID, addedBookmarkId);
//         expect(res.status).toEqual(200);
//     })

//     afterAll(() => {
//         console.log(JSON.stringify(addedBookmarkId));
//     });

// })

// // describe("Testing Delete Bookmark by BookmarkId and UserId route", () => {
// //     it ("should return data for user id 63fb1b9e40628116ea970e57", async () => {

// //     const res = await deleteBookmarkForASubchapter(ONE_BOOKMARKS_USER_ID, addedBookmarkId);
// //     expect(res.status).toEqual(200);
// //     })
// // })