import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

// Models
import {Question} from '../models/question';
import {Answer} from '../models/answer';
import {AnsweredQuestion} from '../models/answered-question';
import {TestResult} from '../models/test-result';

@Injectable()
export class TestService {

    markTest(navigationKey: string, questions: Question[], answeredQuestions: AnsweredQuestion[]): TestResult  {
    
        let result = new TestResult(navigationKey);

        if (questions.length === 0)
            return result;

        let correctAnswerCount = 0;

        questions.forEach(question => {

            let answer = answeredQuestions.find((aq) => {
                return aq.questionId === question.id;
            });

            if (answer && question.answerId === answer.answerId)
                correctAnswerCount++;
            
        });

        result.resultPercent = Math.floor(correctAnswerCount / questions.length * 100);

        return result;
    }
}