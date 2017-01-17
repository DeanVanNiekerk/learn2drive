
import {StoreService, StorageService} from './';
import {TestResult, MockTestResult, Message} from '../models';
import {StorageServiceMock} from './mocks';

describe('Store Service', () => {

  // it('insertTestResult: test result added', function (done) {

  //   // Given
  //   let service = new StoreService();
  //   service.dropTables();
  //   service.createTables();

  //   let testResult = new TestResult('nav.key', 100, 75);

  //   // When
  //   let promise = service.insertTestResult(testResult);

  //   promise.then(() => {

  //     service
  //       .getTestResults(testResult.navigationKey)
  //       .then(testResults => {
  //         // Then
  //         expect(testResults.length).toBe(1);

  //         var t1 = testResults[0];

  //         expect(t1.navigationKey).toBe('nav.key');
  //         expect(t1.resultPercent()).toBe(75);
  //         expect(t1.testDate).toBeTruthy(); // Not null

  //         done();
  //       });
  //   });
  // });

  // it('getTestSectionsPassed: none', function (done) {

  //   // Given
  //   let service = new StoreService();
  //   service.dropTables();
  //   service.createTables();

  //   let testResult = new TestResult('nav.key', 100, 75);

   
  //   let promise = service.insertTestResult(testResult);

  //   promise.then(() => {

  //     // When
  //     service
  //       .getTestSectionsPassed()
  //       .then(navigationKeys => {
          
  //         // Then
  //         expect(navigationKeys.length).toBe(0);

  //         done();
  //       });
  //   });
  // });

  //  it('getTestSectionsPassed: 2 passed section', function (done) {

  //   // Given
  //   let service = new StoreService();
  //   service.dropTables();
  //   service.createTables();


  //   service.insertTestResult(new TestResult('nav.key1', 100, 100));
  //   service.insertTestResult(new TestResult('nav.key1', 100, 100));
  //   service.insertTestResult(new TestResult('nav.key2', 100, 75));
  //   service.insertTestResult(new TestResult('nav.key3', 100, 100));
  //   let promise = service.insertTestResult(new TestResult('nav.key1', 100, 75));

  //   promise.then(() => {

  //     // When
  //     service
  //       .getTestSectionsPassed()
  //       .then(navigationKeys => {
          
  //         // Then
  //         expect(navigationKeys.length).toBe(2);

  //         expect(navigationKeys[0]).toBe('nav.key1');
  //         expect(navigationKeys[1]).toBe('nav.key3');

  //         done();
  //       });
  //   });
  // });

  // it('insertMockTestResult: mock test result added', function (done) {

  //   // Given
  //   let service = new StoreService();
  //   service.dropTables();
  //   service.createTables();

  //   let testResult = new MockTestResult(1, 1, 1, 1, 1, 1, 1, 1, 1);

  //   // When
  //   let promise = service.insertMockTestResult(testResult);

  //   promise.then(() => {

  //     service
  //       .getMockTestsPassed()
  //       .then(count => {
  //         // Then
  //         expect(count).toBe(1);

  //         done();
  //       });
  //   });
  // });

  // it('getMockTestsPassed: 2 passed 1 failed', function (done) {

  //   // Given
  //   let service = new StoreService();
  //   service.dropTables();
  //   service.createTables();

  //   // When
  //   service.insertMockTestResult(new MockTestResult(1, 1, 1, 1, 1, 1, 1, 1, 1)); // Pass
  //   service.insertMockTestResult(new MockTestResult(1, 0, 1, 1, 0, 1, 1, 0, 1)); // Fail
  //   let promise = service.insertMockTestResult(new MockTestResult(1, 1, 1, 1, 1, 1, 1, 1, 1)); // Pass

  //   promise.then(() => {

  //     service
  //       .getMockTestsPassed()
  //       .then(count => {
  //         // Then
  //         expect(count).toBe(2);

  //         done();
  //       });
  //   });
  // });

  it('insertContentRead: content read added', function (done) {

    // Given
    let mock = new StorageServiceMock();
    let service = new StoreService(<any>mock);

    // When
    let promise = service.insertContentRead('nav.key1');

    promise.then((result) => {

        // Then
        expect(result.key).toBe(StorageService.KEY_CONTENTREAD);
        expect(result.value[0].navigationKey).toBe('nav.key1');
        expect(result.value[0].readDate).not.toBeNull();

        done();
    });
  });

  it('getContentReadCount: multiple items', function (done) {

    // Given
    let mock = new StorageServiceMock();
    let mockData = [];
    mockData.push({ navigationKey: '1.2', readDate: new Date().getTime() }); // 1
    mockData.push({ navigationKey: '1.2.3', readDate: new Date().getTime() }); // 2
    mockData.push({ navigationKey: '1', readDate: new Date().getTime() });
    mockData.push({ navigationKey: '1.9', readDate: new Date().getTime() });
    mockData.push({ navigationKey: '1.2.3', readDate: new Date().getTime() });
    mockData.push({ navigationKey: '1.2.3.4', readDate: new Date().getTime() }); // 3
    mock.returnValue = JSON.stringify(mockData);
    

    let service = new StoreService(<any>mock);

    // When
    service
      .getContentReadCount('1.2')
      .then(count => {
        // Then
        expect(count).toBe(3);

        done();
      });
  });


  // it('clearContentRead: content read cleared', function (done) {

  //   // Given
  //   let service = new StoreService();
  //   service.dropTables();
  //   service.createTables();

  //   service.insertContentRead('nav.key1')
  //   .then(() => {

  //     // When
  //     service
  //       .clearContentRead()
  //       .then(() => {

  //         service.getContentReadCount('')
  //         .then(count => {

  //           // Then
  //           expect(count).toBe(0);

  //           done();

  //         });
  //       });
  //   });
  // });

  // it('getChecklistItem: null returned', function (done) {

  //   // Given
  //   let service = new StoreService();
  //   service.dropTables();
  //   service.createTables();

  //   // When
  //   let promise = service.getChecklistItem('key1');

  //   promise.then((item) => {

  //     expect(item).toBe(null);
  //     done();

  //   });

     
  // });

  
  // it('updateChecklistItem: checklist item inserted', function (done) {

  //   // Given
  //   let service = new StoreService();
  //   service.dropTables();
  //   service.createTables();

  //   // When
  //   let promise = service.updateChecklistItem('key1', true);

  //   promise.then(() => {

  //     service
  //       .getChecklistItem('key1')
  //       .then(item => {
          
  //         // Then
  //         expect(item.key).toBe('key1');
  //         expect(item.complete).toBe(true);

  //         done();
  //       });
  //   });
  // });

  // it('updateChecklistItem: checklist item updated', function (done) {

  //   // Given
  //   let service = new StoreService();
  //   service.dropTables();
  //   service.createTables();

  //   // When
  //   let promise = service.updateChecklistItem('key1', true);

  //   promise.then(() => {

  //     service.updateChecklistItem('key1', false).then(() => {

  //       service
  //       .getChecklistItem('key1')
  //       .then(item => {
          
  //         // Then
  //         expect(item.key).toBe('key1');
  //         expect(item.complete).toBe(false);

  //         done();
  //       });

  //     });

  //   });
  // });


  // it('getCompleteChecklistItemCount: no checklist items', function (done) {

  //   // Given
  //   let service = new StoreService();
  //   service.dropTables();
  //   service.createTables();

  //   // When
  //   let promise = service.getCompleteChecklistItemCount();

  //   promise.then((count) => {

  //     expect(count).toBe(0);
  //     done();

  //   });
     
  // });


  // it('getCompleteChecklistItemCount: 1 checklist item, not complete', function (done) {

  //   // Given
  //   let service = new StoreService();
  //   service.dropTables();
  //   service.createTables();

  //   // When
  //   let promise = service.updateChecklistItem('key1', false);

  //   promise.then(() => {

  //     service.getCompleteChecklistItemCount().then((count) => {

  //       expect(count).toBe(0);
  //       done();

  //     });
  //   });
     
  // });


  // it('getCompleteChecklistItemCount: 2 checklist items, 1 complete', function (done) {

  //   // Given
  //   let service = new StoreService();
  //   service.dropTables();
  //   service.createTables();

  //   // When
  //   service.updateChecklistItem('key1', false);
  //   let promise = service.updateChecklistItem('key2', true);

  //   promise.then(() => {

  //     service.getCompleteChecklistItemCount().then((count) => {

  //       expect(count).toBe(1);
  //       done();

  //     });
  //   });
     
  // });


  // it('getMessage: default returned', function (done) {

  //   // Given
  //   let service = new StoreService();
  //   service.dropTables();
  //   service.createTables();

  //   // When
  //   let promise = service.getMessage('key1');

  //   promise.then((message) => {

  //     expect(message.id).toBe(null);
  //     expect(message.key).toBe('key1');
  //     expect(message.shown).toBe(false);
  //     expect(message.showAgain).toBe(true);
  //     done();

  //   });

     
  // });

  // it('updateMessage: message inserted', function (done) {

  //   // Given
  //   let service = new StoreService();
  //   service.dropTables();
  //   service.createTables();

  //   let message = new Message(null, 'key1', true, false);

  //   // When
  //   let promise = service.updateMessage(message);

  //   promise.then(() => {

  //     service
  //       .getMessage(message.key)
  //       .then(actual => {
          
  //         // Then
  //         expect(actual.id).toBe(1);
  //         expect(actual.key).toBe(message.key);
  //         expect(actual.shown).toBe(message.shown);
  //         expect(actual.showAgain).toBe(message.showAgain);

  //         done();
  //       });
  //   });
  // });

  // it('updateMessage: message updated', function (done) {

  //   // Given
  //   let service = new StoreService();
  //   service.dropTables();
  //   service.createTables();

  //   let message = new Message(null, 'key2', false, true);

  //   // When
  //   let promise = service.updateMessage(message);

  //   promise.then(() => {

  //     message.shown = true;
  //     message.showAgain = false;

  //     service.updateMessage(message).then(() => {

  //       service
  //       .getMessage(message.key)
  //       .then(actual => {
          
  //         // Then
  //         expect(actual.id).toBe(1);
  //         expect(actual.key).toBe(message.key);
  //         expect(actual.shown).toBe(message.shown);
  //         expect(actual.showAgain).toBe(message.showAgain);

  //         done();
  //       });

  //     });

  //   });
  // });
  
});
