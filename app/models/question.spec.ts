import { describe, expect, it } from '@angular/core/testing';
import {Question} from './question';
import {Answer} from './answer';



describe('Question Model', () => {


    it('Instantiate', () => {

        // Given
        let id = 1;
        let answerId = 'A'
        let text = 'this is a question?'
        let answer = new Answer('1', 'Answer1');

        // When
        let question = new Question(id, answerId, [text], [answer]);

        // Then
        expect(question.id).toBe(id);
        expect(question.answerId).toBe(answerId);
        expect(question.text[0]).toBe(text);
        expect(question.answers[0].id).toBe('1');

    });

});