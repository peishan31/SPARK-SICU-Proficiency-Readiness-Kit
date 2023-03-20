const axios = require('axios')

const calculateSimplifiedPESI = async (data) => {
    const response = await axios.post(`http://localhost:8080/calculator/simplified-pesi/`, data);
    return response;
};

const calculateCandidaScore = async (data) => {
    const response = await axios.post(`http://localhost:8080/calculator/candida-score/`, data);
    return response;
};

const calculateParklandBurn = async (data) => {
    const response = await axios.post(`http://localhost:8080/calculator/parkland-formula`, data);
    return response;
};

const calculateSofaScore = async (data) => {
    const response = await axios.post(`http://localhost:8080/calculator/sofa-score/`, data);
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

describe("Testing Calculate Candida Score by candida score route", () => {
    it ("should return result as 2 points", async () => {
        const expectedResult = {
            "pointAllocated": 2,
            "result": {
                "interpretation": "2.3% Risk of invasive candidiasis without treatment"
            }
        };
        const res = await calculateCandidaScore(
            {
                "severeSepsis": 0,
                "totalParenteralNutrition": 1,
                "initialSurgery": 0,
                "multifocalCandidaColonization": 1
            });
        expect(res.data).toEqual(expectedResult);
    })

    it ("should return result as 3 points", async () => {
        const expectedResult = {
            "pointAllocated": 3,
            "result": {
                "interpretation": "8.5% Risk of invasive candidiasis without treatment"
            }
        };
        const res = await calculateCandidaScore(
            {
                "severeSepsis": 0,
                "totalParenteralNutrition": 1,
                "initialSurgery": 1,
                "multifocalCandidaColonization": 1
            });
        expect(res.data).toEqual(expectedResult);
    })

    it ("should return result as 4 points", async () => {
        const expectedResult = {
            "pointAllocated": 4,
            "result": {
                "interpretation": "16.8% Risk of invasive candidiasis without treatment"
            }
        };
        const res = await calculateCandidaScore(
            {
                "severeSepsis": 2,
                "totalParenteralNutrition": 0,
                "initialSurgery": 1,
                "multifocalCandidaColonization": 1
            });
        expect(res.data).toEqual(expectedResult);
    })

    it ("should return result as 5 points", async () => {
        const expectedResult = {
            "pointAllocated": 5,
            "result": {
                "interpretation": "23.6% Risk of invasive candidiasis without treatment"
            }
        };
        const res = await calculateCandidaScore(
            {
                "severeSepsis": 2,
                "totalParenteralNutrition": 1,
                "initialSurgery": 1,
                "multifocalCandidaColonization": 1
            });
        expect(res.data).toEqual(expectedResult);
    })
})

describe("Testing Calculate Parkland Burn Score by parkland formula route", () => {
    it ("should return result as totalFluid = 3.7 and halfFluid = 1.8", async () => {
        const expectedResult = {
            "totalFluid": 3.7,
            "halfFluid": 1.8,
            "result": {
                "interpretation": "3.7L Fluid requirements for the 1st 24 hours from time of burn; 1.8L Fluid requirements for the 1st 8 hours (1/2 of Total) from time of burn"
            }
        };
        const res = await calculateParklandBurn(
            {
                "weight": 54,
                "bodyBurnPercentage": 17
            });
        expect(res.data).toEqual(expectedResult);
    })
})

describe("Testing Calculate SOFA Score by sofa score route", () => {
    it ("should return result as SOFA Score in range 0-1", async () => {
        const expectedResult = {
            "pointAllocated": 1,
            "result": {
                "sofaScore": "0-1",
                "morality": "0.0%"
            }
        };
        const res = await calculateSofaScore(
            {
                "PaO": 90,
                "FiO": 30,
                "onMechanicalVentilation": "No",
                "platelets": "≥150",
                "GCS": "15",
                "bilirubin": "<1.2 (<20))",
                "meanArteriaPressureOrAdministrationOfVasoactiveAgents": "No hypotension",
                "creatinine": "<1.2 (<110)"
            });
        expect(res.data).toEqual(expectedResult);
    })

    it ("should return result as SOFA Score in range 2-3", async () => {
        const expectedResult = {
            "pointAllocated": 2,
            "result": {
                "sofaScore": "2-3",
                "morality": "6.4%"
            }
        };
        const res = await calculateSofaScore(
            {
                "PaO": 56.7,
                "FiO": 60,
                "onMechanicalVentilation": "No",
                "platelets": "≥150",
                "GCS": "15",
                "bilirubin": "<1.2 (<20))",
                "meanArteriaPressureOrAdministrationOfVasoactiveAgents": "No hypotension",
                "creatinine": "<1.2 (<110)"
            });
        expect(res.data).toEqual(expectedResult);
    })

    it ("should return result as SOFA Score in range 4-5", async () => {
        const expectedResult = {
            "pointAllocated": 4,
            "result": {
                "sofaScore": "5-5",
                "morality": "20.2%"
            }
        };
        const res = await calculateSofaScore(
            {
                "PaO": 56.7,
                "FiO": 60,
                "onMechanicalVentilation": "No",
                "platelets": "≥150",
                "GCS": "15",
                "bilirubin": "<1.2 (<20))",
                "meanArteriaPressureOrAdministrationOfVasoactiveAgents": "DOPamine ≤5 or DOBUTamine (any dose)",
                "creatinine": "<1.2 (<110)"
            });
        expect(res.data).toEqual(expectedResult);
    })
        it ("should return result as SOFA Score in range 6-7", async () => {
            const expectedResult = {
                "pointAllocated": 6,
                "result": {
                    "sofaScore": "6-7",
                    "morality": "21.5%"
                }
            };
            const res = await calculateSofaScore(
                {
                    "PaO": 56.7,
                    "FiO": 60,
                    "onMechanicalVentilation": "No",
                    "platelets": "50-99",
                    "GCS": "15",
                    "bilirubin": "<1.2 (<20))",
                    "meanArteriaPressureOrAdministrationOfVasoactiveAgents": "DOPamine ≤5 or DOBUTamine (any dose)",
                    "creatinine": "<1.2 (<110)"
                });
            expect(res.data).toEqual(expectedResult);
        })

        it ("should return result as SOFA Score in range 8-9", async () => {
            const expectedResult = {
                "pointAllocated": 8,
                "result": {
                    "sofaScore": "8-9",
                    "morality": "33.3%"
                }
            };
            const res = await calculateSofaScore(
                {
                    "PaO": 56.7,
                    "FiO": 60,
                    "onMechanicalVentilation": "No",
                    "platelets": "50-99",
                    "GCS": "10-12",
                    "bilirubin": "<1.2 (<20))",
                    "meanArteriaPressureOrAdministrationOfVasoactiveAgents": "DOPamine ≤5 or DOBUTamine (any dose)",
                    "creatinine": "<1.2 (<110)"
                });
            expect(res.data).toEqual(expectedResult);
        })

        it ("should return result as SOFA Score in range 10-11", async () => {
            const expectedResult = {
                "pointAllocated": 11,
                "result": {
                    "sofaScore": "10-11",
                    "morality": "50.0%"
                }
            };
            const res = await calculateSofaScore(
                {
                    "PaO": 82.71,
                    "FiO": 50,
                    "onMechanicalVentilation": "Yes",
                    "platelets": "50-99",
                    "GCS": "10-12",
                    "bilirubin": "2.0–5.9 (33-101)",
                    "meanArteriaPressureOrAdministrationOfVasoactiveAgents": "DOPamine ≤5 or DOBUTamine (any dose)",
                    "creatinine": "<1.2 (<110)"
                });
            expect(res.data).toEqual(expectedResult);
        })

        it ("should return result as SOFA Score in range >=12", async () => {
            const expectedResult = {
                "pointAllocated": 12,
                "result": {
                    "sofaScore": "≥12",
                    "morality": "≥95.2%"
                }
            };
            const res = await calculateSofaScore(
                {
                    "PaO": 56.7,
                    "FiO": 60,
                    "onMechanicalVentilation": "No",
                    "platelets": "50-99",
                    "GCS": "10-12",
                    "bilirubin": "2.0–5.9 (33-101)",
                    "meanArteriaPressureOrAdministrationOfVasoactiveAgents": "DOPamine >15, EPINEPHrine >0.1, or norEPINEPHrine >0.1",
                    "creatinine": "<1.2 (<110)"
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
