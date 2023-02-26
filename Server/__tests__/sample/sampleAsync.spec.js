const axios = require('axios')

const fetchData = async (id) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return response.data;
};

describe("Testing async get function", () => {
    it ("should return data for id 1", async () => {
        const expectedResult = {
            userId: 1,
            id: 1,
            title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        }
        const data = await fetchData(1);
        expect(data).toEqual(expectedResult);
    })
    
    it ("should return data for user id 2", async () => {
        const expectedResult = {
            userId: 1,
            id: 2,
            title: "qui est esse",
            body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
        }
        const data = await fetchData(2);
        expect(data).toEqual(expectedResult);
    })
})


// setting up and tearing down
let animals = [];

// in cases where you need to do some preparation before ALL tests, you can use beforeAll
beforeAll(() => {
    console.log("before all");
    animals = ["dog", "cat", "bird"];
})

describe("animals array", () => {
    // in cases where you need to do some preparation before EACH test, you can use beforeEach
    beforeEach(() => {
        console.log("before each");
        animals = ["dog", "cat", "bird"];
    })

    it ("Should add animals to end of array", () => {
        animals.push("fish");
        expect(animals).toContain("fish");
    })

    it ("Should have initial length of 3", () => {
        expect(animals.length).toBe(3);
    })
})


afterAll(() => {
    console.log("after all");
    animals = ["dog", "cat", "bird"];
})