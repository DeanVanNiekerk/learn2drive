import {provide} from '@angular/core';

import {
  describe,
  expect,
  it,
  inject,
  fakeAsync,
  beforeEachProviders
} from '@angular/core/testing';

import {StoreService} from './store.service';

// Models
import {TestResult} from '../models/test-result';

describe('Store Service', () => {

    beforeEachProviders(() => {
        return [
            StoreService
        ];
    });

 
   it('addTestResult: test result added', inject(
       [StoreService], 
       (service: StoreService) => {

            // Set up
            service.dropAllTables();
            service.createScheme();


            // Given
            let testResult = new TestResult('nav.key', 75);

            // When
            let insert = service.addTestResult(testResult);

            // Then
            insert.then(() => {
                console.log('inserted');
                
                service.getTestResults(testResult.navigationKey)
                    .then(testResults => {
                        console.log('getTestResults');
                        console.log(testResults);
                        
                        // expect(testResults.length).toBe(1);

                    });
               

            });
            
        }
    ));
    
});