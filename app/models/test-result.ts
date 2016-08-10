

export class TestResult {
    
    resultPercent: number;
    navigationKey: string;
    testDate: Date;
    
    constructor(navigationKey: string, resultPercent: number = 0, testDate: Date = null) {
        this.navigationKey = navigationKey;
        this.resultPercent = resultPercent;
        this.testDate = testDate;
     }
}