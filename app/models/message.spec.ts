

import { describe, expect, it } from '@angular/core/testing';
import {Message} from './message';



describe('Message Model', () => {


    it('Instantiate', () => {

        
        // Given
        let id = 10;
        let key = 'key2';
        let shown = true;
        let showAgain = false;

        // When
        let message = new Message(id, key, shown, showAgain);

        
        // Then
        expect(message.id).toBe(id);
        expect(message.key).toBe(key);
        expect(message.shown).toBe(shown);
        expect(message.showAgain).toBe(showAgain);

    });

});