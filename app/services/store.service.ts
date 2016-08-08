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
        this.createScheme();
        
    }

    createScheme() {
        // Create the tests results table
        this.storage.query(`CREATE TABLE IF NOT EXISTS 
                                testResult (
                                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                                    navigationKey TEXT, 
                                    resultPercent INTEGER,
                                    dateCreated INTEGER
                                )`);
    }

    addTestResult(testResult: TestResult): Promise<any> {
        let sql = `INSERT INTO testResult (navigationKey,resultPercent,dateCreated) VALUES (?,?,strftime('%s','now'))`;
        return this.storage.query(sql, [testResult.navigationKey, testResult.resultPercent]);
    }

    getLatestTestResult(navigationKey: string): Promise<TestResult> {

        return new Promise(resolve => {

            this.storage.query(`SELECT navigationKey,resultPercent,dateCreated 
                                    FROM testResult
                                    ORDER BY dateCreated DESC 
                                    LIMIT 1`)
                .then(data => {
                        
                    let testResult = null;
                    if (data.res.rows.length > 0) {
                        let item = data.res.rows.item(0);
                        testResult = new TestResult(item.navigationKey, item.resultPercent);
                    }
                    resolve(testResult);

                });
        });
    }

    getTestResults(navigationKey: string): Promise<TestResult[]> {

        return new Promise(resolve => {

            this.storage.query(`SELECT navigationKey,resultPercent,dateCreated FROM testResult`)
                .then(data => {
                        
                    let testResults = [];
                    if (data.res.rows.length > 0) {
                        for (var i = 0; i < data.res.rows.length; i++) {
                            let item = data.res.rows.item(i);
                            testResults.push(new TestResult(item.navigationKey, item.resultPercent));
                        }
                    }
                    resolve(testResults);

                });
        });
    }

    dropAllTables() {
        this.storage.query(`DROP TABLE IF EXISTS testResult`);
    }

}