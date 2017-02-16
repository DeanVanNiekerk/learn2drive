

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
import {NavController, ViewController, NavParams, AlertController, LoadingController} from 'ionic-angular';

import {QuestionService, TestService, AdService} from '../../services';
import {Question, Answer, AnsweredQuestion, TestResult} from '../../models';
import {QuestionComponent} from '../../components';
import {MockTestResultPage} from '../';



@Component({
  templateUrl: './mock-test.html'
})
export class MockTestPage implements OnInit {

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
              private loadingCtrl: LoadingController,
              private questionService: QuestionService,
              private testService: TestService,
              private adService: AdService) {
  }

  ngOnInit() {

      this.viewCtrl.showBackButton(false);

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

      this.adService.prepareInterstitial();

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

    this.adService.showInterstitial();

    this.navCtrl.push(MockTestResultPage, {
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

  navigateBack() {

    let answeredQuestions = this.getAnsweredQuestionsList(this.answeredQuestionsA).length
                              + this.getAnsweredQuestionsList(this.answeredQuestionsB).length
                              + this.getAnsweredQuestionsList(this.answeredQuestionsC).length;
    
    if (answeredQuestions > 0) {
      // Show modal
      this.showNavigateBackConfirmation();
      return;
    }

    this.navCtrl.pop();
  }

  showNavigateBackConfirmation() {

     let confirmAlert = this.alertCtrl.create({
      title: 'Hold up!',
      message: 'Are you sure you want to quit writing this test?',
      buttons: [
        {
          text: 'No',
          handler: () => { }
        },
        {
          text: 'Yes',
          handler: () => {
            this.navCtrl.pop();
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
