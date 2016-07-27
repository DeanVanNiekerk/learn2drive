

import { describe, expect, it } from '@angular/core/testing';
import {Answer} from './answer';



describe('Answer Model', () => {


    it('Instantiate', () => {

        // Given
        let id = '1';
        let text = 'this is an answer';

        // When
        let answer = new Answer(id, text);

        // Then
        expect(answer.id).toBe(id);
        expect(answer.text).toBe(text);

    });

});