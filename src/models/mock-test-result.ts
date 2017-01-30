

export class MockTestResult {
    
    questionCountA: number;
    correntAnswersA: number;
    passCountA: number;

    questionCountB: number;
    correntAnswersB: number;
    passCountB: number;

    questionCountC: number;
    correntAnswersC: number;
    passCountC: number;

    testDate: Date;
    
    constructor(questionCountA: number,
                correntAnswersA: number,
                passCountA: number,

                questionCountB: number,
                correntAnswersB: number,
                passCountB: number,

                questionCountC: number,
                correntAnswersC: number,
                passCountC: number,

                testDate: Date = null) {
        
        this.questionCountA = questionCountA;
        this.correntAnswersA = correntAnswersA;
        this.passCountA = passCountA;

        this.questionCountB = questionCountB;
        this.correntAnswersB = correntAnswersB;
        this.passCountB = passCountB;
        
        this.questionCountC = questionCountC;
        this.correntAnswersC = correntAnswersC;
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
         return this.sectionAPassed() && this.sectionBPassed() && this.sectionCPassed();
     }
}