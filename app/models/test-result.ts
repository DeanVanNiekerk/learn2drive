

export class TestResult {

    navigationKey: string;

    correctAnswers: number;
    totalQuestions: number;

    testDate: Date;
    
    constructor(navigationKey: string, totalQuestions: number = 0, correctAnswers: number = 0, testDate: Date = null) {
        this.navigationKey = navigationKey;
        this.totalQuestions = totalQuestions;
        this.correctAnswers = correctAnswers;
        this.testDate = testDate;
     }

     resultPercent(): number {
         if(this.totalQuestions === 0)
            return 0;
         return Math.floor(this.correctAnswers / this.totalQuestions * 100);
     }
}