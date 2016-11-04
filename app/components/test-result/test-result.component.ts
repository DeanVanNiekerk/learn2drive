import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

// Services
import {TestService} from '../../services/test.service';
import {StoreService} from '../../services/store.service';

// Components
import {TestResultQuestionsComponent} from '../test-result-questions/test-result-questions.component';

// Models
import {Question} from '../../models/question';
import {Answer} from '../../models/answer';
import {AnsweredQuestion} from '../../models/answered-question';
import {TestResult} from '../../models/test-result';

@Component({
    directives: [TestResultQuestionsComponent],
    templateUrl: 'build/components/test-result/test-result.component.html'
})
export class TestResultComponent implements OnInit {

  navigationKey: string = '';
  questions: Question[] = [];
  answeredQuestions: AnsweredQuestion[] = [];

  resultPercent: number = null;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private testService: TestService,
    private storeService: StoreService) { 

      this.navigationKey = navParams.get('navigationKey');
      this.questions = navParams.get('questions');
      this.answeredQuestions = navParams.get('answeredQuestions');

  }
 
  ngOnInit() {

    let result = this.testService.markTest(this.navigationKey, this.questions, this.answeredQuestions);
    this.resultPercent = result.resultPercent();

    this.storeService.insertTestResult(result);

  }
}
