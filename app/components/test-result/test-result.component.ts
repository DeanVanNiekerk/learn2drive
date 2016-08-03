import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

// Services
import {TestService} from '../../services/test.service';

// Models
import {Question} from '../../models/question';
import {AnsweredQuestion} from '../../models/answered-question';
import {TestResult} from '../../models/test-result';

@Component({
    templateUrl: 'build/components/test-result/test-result.component.html'
})
export class TestResultComponent implements OnInit {

  navigationKey: string = '';
  questions: Question[] = [];
  answeredQuestions: AnsweredQuestion[] = [];

  resultPercent: number = null;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private testService: TestService) { 

      this.questions = navParams.get('questions');
      this.answeredQuestions = navParams.get('answeredQuestions');

  }
 
  ngOnInit() {

    let result = this.testService.markTest(this.questions, this.answeredQuestions);
    this.resultPercent = result.resultPercent;

  }

}
