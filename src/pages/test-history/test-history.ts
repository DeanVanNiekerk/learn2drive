import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';


import {StoreService} from '../../services';
import {TestResult} from '../../models';

@Component({
    templateUrl: './test-history.html'
})
export class TestHistoryPage implements OnInit {

  navigationKey: string = '';
  testResults: TestResult[] = [];

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private storeService: StoreService) { 

      this.navigationKey = navParams.get('navigationKey');
  }
 
  ngOnInit() {
      this.storeService.getTestResults(this.navigationKey)
        .then(testResults => {
            this.testResults = testResults;
        });
  }

}
