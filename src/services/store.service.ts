import { Injectable } from '@angular/core';

import { TestResult, MockTestResult, ChecklistItem, Message } from '../models';
import {StorageService} from '../services';

@Injectable()
export class StoreService {

    public MOCK_TEST_PASS_TARGET: number = 3;

    // Init an empty DB if it does not exist by now!
    constructor(private storage: StorageService) {
        this.storage = storage;
    }

    public insertContentRead(navigationKey: string): Promise<any> {

        return new Promise(resolve => {
          this.storage.get(StorageService.KEY_CONTENTREAD)
            .then((rawData: string) => {

                let data = rawData ? JSON.parse(rawData) : [];

                data.push({ navigationKey: navigationKey, readDate: new Date().getTime() });

                this.storage.set(StorageService.KEY_CONTENTREAD, JSON.stringify(data)).then((result) => {
                    resolve(result);
                });
          });

        });
    }

    public getContentReadCount(navigationKey: string): Promise<number> {

        return new Promise(resolve => {

          this.storage.get(StorageService.KEY_CONTENTREAD)
            .then((rawData: string) => {
              let data = rawData ? JSON.parse(rawData) : [];

              let result = alasql(`
                SELECT COUNT(DISTINCT navigationKey) AS readCount
                FROM ? 
                WHERE navigationKey LIKE ('${navigationKey}%')`
                , [data]);

              resolve(result[0].readCount);
          });

        });

    }

    public insertTestResult(testResult: TestResult): Promise<any> {

        return new Promise(resolve => {
          this.storage.get(StorageService.KEY_TESTRESULTS)
            .then((rawData: string) => {

                let data = rawData ? JSON.parse(rawData) : [];

                data.push({ 
                    navigationKey: testResult.navigationKey, 
                    totalQuestions: testResult.totalQuestions,
                    correctAnswers: testResult.correctAnswers,
                    testDate: new Date().getTime() 
                });

                this.storage.set(StorageService.KEY_TESTRESULTS, JSON.stringify(data)).then((result) => {
                    resolve(result);
                });
          });

        });
    }

    public getLatestTestResult(navigationKey: string): Promise<TestResult> {

        return new Promise(resolve => {

          this.storage.get(StorageService.KEY_TESTRESULTS)
            .then((rawData: string) => {
                let data = rawData ? JSON.parse(rawData) : [];

                let result = alasql(`
                    SELECT TOP 1 navigationKey,totalQuestions,correctAnswers,testDate 
                    FROM ?
                    WHERE navigationKey = '${navigationKey}'
                    ORDER BY testDate DESC`
                    , [data]);

                let testResults: Array<TestResult> = result.map((r) => {
                    return this.mapTestResults(r);
                });
                
                resolve(testResults.length > 0 ? testResults[0] : null);
          });

        });
    }

    public getTestResults(navigationKey: string): Promise<TestResult[]> {

        return new Promise(resolve => {

          this.storage.get(StorageService.KEY_TESTRESULTS)
            .then((rawData: string) => {
                let data = rawData ? JSON.parse(rawData) : [];

                let result = alasql(`
                    SELECT navigationKey,totalQuestions,correctAnswers,testDate
                    FROM ?
                    WHERE navigationKey = '${navigationKey}'
                    ORDER BY testDate DESC`
                    , [data]);

                let testResults = result.map((r) => {
                    return this.mapTestResults(r);
                });
                
                resolve(testResults);
          });

        });
    }

    private mapTestResults(r: any): TestResult {
        return new TestResult(r.navigationKey, r.totalQuestions, r.correctAnswers, r.testDate);
    }

    public getTestSectionsPassed(): Promise<Array<string>> {

        return new Promise(resolve => {

          this.storage.get(StorageService.KEY_TESTRESULTS)
            .then((rawData: string) => {
                let data = rawData ? JSON.parse(rawData) : [];

                let result = alasql(`
                    SELECT DISTINCT navigationKey
                    FROM ?
                    WHERE totalQuestions = correctAnswers`
                    , [data]);

                let keys = result.map((r) => {
                    return r.navigationKey;
                });
                
                resolve(keys);
          });

        });
    }

    public insertMockTestResult(testResult: MockTestResult): Promise<any> {

        return new Promise(resolve => {
          this.storage.get(StorageService.KEY_MOCKTESTRESULTS)
            .then((rawData: string) => {

                let data = rawData ? JSON.parse(rawData) : [];

                data.push({ 
                    sectionAPassed: testResult.sectionAPassed(), 
                    sectionBPassed: testResult.sectionBPassed(),
                    sectionCPassed: testResult.sectionCPassed(),
                    testDate: new Date().getTime() 
                });

                this.storage.set(StorageService.KEY_MOCKTESTRESULTS, JSON.stringify(data)).then((result) => {
                    resolve(result);
                });
          });

        });

    }

    public getMockTestsPassed(): Promise<number> {

        return new Promise(resolve => {

          this.storage.get(StorageService.KEY_MOCKTESTRESULTS)
            .then((rawData: string) => {
                let data = rawData ? JSON.parse(rawData) : [];

                let result = alasql(`
                    SELECT COUNT(*) AS mockTestsPassed
                    FROM ?
                    WHERE sectionAPassed = true
                    AND sectionBPassed = true
                    AND sectionCPassed = true`
                    , [data]);

                resolve(result[0].mockTestsPassed);
          });

        });
    }

    public updateChecklistItem(key: string, complete: boolean): Promise<any> {

        return new Promise(resolve => {

            this.getChecklistItem(key)
                .then(item => {

                     this.storage.get(StorageService.KEY_CHECKLIST)
                        .then((rawData: string) => {

                            let data: Array<any> = rawData ? JSON.parse(rawData) : [];

                            // Insert
                            if (item == null) {
                                data.push({ key: key, complete: complete});
                            } 
                            // Update
                            else {
                                data.forEach((item) => {
                                    if (item.key === key)
                                        item.complete = complete;
                                });
                            }

                            this.storage.set(StorageService.KEY_CHECKLIST, JSON.stringify(data)).then((result) => {
                                resolve(result);
                            });


                        });
                });
        });
    }

    public getCompleteChecklistItemCount(): Promise<number> {

         return new Promise(resolve => {

          this.storage.get(StorageService.KEY_CHECKLIST)
            .then((rawData: string) => {
                let data = rawData ? JSON.parse(rawData) : [];

                let result = alasql(`
                    SELECT COUNT(*) AS itemCount
                    FROM ?
                    WHERE complete = true`
                    , [data]);

                resolve(result[0].itemCount);
          });

        });
    }


    public getChecklistItem(key: string): Promise<ChecklistItem> {

        return new Promise(resolve => {

          this.storage.get(StorageService.KEY_CHECKLIST)
            .then((rawData: string) => {
                let data = rawData ? JSON.parse(rawData) : [];

                let result = alasql(`
                    SELECT [key], [complete]
                     FROM ?
                     WHERE [key] = '${key}'`
                    , [data]);

                let checklistitem = null;
                if (result.length > 0) {
                    let item = result[0];
                    checklistitem = new ChecklistItem(item.key, item.complete);
                }
                
                resolve(checklistitem);
          });

        });
    }

    public updateMessage(message: Message): Promise<any> {

        return new Promise(resolve => {

            this.getMessageQuery(message.key)
                .then((result: any) => {
                   
                     this.storage.get(StorageService.KEY_MESSAGES)
                        .then((rawData: string) => {

                            let data: Array<any> = rawData ? JSON.parse(rawData) : [];

                            // Insert
                            if (result.length === 0) {
                                data.push({ key: message.key, shown: message.shown, showAgain: message.showAgain});
                            } 
                            // Update
                            else {
                                data.forEach((item) => {
                                    if (item.key === message.key) {
                                        item.shown = message.shown;
                                        item.showAgain = message.showAgain;
                                    }
                                });
                            }

                            this.storage.set(StorageService.KEY_MESSAGES, JSON.stringify(data)).then((result) => {
                                resolve(result);
                            });

                        });
                });
        });
    }

    public getMessage(key: string): Promise<Message> {

        return new Promise(resolve => {

          this.getMessageQuery(key)
            .then((result: any) => {

                let message = null;
                if (result.length > 0) {
                    let item = result[0];
                    message = new Message(item.key, item.shown, item.showAgain);
                }
                else {
                    // Default
                    message = new Message(key, false, true);
                }
                
                resolve(message);
          });

        });
    }

    private getMessageQuery(key: string): Promise<Array<any>> {

        return new Promise(resolve => {

          this.storage.get(StorageService.KEY_MESSAGES)
            .then((rawData: string) => {
                let data = rawData ? JSON.parse(rawData) : [];

                let result = alasql(`
                     SELECT [key], [shown], [showAgain]
                     FROM ?
                     WHERE [key] = '${key}'`
                    , [data]);

                resolve(result);
          });

        });
    }

    public clearTestResults(): Promise<any> {
        return this.storage.remove(StorageService.KEY_TESTRESULTS);
    }

    public clearContentRead(): Promise<any> {
        return this.storage.remove(StorageService.KEY_CONTENTREAD);
    }

    // KILLS ALL DATA
    public clearAll(): Promise<any> {
        return this.storage.clear();
    }

}

