'use strict';

import {Question} from './question';
import {Answer} from './answer';



describe('Question Model', () => {


    it('Instantiate', () => {

        // Given
        let id = 1;
        let answerId = 'A';
        let text = 'this is a question?';
        let answer = new Answer('1', 'Answer1');
        let image = 'path/to/image.png';

        // When
        let question = new Question(id, answerId, [text], [answer], [image]);

        // Then
        expect(question.id).toBe(id);
        expect(question.answerId).toBe(answerId);
        expect(question.text[0]).toBe(text);
        expect(question.answers[0].id).toBe(answer.id);
        expect(question.images[0]).toBe(image);

    });

});