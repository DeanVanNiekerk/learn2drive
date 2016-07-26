import { describe, expect, it } from '@angular/core/testing';
import {NavigationItem} from './navigation-item';



describe('NavigationItem Model', () => {


    it('Instantiate', () => {

        // Given
        let key = 'Key 1';

        // When
        let item = new NavigationItem(key);

        // Then
        expect(item.key).toBe(key);

    });

});