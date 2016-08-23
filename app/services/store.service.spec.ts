import {provide} from '@angular/core';

import {
  describe,
  expect,
  it,
  inject,
  fakeAsync,
  beforeEachProviders,
  async
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

 
   it('addTestResult: test result added', async(inject(
       [StoreService], 
       fakeAsync((service: StoreService) => {

            // Set up
            service.dropTables();
            service.createTables();

            // Given
            let testResult = new TestResult('nav.key', 75);

            // When
            let promise = service.insertTestResult(testResult);

           // console.log('inserting..');

            // Then
            promise.then(() => {

                console.log('this DOESNT GET LOGGED');

                service.getTestResults(testResult.navigationKey)
                    .then(testResults => {
                        console.log(testResults);
                        // expect(testResults.length).toBe(1);
                        expect(false).toBe(true);
                    });
            });
            
        })
   )));
    
});