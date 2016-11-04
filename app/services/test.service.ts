import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

// Models
import {Question} from '../models/question';
import {Answer} from '../models/answer';
import {AnsweredQuestion} from '../models/answered-question';
import {TestResult} from '../models/test-result';
import {MockTestResult} from '../models/mock-test-result';

@Injectable()
export class TestService {

    markTest(navigationKey: string, questions: Question[], answeredQuestions: AnsweredQuestion[]): TestResult  {
    
        let result = new TestResult(navigationKey, 0, 0);

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

        result.correctAnswers = correctAnswerCount;
        result.totalQuestions = questions.length;

        return result;
    }

    markTestMock(questionsA: Question[], answeredQuestionsA: AnsweredQuestion[],
                    questionsB: Question[], answeredQuestionsB: AnsweredQuestion[],
                    questionsC: Question[], answeredQuestionsC: AnsweredQuestion[]): MockTestResult  {
    
        let resultA = this.markTest('mocktestA', questionsA, answeredQuestionsA);
        let resultB = this.markTest('mocktestB', questionsB, answeredQuestionsB);
        let resultC = this.markTest('mocktestC', questionsC, answeredQuestionsC);

        return new MockTestResult(resultA.totalQuestions,
                                    resultA.correctAnswers,
                                    7,
                                    resultB.totalQuestions,
                                    resultB.correctAnswers,
                                    23,
                                    resultC.totalQuestions,
                                    resultC.correctAnswers,
                                    24);

    }
}