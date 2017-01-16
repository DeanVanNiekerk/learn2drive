'use strict';

import {ChecklistItem} from './checklist-item';



describe('Checklist Item Model', () => {


    it('Instantiate', () => {

        // Given
        let id = 1;
        let key = 'gotId';
        let complete = true;

        // When
        let item = new ChecklistItem(id, key, complete);

        // Then
        expect(item.id).toBe(id);
        expect(item.key).toBe(key);
        expect(item.complete).toBe(complete);

    });

});