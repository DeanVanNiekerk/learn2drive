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
import {ChecklistItem} from '../models/checklist-item';
import {Message} from '../models/message';

describe('Store Service', () => {

  it('insertTestResult: test result added', function (done) {

    // Given
    let service = new StoreService();
    service.dropTables();
    service.createTables();

    let testResult = new TestResult('nav.key', 75);

    // When
    let promise = service.insertTestResult(testResult);

    promise.then(() => {

      service
        .getTestResults(testResult.navigationKey)
        .then(testResults => {
          // Then
          expect(testResults.length).toBe(1);

          var t1 = testResults[0];

          expect(t1.navigationKey).toBe('nav.key');
          expect(t1.resultPercent).toBe(75);
          expect(t1.testDate).toBeTruthy(); // Not null

          done();
        });
    });
  });

  it('getTestSectionsPassed: none', function (done) {

    // Given
    let service = new StoreService();
    service.dropTables();
    service.createTables();

    let testResult = new TestResult('nav.key', 75);

   
    let promise = service.insertTestResult(testResult);

    promise.then(() => {

      // When
      service
        .getTestSectionsPassed()
        .then(navigationKeys => {
          
          // Then
          expect(navigationKeys.length).toBe(0);

          done();
        });
    });
  });

   it('getTestSectionsPassed: 2 passed section', function (done) {

    // Given
    let service = new StoreService();
    service.dropTables();
    service.createTables();


    service.insertTestResult(new TestResult('nav.key1', 100));
    service.insertTestResult(new TestResult('nav.key1', 100));
    service.insertTestResult(new TestResult('nav.key2', 75));
    service.insertTestResult(new TestResult('nav.key3', 100));
    let promise = service.insertTestResult(new TestResult('nav.key1', 75));

    promise.then(() => {

      // When
      service
        .getTestSectionsPassed()
        .then(navigationKeys => {
          
          // Then
          expect(navigationKeys.length).toBe(2);

          expect(navigationKeys[0]).toBe('nav.key1');
          expect(navigationKeys[1]).toBe('nav.key3');

          done();
        });
    });
  });

  it('insertContentRead: content read added', function (done) {

    // Given
    let service = new StoreService();
    service.dropTables();
    service.createTables();

    // When
    let promise = service.insertContentRead('nav.key1');

    promise.then(() => {

      service
        .getContentReadCount('nav.key1')
        .then(count => {
          // Then
          expect(count).toBe(1);

          done();
        });
    });
  });

  it('getContentReadCount: multiple items', function (done) {

    // Given
    let service = new StoreService();
    service.dropTables();
    service.createTables();

    // When
    service.insertContentRead('1.2');       // 1
    service.insertContentRead('1.2.3');     // 2
    service.insertContentRead('1');       
    service.insertContentRead('1.9');
    service.insertContentRead('1.2.3'); 
    let promise = service.insertContentRead('1.2.3.4'); // 3

    promise.then(() => {

      service
        .getContentReadCount('1.2')
        .then(count => {
          // Then
          expect(count).toBe(3);

          done();
        });
    });
  });


  it('clearContentRead: content read cleared', function (done) {

    // Given
    let service = new StoreService();
    service.dropTables();
    service.createTables();

    service.insertContentRead('nav.key1')
    .then(() => {

      // When
      service
        .clearContentRead()
        .then(() => {

          service.getContentReadCount('')
          .then(count => {

            // Then
            expect(count).toBe(0);

            done();

          });
        });
    });
  });

  it('getChecklistItem: null returned', function (done) {

    // Given
    let service = new StoreService();
    service.dropTables();
    service.createTables();

    // When
    let promise = service.getChecklistItem('key1');

    promise.then((item) => {

      expect(item).toBe(null);
      done();

    });

     
  });

  
  it('updateChecklistItem: checklist item inserted', function (done) {

    // Given
    let service = new StoreService();
    service.dropTables();
    service.createTables();

    // When
    let promise = service.updateChecklistItem('key1', true);

    promise.then(() => {

      service
        .getChecklistItem('key1')
        .then(item => {
          
          // Then
          expect(item.key).toBe('key1');
          expect(item.complete).toBe(true);

          done();
        });
    });
  });

  it('updateChecklistItem: checklist item updated', function (done) {

    // Given
    let service = new StoreService();
    service.dropTables();
    service.createTables();

    // When
    let promise = service.updateChecklistItem('key1', true);

    promise.then(() => {

      service.updateChecklistItem('key1', false).then(() => {

        service
        .getChecklistItem('key1')
        .then(item => {
          
          // Then
          expect(item.key).toBe('key1');
          expect(item.complete).toBe(false);

          done();
        });

      });

    });
  });


  it('getMessage: default returned', function (done) {

    // Given
    let service = new StoreService();
    service.dropTables();
    service.createTables();

    // When
    let promise = service.getMessage('key1');

    promise.then((message) => {

      expect(message.id).toBe(null);
      expect(message.key).toBe('key1');
      expect(message.shown).toBe(false);
      expect(message.showAgain).toBe(true);
      done();

    });

     
  });

  it('updateMessage: message inserted', function (done) {

    // Given
    let service = new StoreService();
    service.dropTables();
    service.createTables();

    let message = new Message(null, 'key1', true, false);

    // When
    let promise = service.updateMessage(message);

    promise.then(() => {

      service
        .getMessage(message.key)
        .then(actual => {
          
          // Then
          expect(actual.id).toBe(1);
          expect(actual.key).toBe(message.key);
          expect(actual.shown).toBe(message.shown);
          expect(actual.showAgain).toBe(message.showAgain);

          done();
        });
    });
  });

  it('updateMessage: message updated', function (done) {

    // Given
    let service = new StoreService();
    service.dropTables();
    service.createTables();

    let message = new Message(null, 'key2', false, true);

    // When
    let promise = service.updateMessage(message);

    promise.then(() => {

      message.shown = true;
      message.showAgain = false;

      service.updateMessage(message).then(() => {

        service
        .getMessage(message.key)
        .then(actual => {
          
          // Then
          expect(actual.id).toBe(1);
          expect(actual.key).toBe(message.key);
          expect(actual.shown).toBe(message.shown);
          expect(actual.showAgain).toBe(message.showAgain);

          done();
        });

      });

    });
  });
  

  /*
  //There options didnt work when dean tested
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
        inject([StoreService], (service: StoreService) => {

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
    */

});
