'use strict';

import {Content} from './content';



describe('Content Model', () => {


    it('Instantiate', () => {

        // Given
        let heading = 'Heading 1';
        let text = 'Long text here....';
        let image = 'path/to/image.png';

        // When
        let content = new Content(heading, text, image);

        // Then
        expect(content.heading).toBe(heading);
        expect(content.text).toBe(text);
        expect(content.image).toBe(image);

    });

});

