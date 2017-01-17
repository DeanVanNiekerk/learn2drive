import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';

import { SQLite } from 'ionic-native';

import { TestResult, MockTestResult, ChecklistItem, Message } from '../models';
import {StorageService} from '../services';

@Injectable()
export class StoreService {

    private db: SQLite = null;
    private storage: StorageService;

    public MOCK_TEST_PASS_TARGET: number = 3;

    // Init an empty DB if it does not exist by now!
    constructor(storage: StorageService) {
        this.storage = storage;
        this.db = new SQLite();
        this.createTables();
    }

    private openDb(): Promise<any> {
        return this.db.openDatabase({
            name: 'l2d3d.db',
            location: 'default'
        });
    }

    public createTables() {

        this.openDb().then(() => {

            // Create the tests results table
            this.db.executeSql(`CREATE TABLE IF NOT EXISTS 
                                    testResult (
                                        id INTEGER PRIMARY KEY AUTOINCREMENT, 
                                        navigationKey TEXT, 
                                        totalQuestions INTEGER,
                                        correctAnswers INTEGER,
                                        testDate TEXT
                                    )`, {});

            this.db.executeSql(`CREATE TABLE IF NOT EXISTS 
                                    mockTestResult (
                                        id INTEGER PRIMARY KEY AUTOINCREMENT, 
                                        sectionAPassed INTEGER,
                                        sectionBPassed INTEGER,
                                        sectionCPassed INTEGER,
                                        testDate TEXT
                                    )`, {});

            this.db.executeSql(`CREATE TABLE IF NOT EXISTS 
                                    contentRead (
                                        id INTEGER PRIMARY KEY AUTOINCREMENT, 
                                        navigationKey TEXT, 
                                        readDate TEXT
                                    )`, {});

            this.db.executeSql(`CREATE TABLE IF NOT EXISTS 
                                    checklist (
                                        id INTEGER PRIMARY KEY AUTOINCREMENT, 
                                        key TEXT, 
                                        complete INTEGER
                                    )`, {});

            this.db.executeSql(`CREATE TABLE IF NOT EXISTS 
                                    message (
                                        id INTEGER PRIMARY KEY AUTOINCREMENT, 
                                        key TEXT,
                                        shown INTEGER, 
                                        showAgain INTEGER
                                    )`, {});
        });


    }

    public dropTables() {

        this.openDb().then(() => {
            this.db.executeSql(`DROP TABLE IF EXISTS testResult`, {});
            this.db.executeSql(`DROP TABLE IF EXISTS mockTestResult`, {});
            this.db.executeSql(`DROP TABLE IF EXISTS contentRead`, {});
            this.db.executeSql(`DROP TABLE IF EXISTS checklist`, {});
            this.db.executeSql(`DROP TABLE IF EXISTS message`, {});
        });

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

        // return new Promise(resolve => {
        //     this.openDb().then(() => {
        //         let sql = `INSERT INTO contentRead (navigationKey,readDate) 
        //                 VALUES (?,?)`;
        //         this.db.executeSql(sql, [navigationKey, new Date().getTime()])
        //             .then(() => {
        //                 resolve();
        //             });
        //     });
        // });
    }

    public getContentReadCount(navigationKey: string): Promise<number> {

        return new Promise(resolve => {

          this.storage.get(StorageService.KEY_CONTENTREAD)
            .then((rawData: string) => {
              let data = JSON.parse(rawData);

              let result = alasql(`
                SELECT COUNT(DISTINCT navigationKey) AS readCount
                FROM ? 
                WHERE navigationKey LIKE ('${navigationKey}%')`
                , [data]);

              resolve(result[0].readCount);
          });

        });

        // return new Promise(resolve => {

        //     this.openDb().then(() => {

        //         this.db.executeSql(`SELECT COUNT(DISTINCT navigationKey) AS count
        //                         FROM contentRead 
        //                         WHERE navigationKey LIKE ('${navigationKey}%')`, {})
        //             .then(data => {
        //                 resolve(data.res.rows.item(0).count);
        //             });
        //     });
        // });
    }
    public insertTestResult(testResult: TestResult): Promise<any> {

        return new Promise(resolve => {

            this.openDb().then(() => {

                let sql = `INSERT INTO testResult (navigationKey,totalQuestions,correctAnswers,testDate) 
                        VALUES (?,?,?,?)`;
                this.db.executeSql(sql, [testResult.navigationKey, testResult.totalQuestions, testResult.correctAnswers, new Date().getTime()])
                    .then(() => {
                        resolve();
                    });
            });

        });


    }

    public getLatestTestResult(navigationKey: string): Promise<TestResult> {

        return new Promise(resolve => {

            this.openDb().then(() => {
                this.db.executeSql(`SELECT navigationKey,totalQuestions,correctAnswers,testDate 
                                        FROM testResult
                                        WHERE navigationKey = '${navigationKey}'
                                        ORDER BY testDate DESC
                                        LIMIT 1`, {})
                    .then(data => {
                        let testResults = this.mapTestResults(data);
                        resolve(testResults[0]);
                    });
            });
        });
    }

    public getTestResults(navigationKey: string): Promise<TestResult[]> {

        return new Promise(resolve => {

            this.openDb().then(() => {
                this.db.executeSql(`SELECT navigationKey,totalQuestions,correctAnswers,testDate
                                        FROM testResult
                                        WHERE navigationKey = '${navigationKey}'
                                        ORDER BY testDate DESC`, {})
                    .then(data => {
                        let testResults = this.mapTestResults(data);
                        resolve(testResults);
                    });
            });
        });
    }

    private mapTestResults(data: any): TestResult[] {
        let testResults = [];
        if (data.res.rows.length > 0) {
            for (var i = 0; i < data.res.rows.length; i++) {
                let item = data.res.rows.item(i);
                testResults.push(new TestResult(item.navigationKey, item.totalQuestions, item.correctAnswers, new Date(parseInt(item.testDate))));
            }
        }
        return testResults;
    }

    public getTestSectionsPassed(): Promise<Array<string>> {

        return new Promise(resolve => {
            this.openDb().then(() => {
                this.db.executeSql(`SELECT DISTINCT navigationKey
                                        FROM testResult
                                        WHERE totalQuestions = correctAnswers`, {})
                    .then(data => {
                        let keys = [];
                        if (data.res.rows.length > 0) {
                            for (var i = 0; i < data.res.rows.length; i++) {
                                let item = data.res.rows.item(i);
                                keys.push(item.navigationKey);
                            }
                        }
                        resolve(keys);
                    });
            });

        });

    }

    public insertMockTestResult(result: MockTestResult): Promise<any> {

        return new Promise(resolve => {
            this.openDb().then(() => {
                let sql = `INSERT INTO mockTestResult (sectionAPassed,sectionBPassed,sectionCPassed,testDate) 
                        VALUES (?,?,?,?)`;
                this.db.executeSql(sql, [result.sectionAPassed() ? 1 : 0, result.sectionAPassed() ? 1 : 0, result.sectionAPassed() ? 1 : 0, new Date().getTime()])
                    .then(() => {
                        resolve();
                    });
            });
        });

    }

    public getMockTestsPassed(): Promise<number> {

        return new Promise(resolve => {
            this.openDb().then(() => {
                this.db.executeSql(`SELECT COUNT(*) AS count
                                        FROM mockTestResult
                                        WHERE sectionAPassed = 1
                                        AND sectionBPassed = 1
                                        AND sectionCPassed = 1`, {})
                    .then(data => {
                        resolve(data.res.rows.item(0).count);
                    });
            });

        });

    }

    public updateChecklistItem(key: string, complete: boolean): Promise<any> {

        return new Promise(resolve => {
            this.openDb().then(() => {
                this.getChecklistItem(key)
                    .then(item => {
                        let promise = null;

                        if (item == null) {

                            // Insert
                            let sql = `INSERT INTO checklist (key,complete) VALUES (?,?)`;
                            promise = this.db.executeSql(sql, [key, complete ? 1 : 0]).then(() => { resolve(); });

                        } else {

                            // Update
                            let sql = `UPDATE checklist 
                                    SET complete = ${complete ? 1 : 0}
                                    WHERE key = '${key}'`;
                            promise = this.db.executeSql(sql, {});
                        }

                        promise.then(() => { resolve(); });
                    });
            });

        });
    }

    public getCompleteChecklistItemCount(): Promise<number> {

        return new Promise(resolve => {
            this.openDb().then(() => {
                this.db.executeSql(`SELECT COUNT(*) AS count
                                        FROM checklist
                                        WHERE complete = 1`, {})
                    .then(data => {
                        let count = 0;
                        if (data.res.rows.length > 0) {
                            let item = data.res.rows.item(0);
                            count = item.count;
                        }
                        resolve(count);
                    });
            });

        });
    }


    public getChecklistItem(key: string): Promise<ChecklistItem> {

        return new Promise(resolve => {
            this.openDb().then(() => {
                this.db.executeSql(`SELECT id, key, complete
                    FROM checklist
                    WHERE key = '${key}'`, {})
                    .then(data => {
                        let checklistitem = null;
                        if (data.res.rows.length > 0) {
                            let item = data.res.rows.item(0);
                            checklistitem = new ChecklistItem(item.id, item.key, item.complete === 1);
                        }

                        resolve(checklistitem);
                    });
            });
        });
    }

    public updateMessage(message: Message): Promise<any> {

        return new Promise(resolve => {

            this.openDb().then(() => {
                this.getMessage(message.key)
                    .then(m => {
                        let promise = null;

                        if (m.id == null) {

                            // Insert
                            let sql = `INSERT INTO message (key,shown,showAgain) VALUES (?,?,?)`;
                            promise = this.db.executeSql(sql, [message.key, message.shown ? 1 : 0, message.showAgain ? 1 : 0]).then(() => { resolve(); });

                        } else {

                            // Update
                            let sql = `UPDATE message 
                                    SET shown = ${message.shown ? 1 : 0},
                                    showAgain = ${message.showAgain ? 1 : 0}
                                    WHERE key = '${message.key}'`;
                            promise = this.db.executeSql(sql, {});
                        }

                        promise.then(() => { resolve(); });
                    });
            });

        });
    }

    public getMessage(key: string): Promise<Message> {

        return new Promise(resolve => {
            this.openDb().then(() => {
                this.db.executeSql(`SELECT id, key, shown, showAgain
                    FROM message
                    WHERE key = '${key}'`, {})
                    .then(data => {
                        let message = null;
                        if (data.res.rows.length > 0) {
                            let item = data.res.rows.item(0);
                            message = new Message(item.id, item.key, item.shown === 1, item.showAgain === 1);
                        } else {
                            message = new Message(null, key, false, true);
                        }

                        resolve(message);
                    });
            });

        });
    }

    public clearTestResults(): Promise<any> {
        return new Promise(resolve => {
            this.openDb().then(() => {
                this.db.executeSql(`DELETE FROM testResult`, {});
            }).then(() => {
                resolve();
            });
        });

    }

    public clearContentRead(): Promise<any> {
        return new Promise(resolve => {
            this.openDb().then(() => {
                this.db.executeSql(`DELETE FROM contentRead`, {}).then(() => {
                    resolve();
                });
            });
        });

    }

}

