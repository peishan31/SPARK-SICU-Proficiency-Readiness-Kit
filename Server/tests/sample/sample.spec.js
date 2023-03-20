// function that you want to test
const add = (a, b) => a + b;

// describe groups functions together
describe("testing add function", () => {

    it("3 + 4 = 7", () => {
        const result = add(3, 4);
        expect(result).toBe(7);
    });

    it("5 + 6 = 11", () => {
        const result = add(5, 6);
        expect(result).toBe(11);
    });

    it("5 + 12 = 17", () => {
        const result = add(12, 5);
        expect(result).toBe(17);
    });

})


describe("Testing objects ", () => {
    it("object assignment", () => {
        const data = { one: 1 };
        data["two"] = 2;
        expect(data).toEqual({ one: 1, two: 2 });
    })
})

describe("Testing arrays", () => {
    it("array assignment", () => {
        const data = [1, 2, 3];
        data.push(4);
        expect(data).toContain(4);
    })
})

// function that throws an Error 
function compileAndroidCode() {
    throw new Error('you are using the wrong JDK');
}

describe("Testing exceptions", () => {
    it("compiling android goes as expected", () => {
        expect(compileAndroidCode).toThrow();
        expect(compileAndroidCode).toThrow(Error);

        // You can also use the exact error message or a regexp
        expect(compileAndroidCode).toThrow('you are using the wrong JDK');
        expect(compileAndroidCode).toThrow(/JDK/);
    })
})