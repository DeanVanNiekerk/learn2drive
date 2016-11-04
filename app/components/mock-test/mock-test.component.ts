

// <xsl:variable name="numCorrectSectionA" select="count(//testAnswer[responseId=correctResponseId]/questionParentId[substring(., 1, string-length('rootNavigation.learner.vehicleControls'))='rootNavigation.learner.vehicleControls'])"/>
//   <xsl:apply-templates select="//testAnswer[1]" mode="mockTestResult">
//   <xsl:with-param name="heading" select="'SECTION A'"/>
//   <xsl:with-param name="numQuestions" select="8"/>
//   <xsl:with-param name="passMark" select="7"/>
//   <xsl:with-param name="numCorrect" select="$numCorrectSectionA" />
//   </xsl:apply-templates>
//
// <xsl:variable name="numCorrectSectionB" select="count(//testAnswer[responseId=correctResponseId]/questionParentId[substring(., 1, string-length('rootNavigation.learner.rulesOfTheRoad'))='rootNavigation.learner.rulesOfTheRoad'    or     substring(., 1, string-length('rootNavigation.learner.defensiveDriving'))='rootNavigation.learner.defensiveDriving'    or    substring(., 1, string-length('rootNavigation.learner.roadSignals'))='rootNavigation.learner.roadSignals'])"/>
//   <xsl:apply-templates select="//testAnswer[1]" mode="mockTestResult">
//   <xsl:with-param name="heading" select="'SECTION B'"/>
//   <xsl:with-param name="numQuestions" select="28"/>
//   <xsl:with-param name="passMark" select="23"/>
//   <xsl:with-param name="numCorrect" select="$numCorrectSectionB" />
//   </xsl:apply-templates>
//
// <xsl:variable name="numCorrectSectionC" select="count(//testAnswer[responseId=correctResponseId]/questionParentId[substring(., 1, string-length('rootNavigation.learner.signs'))='rootNavigation.learner.signs'    or    substring(., 1, string-length('rootNavigation.learner.roadMarkings'))='rootNavigation.learner.roadMarkings'])"/>
//   <xsl:apply-templates select="//testAnswer[1]" mode="mockTestResult">
//   <xsl:with-param name="heading" select="'SECTION C'"/>
//   <xsl:with-param name="numQuestions" select="28"/>
//   <xsl:with-param name="passMark" select="24"/>
//   <xsl:with-param name="numCorrect" select="$numCorrectSectionC" />
//   </xsl:apply-templates>
//
// <xsl:variable name="count" select="64"/>
//   <xsl:variable name="mark" select="$numCorrectSectionA + $numCorrectSectionB + $numCorrectSectionC"/>
//   <xsl:variable name="average" select="$mark div $count * 100"/>
//   <xsl:variable name="passed" select="$numCorrectSectionA &gt;= 7 and $numCorrectSectionB &gt;= 23 and $numCorrectSectionC &gt;= 24"/>


import {Component, OnInit} from '@angular/core';
import {NavController, ViewController, NavParams, AlertController} from 'ionic-angular';

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
import {MockTestResultComponent} from '../mock-test-result/mock-test-result.component';

// Pipes
import {TranslatePipe} from '../../pipes/translate.pipe.ts';

@Component({
  pipes: [TranslatePipe],
  directives: [QuestionComponent],
  templateUrl: 'build/components/mock-test/mock-test.component.html'
})
export class MockTestComponent implements OnInit {

  questionsA: Question[] = [];
  questionsB: Question[] = [];
  questionsC: Question[] = [];

  questionCountA: number = 8;
  questionCountB: number = 28;
  questionCountC: number = 28;

  // AnsweredQuestion Dictionaries
  answeredQuestionsA: { [id: number]: AnsweredQuestion; } = {};
  answeredQuestionsB: { [id: number]: AnsweredQuestion; } = {};
  answeredQuestionsC: { [id: number]: AnsweredQuestion; } = {};

  constructor(private navCtrl: NavController,
              private viewCtrl: ViewController,
              private alertCtrl: AlertController,
              private questionService: QuestionService,
              private testService: TestService) {
  }

  ngOnInit() {

      this.questionService.getQuestions('rootNavigation.learner.vehicleControls', this.questionCountA)
      .then(questions => {
        this.questionsA = questions;
      });

      this.questionService.getQuestionsByKeys(
         ['rootNavigation.learner.rulesOfTheRoad', 
          'rootNavigation.learner.defensiveDriving', 
          'rootNavigation.learner.roadSignals'], this.questionCountB)
      .then(questions => {
        this.questionsB = questions;
      });

      this.questionService.getQuestionsByKeys(
         ['rootNavigation.learner.signs', 
          'rootNavigation.learner.defensiveDriving', 
          'rootNavigation.learner.roadMarkings'], this.questionCountC)
      .then(questions => {
        this.questionsC = questions;
      });

  }

  answerChangedA(answeredQuestion: AnsweredQuestion) {
    this.answeredQuestionsA[answeredQuestion.questionId] = answeredQuestion;
  }

  answerChangedB(answeredQuestion: AnsweredQuestion) {
    this.answeredQuestionsB[answeredQuestion.questionId] = answeredQuestion;
  }

  answerChangedC(answeredQuestion: AnsweredQuestion) {
    this.answeredQuestionsC[answeredQuestion.questionId] = answeredQuestion;
  }


  markTest() {

    let totalQuestions = this.questionCountA +
                            this.questionCountB + 
                            this.questionCountC;

    let answerQuestionListA = this.getAnsweredQuestionsList(this.answeredQuestionsA);
    let answerQuestionListB = this.getAnsweredQuestionsList(this.answeredQuestionsB);
    let answerQuestionListC = this.getAnsweredQuestionsList(this.answeredQuestionsC);

    let totalAnsweredQuestions = answerQuestionListA.length +
                                  answerQuestionListB.length + 
                                  answerQuestionListC.length;

    if (totalAnsweredQuestions < totalQuestions) {
      // Show modal
      this.showMarkTestConfirmation(answerQuestionListA, answerQuestionListB, answerQuestionListC);
      return;
    }

    this.navigateToTestResults(answerQuestionListA, answerQuestionListB, answerQuestionListC);
  }

  navigateToTestResults(answerQuestionListA: AnsweredQuestion[], answerQuestionListB: AnsweredQuestion[], answerQuestionListC: AnsweredQuestion[]) {

    this.navCtrl.push(MockTestResultComponent, {
      questionsA: this.questionsA,
      questionsB: this.questionsB,
      questionsC: this.questionsC,
      answerQuestionListA: answerQuestionListA,
      answerQuestionListB: answerQuestionListB,
      answerQuestionListC: answerQuestionListC
    })
      .then(() => {
        // Remove itself from the nav stack,
        // so that we go dont come back here after results
        let index = this.viewCtrl.index;
        this.navCtrl.remove(index);
      });

  }

  showMarkTestConfirmation(answerQuestionListA: AnsweredQuestion[], answerQuestionListB: AnsweredQuestion[], answerQuestionListC: AnsweredQuestion[]) {

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
            this.navigateToTestResults(answerQuestionListA, answerQuestionListB, answerQuestionListC);
          }
        }
      ]
    });

    confirmAlert.present();
  }

  getAnsweredQuestionsList(dictionary): AnsweredQuestion[] {

    let answeredQuestions: AnsweredQuestion[] = [];
    for (var questionId in dictionary) {
      answeredQuestions.push(dictionary[questionId]);
    }
    return answeredQuestions;
  }
  
}
