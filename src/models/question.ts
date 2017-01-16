import {Answer} from './answer';

export class Question {
    
    id: number;
    answerId: string;
    text: string[];
    answers: Answer[];
    images: string[];
    
    constructor(id: number, answerId: string, text: string[], answers: Answer[], images: string[]) {
        this.id = id;
        this.answerId = answerId;
        this.text = text;
        this.answers = answers;
        this.images = images;
    }
    
}