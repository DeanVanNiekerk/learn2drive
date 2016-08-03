

export class AnsweredQuestion {
    
    questionId: number;
    answerId: string;
    
    constructor(questionId: number, answerId: string) {
        this.questionId = questionId;
        this.answerId = answerId;
    }
    
}