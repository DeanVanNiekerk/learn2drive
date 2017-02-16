import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {TestService, StoreService, AdService} from '../../services';
import {TestResultQuestionsComponent} from '../../components';
import {Question, Answer, AnsweredQuestion, MockTestResult} from '../../models';

@Component({
    templateUrl: './mock-test-result.html'
})
export class MockTestResultPage implements OnInit {

  questionsA: Question[] = [];
  questionsB: Question[] = [];
  questionsC: Question[] = [];

  answeredQuestionsA: AnsweredQuestion[] = [];
  answeredQuestionsB: AnsweredQuestion[] = [];
  answeredQuestionsC: AnsweredQuestion[] = [];

  testPassed: boolean = null;

  result: MockTestResult;

  constructor(private navParams: NavParams,
    private testService: TestService,
    private storeService: StoreService,
    private adService: AdService) { 

      this.questionsA = navParams.get('questionsA');
      this.questionsB = navParams.get('questionsB');
      this.questionsC = navParams.get('questionsC');

      this.answeredQuestionsA = navParams.get('answerQuestionListA');
      this.answeredQuestionsB = navParams.get('answerQuestionListB');
      this.answeredQuestionsC = navParams.get('answerQuestionListC');
  }
 
  ngOnInit() {

    this.result = this.testService.markTestMock(this.questionsA, this.answeredQuestionsA,
                                                  this.questionsB, this.answeredQuestionsB,
                                                  this.questionsC, this.answeredQuestionsC);

    this.testPassed = this.result.passed();

    this.storeService.insertMockTestResult(this.result);

    this.adService.showInterstitial();
  }
}
