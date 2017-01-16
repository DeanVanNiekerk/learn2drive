
import { inject } from '@angular/core/testing';

import { TestService } from './test.service';

// Models
import { Question } from '../models/question';
import { Answer } from '../models/answer';
import { AnsweredQuestion } from '../models/answered-question';

let testService: TestService = null;

describe('Test Service', () => {

    beforeEach(() => {
        testService = new TestService();
    });

    it('mark: no questions, no answers - 0%', () => {

            // Given
            let questions: Question[] = [];
            let answeredQuestions: AnsweredQuestion[] = [];
            let navigationKey: string = 'location.x';

            // When
            let result = testService.markTest(navigationKey, questions, answeredQuestions);

            // Then
            expect(result.navigationKey).toBe(navigationKey);
            expect(result.resultPercent()).toBe(0);
        }
    );


    it('mark: 1 question, no answers - 0%', () => {

            // Given
            let a1 = new Answer('A', '');
            let q1 = new Question(1, 'A', [], [a1], []);

            let questions: Question[] = [q1];

            let answeredQuestions: AnsweredQuestion[] = [];

            // When
            let result = testService.markTest('', questions, answeredQuestions);

            // Then
            expect(result.resultPercent()).toBe(0);
        }
    );

    it('mark: 2 questions, 1 correct answer - 50%', () => {

            // Given

            // Question 1
            let a1 = new Answer('A', '');
            let a2 = new Answer('B', '');
            let q1 = new Question(1, 'A', [], [a1, a2], []);

            // Question 2
            let a3 = new Answer('A', '');
            let a4 = new Answer('B', '');
            let q2 = new Question(2, 'A', [], [a3, a4], []);

            let questions: Question[] = [q1, q2];

            // Answered Question 1
            let aq1 = new AnsweredQuestion(q1.id, a1.id);
            let answeredQuestions: AnsweredQuestion[] = [aq1];

            // When
            let result = testService.markTest('', questions, answeredQuestions);

            // Then
            expect(result.resultPercent()).toBe(50);
        }
    );

    it('mark: 3 questions, 1 correct answer, 2 incorrect - 33%', () => {

            // Given

            // Question 1
            let a1 = new Answer('A', '');
            let a2 = new Answer('B', '');
            let q1 = new Question(1, 'A', [], [a1, a2], []);

            // Question 2
            let a3 = new Answer('A', '');
            let a4 = new Answer('B', '');
            let q2 = new Question(2, 'A', [], [a3, a4], []);

            // Question 3
            let a5 = new Answer('A', '');
            let a6 = new Answer('B', '');
            let q3 = new Question(2, 'B', [], [a5, a6], []);

            let questions: Question[] = [q1, q2, q3];

            // Answered Question 1 (incorrect)
            let aq1 = new AnsweredQuestion(q1.id, a2.id);

            // Answered Question 2 (CORRECT)
            let aq2 = new AnsweredQuestion(q2.id, a3.id);

            // Answered Question 3 (incorrect)
            let aq3 = new AnsweredQuestion(q3.id, a5.id);

            let answeredQuestions: AnsweredQuestion[] = [aq1, aq2, aq3];

            // When
            let result = testService.markTest('', questions, answeredQuestions);

            // Then
            expect(result.resultPercent()).toBe(33);
        }
    );



});
