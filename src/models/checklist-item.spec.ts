'use strict';

import {ChecklistItem} from './checklist-item';



describe('Checklist Item Model', () => {


    it('Instantiate', () => {

        // Given
        let key = 'gotId';
        let complete = true;

        // When
        let item = new ChecklistItem(key, complete);

        // Then
        expect(item.key).toBe(key);
        expect(item.complete).toBe(complete);

    });

});