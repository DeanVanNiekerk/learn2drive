import {Component, OnInit, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {ContentService, StoreService, QuestionService} from '../../services';
import {NavigationItem, Content, TestResult} from '../../models';
import {LearnComponent, NavigatorComponent} from '../../components';
import {TestPage, TestHistoryPage} from '../../pages';


@Component({
  templateUrl: './content.html'
})
export class ContentPage implements OnInit {

  navigationKey: string = '';
  lastTestResult: TestResult = null;
  noTestWrittenForSection: boolean = false;
  sectionHasTestQuestions: boolean = false;
  
  @ViewChild(LearnComponent) learnComponent: LearnComponent;
  @ViewChild(NavigatorComponent) navigatorComponent: NavigatorComponent;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private contentService: ContentService,
    private storeService: StoreService,
    private questionService: QuestionService) {

    // Get the supplied navigation key, if not supply use default
    this.navigationKey = navParams.get('navigationKey');
  }

  ionViewDidEnter() {
    this.navigatorComponent.load(this.navigationKey);
    this.loadLastTestResult();
  }

  ngOnInit() {
    this.learnComponent.load(this.navigationKey);

    this.questionService.hasQuestions(this.navigationKey)
      .then(hasQuestions => {
        this.sectionHasTestQuestions = hasQuestions;
      }
    );
  }

  loadLastTestResult() {
    this.storeService.getLatestTestResult(this.navigationKey)
      .then(testResult => {
          this.lastTestResult = testResult;
          this.noTestWrittenForSection = testResult ? false : true;
      });
  }

  startTest() {
    this.navCtrl.push(TestPage, {
      navigationKey: this.navigationKey
    });
  }

  navigateToTestHistory() {
    this.navCtrl.push(TestHistoryPage, {
      navigationKey: this.navigationKey
    });
  }
}