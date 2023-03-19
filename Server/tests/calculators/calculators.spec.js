const axios = require('axios')

const calculateSimplifiedPESI = async (data) => {
    const response = await axios.post(`http://localhost:8080/calculator/simplified-pesi/`, data);
    return response;
};

const calculateRoxIndex = async (data) => {
    const response = await axios.post(`http://localhost:8080/calculator/rox-index/`, data);
    return response;
};
describe("Testing Calculate Simplified PESI Score by simplified pesi route", () => {
    it ("should return result as low risk with 0 points", async () => {
        const expectedResult = {
            "pointAllocated": 0,
            "result": {
                "riskGroup": "Low",
                "interpretation": "1.1% risk of death, with 1.5% having recurrent thromboembolism or non-fatal bleeding"
            }
        };
        const res = await calculateSimplifiedPESI(
            {
                "age": "≤80",
                "cancerHistory": "No",
                "chronicCardiopulmonaryHistory": "No",
                "heartrate": "<110",
                "systolicBp": "≥100",
                "oxygenSaturation": "≥90"
            });
        expect(res.data).toEqual(expectedResult);
    })

    it ("should return result as high risk with 6 points", async () => {
        const expectedResult = {
            "pointAllocated": 6,
            "result": {
                "riskGroup": "High",
                "interpretation": "8.9% risk of death"
            }
        };
        const res = await calculateSimplifiedPESI(
            {
                "age": ">80",
                "cancerHistory": "Yes",
                "chronicCardiopulmonaryHistory": "Yes",
                "heartrate": "≥110",
                "systolicBp": "<100",
                "oxygenSaturation": "<90"
            });
        expect(res.data).toEqual(expectedResult);
    })
})

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
