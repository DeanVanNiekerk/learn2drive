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

    //OPTION 1
    it('OPTION 1 - addTestResult: test result added', function(done) {

      // Given
      let service = new StoreService();
      service.dropTables();
      service.createTables();

      let testResult = new TestResult('nav.key', 75);


      //When
      let promise = service.insertTestResult(testResult);

      promise.then(() => {
        console.log("enter first then");

        service
          .getTestResults(testResult.navigationKey)
          .then(testResults => {
            console.log("enter second then");

            console.log(testResults);

            //Then
            expect(testResults.length).toBe(1);

            done();
          });

      });

      console.log("exit function");

    });


  //OPTION 2
  it('OPTION 2 - addTestResult: test result added',
    async(
      fakeAsync(() => {

          // Given
          let service = new StoreService();
          service.dropTables();
          service.createTables();

          let testResult = new TestResult('nav.key', 75);


          //When
          let promise = service.insertTestResult(testResult);

          promise.then(() => {
            console.log("enter first then");

            service
              .getTestResults(testResult.navigationKey)
              .then(testResults => {
                console.log("enter second then");

                console.log(testResults);

                //Then
                expect(testResults.length).toBe(1);

              });

          });

          console.log("exit function");

        })));


  //OPTION 3
  it('OPTION 3 - addTestResult: test result added',
    async(
    fakeAsync(
    inject([StoreService], (service:StoreService) => {

      // Given
      service.dropTables();
      service.createTables();

      let testResult = new TestResult('nav.key', 75);


      //When
      let promise = service.insertTestResult(testResult);

      promise.then(() => {
        console.log("enter first then");

        service
          .getTestResults(testResult.navigationKey)
          .then(testResults => {
            console.log("enter second then");

            console.log(testResults);

            //Then
            expect(testResults.length).toBe(1);

          });

      });

      console.log("exit function");

    }))));



   //Old way
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
