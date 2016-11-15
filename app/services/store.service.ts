import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import {Storage, SqlStorage} from 'ionic-angular';

// Models
import {TestResult} from '../models/test-result';
import {MockTestResult} from '../models/mock-test-result';
import {ChecklistItem} from '../models/checklist-item';
import {Message} from '../models/message';

@Injectable()
export class StoreService {

    private storage: Storage = null;

    MOCK_TEST_PASS_TARGET: number = 3;

    // Init an empty DB if it does not exist by now!
    constructor() {
        this.storage = new Storage(SqlStorage, { name: 'l2d3ddatabase' });
        this.createTables();
    }

    createTables() {
        // Create the tests results table
        this.storage.query(`CREATE TABLE IF NOT EXISTS 
                                testResult (
                                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                                    navigationKey TEXT, 
                                    totalQuestions INTEGER,
                                    correctAnswers INTEGER,
                                    testDate TEXT
                                )`);

        this.storage.query(`CREATE TABLE IF NOT EXISTS 
                                mockTestResult (
                                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                                    sectionAPassed INTEGER,
                                    sectionBPassed INTEGER,
                                    sectionCPassed INTEGER,
                                    testDate TEXT
                                )`);

        this.storage.query(`CREATE TABLE IF NOT EXISTS 
                                contentRead (
                                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                                    navigationKey TEXT, 
                                    readDate TEXT
                                )`);

        this.storage.query(`CREATE TABLE IF NOT EXISTS 
                                checklist (
                                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                                    key TEXT, 
                                    complete INTEGER
                                )`);

        this.storage.query(`CREATE TABLE IF NOT EXISTS 
                                message (
                                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                                    key TEXT,
                                    shown INTEGER, 
                                    showAgain INTEGER
                                )`);
    }

    dropTables() {
        this.storage.query(`DROP TABLE IF EXISTS testResult`);
        this.storage.query(`DROP TABLE IF EXISTS mockTestResult`);
        this.storage.query(`DROP TABLE IF EXISTS contentRead`);
        this.storage.query(`DROP TABLE IF EXISTS checklist`);
        this.storage.query(`DROP TABLE IF EXISTS message`);
    }

    insertContentRead(navigationKey: string): Promise<any> {
        let sql = `INSERT INTO contentRead (navigationKey,readDate) 
                    VALUES (?,?)`;
        return this.storage.query(sql, [navigationKey, new Date().getTime()]);
    }

    getContentReadCount(navigationKey: string): Promise<number> {

        return new Promise(resolve => {
            this.storage.query(`SELECT COUNT(DISTINCT navigationKey) AS count
                                FROM contentRead 
                                WHERE navigationKey LIKE ('${navigationKey}%')`)
                .then(data => {
                    resolve(data.res.rows.item(0).count);
                });
        });
    }

    insertTestResult(testResult: TestResult): Promise<any> {
        let sql = `INSERT INTO testResult (navigationKey,totalQuestions,correctAnswers,testDate) 
                    VALUES (?,?,?,?)`;
        return this.storage.query(sql, [testResult.navigationKey, testResult.totalQuestions, testResult.correctAnswers, new Date().getTime()]);
    }

    getLatestTestResult(navigationKey: string): Promise<TestResult> {

        return new Promise(resolve => {

            this.storage.query(`SELECT navigationKey,totalQuestions,correctAnswers,testDate 
                                    FROM testResult
                                    WHERE navigationKey = '${navigationKey}'
                                    ORDER BY testDate DESC
                                    LIMIT 1`)
                .then(data => {
                    let testResults = this.mapTestResults(data);
                    resolve(testResults[0]);
                });
        });
    }

    getTestResults(navigationKey: string): Promise<TestResult[]> {

        return new Promise(resolve => {

            this.storage.query(`SELECT navigationKey,totalQuestions,correctAnswers,testDate
                                    FROM testResult
                                    WHERE navigationKey = '${navigationKey}'
                                    ORDER BY testDate DESC`)
                .then(data => {
                    let testResults = this.mapTestResults(data);
                    resolve(testResults);
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

    getTestSectionsPassed(): Promise<Array<string>> {

        return new Promise(resolve => {

            this.storage.query(`SELECT DISTINCT navigationKey
                                    FROM testResult
                                    WHERE totalQuestions = correctAnswers`)
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

    }

    insertMockTestResult(result: MockTestResult): Promise<any> {
        let sql = `INSERT INTO mockTestResult (sectionAPassed,sectionBPassed,sectionCPassed,testDate) 
                    VALUES (?,?,?,?)`;
        return this.storage.query(sql, [result.sectionAPassed() ? 1 : 0, result.sectionAPassed() ? 1 : 0, result.sectionAPassed() ? 1 : 0, new Date().getTime()]);
    }

    getMockTestsPassed(): Promise<number> {

        return new Promise(resolve => {

            this.storage.query(`SELECT COUNT(*) AS count
                                    FROM mockTestResult
                                    WHERE sectionAPassed = 1
                                    AND sectionBPassed = 1
                                    AND sectionCPassed = 1`)
                .then(data => {
                    resolve(data.res.rows.item(0).count);
                });
        });

    }

    updateChecklistItem(key: string, complete: boolean): Promise<any> {
        
         return new Promise(resolve => {

            this.getChecklistItem(key)
                .then(item => {
                    let promise = null;
                    
                    if (item == null) {
                        
                        // Insert
                        let sql = `INSERT INTO checklist (key,complete) VALUES (?,?)`;
                        promise = this.storage.query(sql, [key, complete ? 1 : 0]).then(() => { resolve(); });
                        
                    } else {
                        
                        // Update
                        let sql = `UPDATE checklist 
                                    SET complete = ${complete ? 1 : 0}
                                    WHERE key = '${key}'`;
                        promise = this.storage.query(sql)
                    }

                    promise.then(() => { resolve(); });
                });
        });
    }

    getCompleteChecklistItemCount(): Promise<number> {
        
         return new Promise(resolve => {

            this.storage.query(`SELECT COUNT(*) AS count
                                    FROM checklist
                                    WHERE complete = 1`)
                .then(data => {
                    let count = 0;
                    if (data.res.rows.length > 0) {
                        let item = data.res.rows.item(0);
                        count = item.count;
                    }
                    resolve(count);
                });
        });
    }
    

    getChecklistItem(key: string): Promise<ChecklistItem> {

         return new Promise(resolve => {

            this.storage.query(`SELECT id, key, complete
                    FROM checklist
                    WHERE key = '${key}'`)
                .then(data => {
                    let checklistitem = null;
                    if (data.res.rows.length > 0) {
                        let item = data.res.rows.item(0);
                        checklistitem = new ChecklistItem(item.id, item.key, item.complete === 1);
                    }
                    
                    resolve(checklistitem);
                });
        });
    }

    updateMessage(message: Message): Promise<any> {
        
         return new Promise(resolve => {

            this.getMessage(message.key)
                .then(m => {
                    let promise = null;
                    
                    if (m.id == null) {
                        
                        // Insert
                        let sql = `INSERT INTO message (key,shown,showAgain) VALUES (?,?,?)`;
                        promise = this.storage.query(sql, [message.key, message.shown ? 1 : 0, message.showAgain ? 1 : 0]).then(() => { resolve(); });
                        
                    } else {
                        
                        // Update
                        let sql = `UPDATE message 
                                    SET shown = ${message.shown ? 1 : 0},
                                    showAgain = ${message.showAgain ? 1 : 0}
                                    WHERE key = '${message.key}'`;
                        promise = this.storage.query(sql);
                    }

                    promise.then(() => { resolve(); });
                });
        });
    }

    getMessage(key: string): Promise<Message> {

         return new Promise(resolve => {

            this.storage.query(`SELECT id, key, shown, showAgain
                    FROM message
                    WHERE key = '${key}'`)
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
    }

    clearTestResults(): Promise<any> {
        return this.storage.query(`DELETE FROM testResult`);
    }

    clearContentRead(): Promise<any> {
        return this.storage.query(`DELETE FROM contentRead`);
    }

}

