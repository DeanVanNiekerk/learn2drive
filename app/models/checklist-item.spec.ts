

import { describe, expect, it } from '@angular/core/testing';
import {ChecklistItem} from './checklist-item';



describe('Answer Model', () => {


    it('Instantiate', () => {

        // Given
        let id = 1;
        let key = 'gotId';
        let complete = true;

        // When
        let answer = new ChecklistItem(id, key, complete);

        // Then
        expect(answer.id).toBe(id);
        expect(answer.key).toBe(key);
        expect(answer.complete).toBe(complete);

    });

});