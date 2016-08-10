import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import {Storage, SqlStorage} from 'ionic-angular';

import {TestResult} from '../models/test-result';

@Injectable()
export class StoreService {

    private storage: Storage = null;
 
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
                                    resultPercent INTEGER,
                                    testDate TEXT
                                )`);
    }

    dropTables() {
        this.storage.query(`DROP TABLE IF EXISTS testResult`);
    }

    addTestResult(testResult: TestResult): Promise<any> {
        let sql = `INSERT INTO testResult (navigationKey,resultPercent,testDate) 
                    VALUES (?,?,?)`;
        return this.storage.query(sql, [testResult.navigationKey, testResult.resultPercent, new Date().getTime()]);
    }

    getLatestTestResult(navigationKey: string): Promise<TestResult> {

        return new Promise(resolve => {

            this.storage.query(`SELECT navigationKey,resultPercent,testDate 
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

            this.storage.query(`SELECT navigationKey,resultPercent,testDate
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
                testResults.push(new TestResult(item.navigationKey, item.resultPercent, new Date(parseInt(item.testDate))));
            }
        }
        return testResults;
    }

    clearTestResults() {
        this.storage.query(`DELETE FROM testResult`);
    }

}