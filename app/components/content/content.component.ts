import {Component, OnInit, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

// Services
import {ContentService} from '../../services/content.service';
import {StoreService} from '../../services/store.service';

// Models
import {NavigationItem} from '../../models/navigation-item';
import {Content} from '../../models/content';
import {TestResult} from '../../models/test-result';

// Pipes
import {TranslatePipe} from '../../pipes/translate.pipe.ts';

// Components
import {LearnComponent} from '../learn/learn.component';
import {TestComponent} from '../test/test.component';
import {NavigatorComponent} from '../navigator/navigator.component';

@Component({
  pipes: [TranslatePipe],
  directives: [LearnComponent, NavigatorComponent],
  templateUrl: 'build/components/content/content.component.html'
})
export class ContentComponent implements OnInit {

  navigationKey: string = '';
  lastTestResult: TestResult = null;
  
  @ViewChild(LearnComponent) learnComponent: LearnComponent;
  @ViewChild(NavigatorComponent) navigatorComponent: NavigatorComponent;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private contentService: ContentService,
    private storeService: StoreService) {

    // Get the supplied navigation key, if not supply use default
    this.navigationKey = navParams.get('navigationKey');
  }

  ngOnInit() {
    this.navigatorComponent.load(this.navigationKey);
    this.learnComponent.load(this.navigationKey);  

    this.navCtrl.viewDidEnter.subscribe((view) => {
      this.loadLastTestResult();
    });
  }

  loadLastTestResult() {
    this.storeService.getLatestTestResult(this.navigationKey)
      .then(testResult => {
          this.lastTestResult = testResult;
      });
  }

  startTest() {
    this.navCtrl.push(TestComponent, {
      navigationKey: this.navigationKey
    });
  }
}