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
    templateUrl: 'build/components/mock-test-result/mock-test-result.component.html'
})
export class MockTestResultComponent implements OnInit {

  questionsA: Question[] = [];
  questionsB: Question[] = [];
  questionsC: Question[] = [];

  answeredQuestionsA: AnsweredQuestion[] = [];
  answeredQuestionsB: AnsweredQuestion[] = [];
  answeredQuestionsC: AnsweredQuestion[] = [];

  resultPercent: number = null;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
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

    //let result = this.testService.markTest(this.navigationKey, this.questions, this.answeredQuestions);
    //this.resultPercent = result.resultPercent;

    //this.storeService.insertTestResult(result);

  }
}
