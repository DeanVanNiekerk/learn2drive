
import {StoreService, StorageService} from './';
import {TestResult, MockTestResult, Message} from '../models';
import {StorageServiceMock} from './mocks';

describe('Store Service', () => {

  it('insertTestResult: test result added', function (done) {

    // Given
    let mock = new StorageServiceMock();
    let service = new StoreService(<any>mock);

    let testResult = new TestResult('nav.key', 100, 75);

    // When
    let promise = service.insertTestResult(testResult);

    promise.then((result) => {

      // Then
      let data = JSON.parse(result.value);

      // Then
      expect(data.length).toBe(1);

      var t1 = data[0];

      expect(t1.navigationKey).toBe('nav.key');
      expect(t1.totalQuestions).toBe(100);
      expect(t1.correctAnswers).toBe(75);
      expect(t1.testDate).toBeTruthy(); // Not null

      done();
    });
  });

  it('getTestResults: multiple items', function (done) {

    // Given
    let mock = new StorageServiceMock();
    let mockData = [];
    mockData.push({ navigationKey: '1.2', totalQuestions: 10, correctAnswers: 5, testDate: new Date().getTime() });
    mockData.push({ navigationKey: '1.2.3', totalQuestions: 20, correctAnswers: 15, testDate: new Date().getTime() });
    mock.returnValue = JSON.stringify(mockData);
    

    let service = new StoreService(<any>mock);

    // When
    service
      .getTestResults('1.2')
      .then(testResults => {
        // Then
        expect(testResults.length).toBe(1);

        var t1 = testResults[0];

        expect(t1.navigationKey).toBe('1.2');
        expect(t1.totalQuestions).toBe(10);
        expect(t1.correctAnswers).toBe(5);
        expect(t1.testDate).toBeTruthy(); // Not null

        done();
      });
  });

  it('getLatestTestResult: multiple items', function (done) {

    // Given
    let mock = new StorageServiceMock();
    let mockData = [];
    let oldDate = new Date(2000, 1);
    let newDate = new Date(2020, 1);
    mockData.push({ navigationKey: '1.2', totalQuestions: 10, correctAnswers: 5, testDate: oldDate.getTime() });
    mockData.push({ navigationKey: '1.2', totalQuestions: 20, correctAnswers: 15, testDate: newDate.getTime() });
    mock.returnValue = JSON.stringify(mockData);
    

    let service = new StoreService(<any>mock);

    // When
    service
      .getLatestTestResult('1.2')
      .then(testResult => {
        // Then
        expect(testResult.navigationKey).toBe('1.2');
        expect(testResult.totalQuestions).toBe(20);
        expect(testResult.correctAnswers).toBe(15);
        expect(testResult.testDate).toBeTruthy(); // Not null

        done();
      });
  });

  it('getTestSectionsPassed: none', function (done) {

    // Given
    let mock = new StorageServiceMock();
    let mockData = [];
    mockData.push({ navigationKey: '1.2.3', totalQuestions: 20, correctAnswers: 15, testDate: new Date().getTime() });
    mock.returnValue = JSON.stringify(mockData);

    let service = new StoreService(<any>mock);

    // When
    service
      .getTestSectionsPassed()
      .then(keys => {
        // Then
        expect(keys.length).toBe(0);
        done();
      });
  });

   it('getTestSectionsPassed: 2 passed section', function (done) {

    // Given
    let mock = new StorageServiceMock();
    let mockData = [];
    mockData.push({ navigationKey: 'nav.key1', totalQuestions: 100, correctAnswers: 100 });
    mockData.push({ navigationKey: 'nav.key1', totalQuestions: 100, correctAnswers: 100 });
    mockData.push({ navigationKey: 'nav.key2', totalQuestions: 100, correctAnswers: 75 });
    mockData.push({ navigationKey: 'nav.key3', totalQuestions: 100, correctAnswers: 100 });
    mockData.push({ navigationKey: 'nav.key1', totalQuestions: 100, correctAnswers: 75 });
    mock.returnValue = JSON.stringify(mockData);

    let service = new StoreService(<any>mock);

    // When
    service
      .getTestSectionsPassed()
      .then(keys => {
        // Then
        expect(keys.length).toBe(2);
        done();
      });

  });

  it('insertMockTestResult: mock test result added', function (done) {

    // Given
    let mock = new StorageServiceMock();
    let service = new StoreService(<any>mock);

    let testResult = new MockTestResult(10, 5, 6, 10, 5, 4, 10, 8, 9);

    // When
    let promise = service.insertMockTestResult(testResult);

    promise.then((result) => {

      // Then
      let data = JSON.parse(result.value);

      // Then
      expect(data.length).toBe(1);

      var t1 = data[0];

      expect(t1.sectionAPassed).toBe(false);
      expect(t1.sectionBPassed).toBe(true);
      expect(t1.sectionCPassed).toBe(false);
      expect(t1.testDate).toBeTruthy(); // Not null

      done();
    });
   
  });

  it('getMockTestsPassed: 2 passed 1 failed', function (done) {

    // Given
    let mock = new StorageServiceMock();
    let mockData = [];
    mockData.push({ sectionAPassed: true, sectionBPassed: true, sectionCPassed: true }); // Pass
    mockData.push({ sectionAPassed: true, sectionBPassed: false, sectionCPassed: true }); // Fail
    mockData.push({ sectionAPassed: true, sectionBPassed: true, sectionCPassed: true }); // Pass
    mock.returnValue = JSON.stringify(mockData);

    let service = new StoreService(<any>mock);

    // When
    service
      .getMockTestsPassed()
      .then(count => {
        // Then
        expect(count).toBe(2);
        done();
      });
  });

  it('insertContentRead: content read added', function (done) {

    // Given
    let mock = new StorageServiceMock();
    let service = new StoreService(<any>mock);

    // When
    let promise = service.insertContentRead('nav.key1');

    promise.then((result) => {

        // Then
        let data = JSON.parse(result.value);

        expect(result.key).toBe(StorageService.KEY_CONTENTREAD);
        expect(data.length).toBe(1);
        expect(data[0].navigationKey).toBe('nav.key1');
        expect(data[0].readDate).not.toBeNull();

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


  it('clearContentRead: content read cleared', function (done) {

    // Given
    let mock = new StorageServiceMock();
    let service = new StoreService(<any>mock);

    // When
    service
      .clearContentRead()
      .then(result => {
        // Then
        expect(result.key).toBe(StorageService.KEY_CONTENTREAD);

        done();
      });
  });

  it('getChecklistItem: null returned', function (done) {

    // Given
    let mock = new StorageServiceMock();
    let service = new StoreService(<any>mock);

    // When
    let promise = service.getChecklistItem('key1');

    promise.then((item) => {

      expect(item).toBe(null);
      done();

    });

     
  });

  it('getChecklistItem: 1 returned', function (done) {

    // Given
    let mock = new StorageServiceMock();
    let mockData = [];
    mockData.push({ key: 'key1', complete: true });
    mock.returnValue = JSON.stringify(mockData);

    let service = new StoreService(<any>mock);

    // When
    let promise = service.getChecklistItem('key1');

    promise.then((item) => {

      expect(item.key).toBe('key1');
      expect(item.complete).toBe(true);
      done();

    });

     
  });

  
  it('updateChecklistItem: checklist item inserted', function (done) {

    // Given
    let mock = new StorageServiceMock();
    let service = new StoreService(<any>mock);

    // When
    let promise = service.updateChecklistItem('key1', true);

    promise.then((result) => {

      // Then
      expect(result.key).toBe(StorageService.KEY_CHECKLIST);

      let data = JSON.parse(result.value);

      expect(data.length).toBe(1);
      expect(data[0].key).toBe('key1');
      expect(data[0].complete).toBe(true);

      done();
    });
  });

  it('updateChecklistItem: checklist item updated', function (done) {

    // Given
    let mock = new StorageServiceMock();
    let mockData = [];
    mockData.push({ key: 'key1', complete: true });
    mock.returnValue = JSON.stringify(mockData);

    let service = new StoreService(<any>mock);

    service.updateChecklistItem('key1', false)
      .then((result) => {

        // Then
        expect(result.key).toBe(StorageService.KEY_CHECKLIST);

        let data = JSON.parse(result.value);

        expect(data.length).toBe(1);
        expect(data[0].key).toBe('key1');
        expect(data[0].complete).toBe(false);

        done();

      });
  });


  it('getCompleteChecklistItemCount: no checklist items', function (done) {

    // Given
    let mock = new StorageServiceMock();
    let service = new StoreService(<any>mock);

    // When
    let promise = service.getCompleteChecklistItemCount();

    promise.then((count) => {

      expect(count).toBe(0);
      done();

    });
     
  });


  it('getCompleteChecklistItemCount: 1 checklist item, not complete', function (done) {

    // Given
    let mock = new StorageServiceMock();
    let mockData = [];
    mockData.push({ key: 'key1', complete: false });
    mock.returnValue = JSON.stringify(mockData);

    let service = new StoreService(<any>mock);

    // When
    service.getCompleteChecklistItemCount()
      .then((count) => {

        expect(count).toBe(0);
        done();

      });
     
  });


  it('getCompleteChecklistItemCount: 2 checklist items, 1 complete', function (done) {

    // Given
    let mock = new StorageServiceMock();
    let mockData = [];
    mockData.push({ key: 'key1', complete: false });
    mockData.push({ key: 'key2', complete: true });
    mock.returnValue = JSON.stringify(mockData);

    let service = new StoreService(<any>mock);

    // When
    service.getCompleteChecklistItemCount()
      .then((count) => {

        expect(count).toBe(1);
        done();

      });
     
  });


  it('getMessage: default returned', function (done) {

    // Given
    let mock = new StorageServiceMock();
    let service = new StoreService(<any>mock);

    // When
    let promise = service.getMessage('key1');

    promise.then((message) => {

      expect(message.key).toBe('key1');
      expect(message.shown).toBe(false);
      expect(message.showAgain).toBe(true);
      done();

    });

     
  });

  it('getMessage: returned', function (done) {

    // Given
    let mock = new StorageServiceMock();
    let mockData = [];
    mockData.push({ key: 'key2', shown: true, showAgain: false });
    mock.returnValue = JSON.stringify(mockData);

    let service = new StoreService(<any>mock);

    // When
    let promise = service.getMessage('key2');

    promise.then((message) => {

      expect(message.key).toBe('key2');
      expect(message.shown).toBe(true);
      expect(message.showAgain).toBe(false);
      done();

    });

     
  });

  it('updateMessage: message inserted', function (done) {

    // Given
    let mock = new StorageServiceMock();
    let service = new StoreService(<any>mock);

    let message = new Message('key1', true, false);

    // When
    service.updateMessage(message)
      .then((result) => {

        // Then
        expect(result.key).toBe(StorageService.KEY_MESSAGES);

        let data = JSON.parse(result.value);

        expect(data.length).toBe(1);
        expect(data[0].key).toBe(message.key);
        expect(data[0].shown).toBe(message.shown);
        expect(data[0].showAgain).toBe(message.showAgain);

        done();
    });
  });

  it('updateMessage: message updated', function (done) {

    // Given
    let mock = new StorageServiceMock();
    let mockData = [];
    mockData.push({ key: 'key1', shown: false, showAgain: true });
    mock.returnValue = JSON.stringify(mockData);

    let service = new StoreService(<any>mock);

    let message = new Message('key1', true, false);

    // When
    service.updateMessage(message)
      .then((result) => {

        // Then
        expect(result.key).toBe(StorageService.KEY_MESSAGES);

        let data = JSON.parse(result.value);

        expect(data.length).toBe(1);
        expect(data[0].key).toBe(message.key);
        expect(data[0].shown).toBe(message.shown);
        expect(data[0].showAgain).toBe(message.showAgain);

        done();
    });

  });
  
});
