import {Component, OnInit} from '@angular/core';
import {NavController, ViewController, NavParams, Alert} from 'ionic-angular';

// Services
import {QuestionService} from '../../services/question.service';
import {TestService} from '../../services/test.service';

// Models
import {Question} from '../../models/question';
import {Answer} from '../../models/answer';
import {AnsweredQuestion} from '../../models/answered-question';
import {TestResult} from '../../models/test-result';

// Components
import {QuestionComponent} from '../question/question.component';
import {TestResultComponent} from '../test-result/test-result.component';

// Pipes
import {TranslatePipe} from '../../pipes/translate.pipe.ts';

@Component({
    pipes: [TranslatePipe],
    directives: [QuestionComponent],
    templateUrl: 'build/components/test/test.component.html'
})
export class TestComponent implements OnInit {

  navigationKey: string = '';
  questions: Question[] = [];

  // AnsweredQuestion Index
  answeredQuestions: { [id: number]: AnsweredQuestion; } = {};

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private questionService: QuestionService,
    private testService: TestService) { 

      // Get the supplied navigation key
      this.navigationKey = navParams.get('navigationKey');
  }
 
  ngOnInit() {

    this.questionService.getQuestions(this.navigationKey)
      .then(questions => {
        this.questions = questions;
      });
  }

  answerChanged(answeredQuestion: AnsweredQuestion) {
    // Update index
    this.answeredQuestions[answeredQuestion.questionId] = answeredQuestion;
  }

  markTest() {
    
    let answeredQuestions = this.getAnsweredQuestionsList();
    
    if (answeredQuestions.length < this.questions.length) {
      // Show modal
      this.showMarkTestConfirmation();
      return;
    }

    this.navigateToTestResults();  
  }

  navigateToTestResults() {

    this.navCtrl.push(TestResultComponent, {
      questions: this.questions,
      answeredQuestions: this.getAnsweredQuestionsList()
    })
    .then(() => {
        // Remove itself from the nav stack, 
        // so that we go dont come back here after results
        let index = this.viewCtrl.index;
        this.navCtrl.remove(index);
    });

  }

  showMarkTestConfirmation() {

     let confirm = Alert.create({
      title: 'Hold up!',
      message: 'Not all questions have been answered, are you sure you want to mark the test?',
      buttons: [
        {
          text: 'No',
          handler: () => { }
        },
        {
          text: 'Yes',
          handler: () => {
            this.navigateToTestResults();
          }
        }
      ]
    });

    this.navCtrl.present(confirm);

  }

  getAnsweredQuestionsList(): AnsweredQuestion[] {

    let answeredQuestions: AnsweredQuestion[] = [];
    for (var questionId in this.answeredQuestions) {
        answeredQuestions.push(this.answeredQuestions[questionId]);
    }
    return answeredQuestions;
  }
}
