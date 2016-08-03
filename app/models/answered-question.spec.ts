import { describe, expect, it } from '@angular/core/testing';
import {AnsweredQuestion} from './answered-question';



describe('AnsweredQuestion Model', () => {


    it('Instantiate', () => {

        // Given
        let questionId = 2;
        let answerId = 'C';

        // When
        let answeredQuestion = new AnsweredQuestion(questionId, answerId);

        // Then
        expect(answeredQuestion.questionId).toBe(questionId);
        expect(answeredQuestion.answerId).toBe(answerId);

    });

});