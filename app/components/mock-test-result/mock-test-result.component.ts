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
import {MockTestResult} from '../../models/mock-test-result';

@Component({
    directives: [TestResultQuestionsComponent],
    templateUrl: 'build/components/mock-test-result/mock-test-result.component.html'
})
export class MockTestResultComponent implements OnInit {

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
    private storeService: StoreService) { 

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
  }
}
