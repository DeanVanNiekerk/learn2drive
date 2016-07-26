import { describe, expect, it } from '@angular/core/testing';
import {Content} from './content';



describe('Content Model', () => {


    it('Instantiate', () => {

        // Given
        let heading = 'Heading 1';
        let text = 'Long text here....';

        // When
        let content = new Content(heading, text);

        // Then
        expect(content.heading).toBe(heading);
        expect(content.text).toBe(text);

    });

});

