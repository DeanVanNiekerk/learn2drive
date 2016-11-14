import {Component, OnInit, Input} from '@angular/core';
import {NavController} from 'ionic-angular';

// Services
import {StoreService} from '../../services/store.service';

// Models
import {TestResult} from '../../models/test-result';

@Component({
  selector: 'last-test-result',
  templateUrl: 'build/components/last-test-result/last-test-result.component.html'
})
export class LastTestResultComponent implements OnInit {

  @Input() navigationKey: string = '';
  result: string = '';
  
  constructor(private navCtrl: NavController,
    private storeService: StoreService) { }

  ngOnInit() {
      this.loadLastTestResult();
  }

  loadLastTestResult() {
    this.storeService.getLatestTestResult(this.navigationKey)
      .then(testResult => {
          if (testResult)
            this.result = `${testResult.resultPercent()}%`;
      });
  }

}