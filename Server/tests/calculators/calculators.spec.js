const axios = require('axios')

const calculateRoxIndex = async (data) => {
    const response = await axios.post(`http://localhost:8080/calculator/rox-index/`, data);
    return response;
};

describe("Testing Calculate ROX Index by rox index route", () => {
    it ("should return result as lower risk for intubation", async () => {
        const expectedResult = {
            "pointAllocated": "5.00",
            "result": {
                "interpretation": "Low risk of progressing to intubation"
            }
        };
        const res = await calculateRoxIndex(
            {
                "SpO": 60,
                "FiO": 40,
                "respiratoryRate": 30
            });
        expect(res.data).toEqual(expectedResult);
    })

    it ("should return result as risk of HFNC failure is high", async () => {
        const expectedResult = {
            "pointAllocated": "2.67",
            "result": {
                "interpretation": "Risk of HFNC failure is high; intubation should be considered"
            }
        };
        const res = await calculateRoxIndex({
            "SpO": 40,
            "FiO": 50,
            "respiratoryRate": 30
        });
        expect(res.data).toEqual(expectedResult);
    })

    it ("should return result as patient should be reassessed within 2 hours", async () => {
        const expectedResult = {
            "pointAllocated": "4.00",
            "result": {
                "interpretation": "Patient should be reassessed within 2 hours and the index re-calculated"
            }
        };
        const res = await calculateRoxIndex(
            {
                "SpO": 80,
                "FiO": 50,
                "respiratoryRate": 40
            });
        expect(res.data).toEqual(expectedResult);
    })
    
})
