'use strict';

import {Message} from './message';



describe('Message Model', () => {


    it('Instantiate', () => {

        
        // Given
        let key = 'key2';
        let shown = true;
        let showAgain = false;

        // When
        let message = new Message(key, shown, showAgain);

        
        // Then
        expect(message.key).toBe(key);
        expect(message.shown).toBe(shown);
        expect(message.showAgain).toBe(showAgain);

    });

});