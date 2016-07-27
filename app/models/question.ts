import {Answer} from './answer';

export class Question {
    
    id: number;
    answerId: string;
    text: string[];
    answers: Answer[];
    
    constructor(id: number, answerId: string, text: string[], answers: Answer[]) {
        this.id = id;
        this.answerId = answerId;
        this.text = text;
        this.answers = answers;
    }
    
}