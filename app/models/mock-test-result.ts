

export class MockTestResult {
    
    questionCountA: number;
    questionCountB: number;
    questionCountC: number;

    correntAnswersA: number;
    correntAnswersB: number;
    correntAnswersC: number;

    passCountA: number;
    passCountB: number;
    passCountC: number;

    testDate: Date;
    
    constructor(questionCountA: number,
                questionCountB: number,
                questionCountC: number,
                correntAnswersA: number,
                correntAnswersB: number,
                correntAnswersC: number,
                passCountA: number,
                passCountB: number,
                passCountC: number, 
                testDate: Date = null) {
        this.questionCountA = questionCountA;
        this.questionCountB = questionCountB;
        this.questionCountC = questionCountC;
        this.correntAnswersA = correntAnswersA;
        this.correntAnswersB = correntAnswersB;
        this.correntAnswersC = correntAnswersC;
        this.passCountA = passCountA;
        this.passCountB = passCountB;
        this.passCountC = passCountC;
        this.testDate = testDate;
     }

     sectionAPassed(): boolean {
         return this.correntAnswersA >= this.passCountA;
     }

     sectionBPassed(): boolean {
         return this.correntAnswersB >= this.passCountB;
     }

     sectionCPassed(): boolean {
         return this.correntAnswersC >= this.passCountC;
     }

     passed(): boolean {
         return this.sectionAPassed() && this.sectionBPassed() && this.sectionCPassed()
     }
}