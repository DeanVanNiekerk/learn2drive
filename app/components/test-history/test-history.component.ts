import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

// Services
import {StoreService} from '../../services/store.service';

// Models
import {TestResult} from '../../models/test-result';

// Pipes
import {TranslatePipe} from '../../pipes/translate.pipe.ts';

@Component({
    pipes: [TranslatePipe],
    templateUrl: 'build/components/test-history/test-history.component.html'
})
export class TestHistoryComponent implements OnInit {

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
