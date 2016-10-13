

import { describe, expect, it } from '@angular/core/testing';
import {Progress} from './progress';



describe('Progress Model', () => {


    it('Instantiate', () => {

        // Given
        let total = 10;
        let complete = 6;

        // When
        let progress = new Progress(total, complete);

        // Then
        expect(progress.total).toBe(total);
        expect(progress.complete).toBe(complete);

    });

    
    it('Percent - 0%', () => {

        // Given
        let total = 10;
        let complete = 0;

        // When
        let progress = new Progress(total, complete);

        // Then
        expect(progress.percent()).toBe(0);

    });

    it('Percent - 50%', () => {

        // Given
        let total = 10;
        let complete = 5;

        // When
        let progress = new Progress(total, complete);

        // Then
        expect(progress.percent()).toBe(50);

    });

    it('IsComplete - false', () => {

        // Given
        let total = 10;
        let complete = 5;

        // When
        let progress = new Progress(total, complete);

        // Then
        expect(progress.isComplete()).toBe(false);

    });

    it('IsComplete - true', () => {

        // Given
        let total = 10;
        let complete = 10;

        // When
        let progress = new Progress(total, complete);

        // Then
        expect(progress.isComplete()).toBe(true);

    });

});