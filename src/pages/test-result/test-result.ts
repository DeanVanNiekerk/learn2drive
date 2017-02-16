import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

// Services
import {StoreService, AdService, TestService} from '../../services';

// Components
import {TestResultQuestionsComponent} from '../../components';

// Models
import {Question, Answer, AnsweredQuestion, TestResult} from '../../models';

@Component({
    templateUrl: './test-result.html'
})
export class TestResultPage implements OnInit {

  navigationKey: string = '';
  questions: Question[] = [];
  answeredQuestions: AnsweredQuestion[] = [];

  resultPercent: number = null;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private testService: TestService,
    private storeService: StoreService,
    private adService: AdService) { 

      this.navigationKey = navParams.get('navigationKey');
      this.questions = navParams.get('questions');
      this.answeredQuestions = navParams.get('answeredQuestions');

  }
 
  ngOnInit() {

    let result = this.testService.markTest(this.navigationKey, this.questions, this.answeredQuestions);
    this.resultPercent = result.resultPercent();

    this.storeService.insertTestResult(result);

    this.adService.showInterstitial();

  }
}
