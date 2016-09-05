import {Component, OnInit} from '@angular/core';
import {NavController, ViewController, NavParams, AlertController} from 'ionic-angular';

// Services
import {QuestionService} from '../../services/question.service';
import {TestService} from '../../services/test.service';
import {StoreService} from '../../services/store.service';
import {ResourceService} from '../../services/resource.service';

// Models
import {Question} from '../../models/question';
import {Answer} from '../../models/answer';
import {AnsweredQuestion} from '../../models/answered-question';
import {TestResult} from '../../models/test-result';
import {Message} from '../../models/message';

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

  testInformationMessageKey: string = 'TestInformation';

  // AnsweredQuestion Index
  answeredQuestions: { [id: number]: AnsweredQuestion; } = {};

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private questionService: QuestionService,
    private testService: TestService,
    private storeService: StoreService,
    private resourceService: ResourceService) { 

      // Get the supplied navigation key
      this.navigationKey = navParams.get('navigationKey');
  }
 
  ngOnInit() {

    this.questionService.getQuestions(this.navigationKey)
      .then(questions => {
        this.questions = questions;
      });

    this.storeService.getMessage(this.testInformationMessageKey)
      .then(message => {
          if (message.showAgain === true) 
            this.showTestInformation(message);
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
      navigationKey: this.navigationKey,
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

  showTestInformation(message: Message) {

    this.resourceService.getResource(this.navigationKey)
    .then(sectionName => {

      let infoAlert = this.alertCtrl.create({
        title: 'Information',
        message: `This test contains a set of questions <b>randomly</b> drawn from the <b>'${sectionName}'</b> section. 
                    <br/><br/>Tests will contain a maximum of 10 questions.`,
        inputs: [
        {
          name: 'show-again',
          label: 'Show this message again?',
          checked: true,
          type: 'checkbox'
        }
        ],
        buttons: [
          {
            text: 'Okay',
            handler: data => {
              let showAgain = data.length === 1;
              message.showAgain = showAgain;
              message.shown = true;
              this.storeService.updateMessage(message);
            }
          }
        ]
      });

      infoAlert.present();
      
    });

  }

  showMarkTestConfirmation() {

     let confirmAlert = this.alertCtrl.create({
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

    confirmAlert.present();
  }

  getAnsweredQuestionsList(): AnsweredQuestion[] {

    let answeredQuestions: AnsweredQuestion[] = [];
    for (var questionId in this.answeredQuestions) {
        answeredQuestions.push(this.answeredQuestions[questionId]);
    }
    return answeredQuestions;
  }
}
