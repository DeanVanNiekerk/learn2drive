

export class TestResult {
    
    resultPercent: number;
    navigationKey: string;
    
    constructor(navigationKey: string, resultPercent: number = 0) {
        this.navigationKey = navigationKey;
        this.resultPercent = resultPercent;
     }
}