import {Component, OnInit, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

// Services
import {ContentService} from '../../services/content.service';
import {StateService} from '../../services/state.service';

// Models
import {NavigationItem} from '../../models/navigation-item';
import {Content} from '../../models/content';

// Pipes
import {TranslatePipe} from '../../pipes/translate.pipe.ts';

// Components
import {LearnComponent} from '../learn/learn.component';
import {TestComponent} from '../test/test.component';
import {NavigatorComponent} from '../navigator/navigator.component';

@Component({
  pipes: [TranslatePipe],
  directives: [TestComponent, LearnComponent, NavigatorComponent],
  templateUrl: 'build/components/content/content.component.html'
})
export class ContentComponent implements OnInit {

  navigationKey: string = 'rootNavigation.learner';
  navigationItems: NavigationItem[] = [];

  @ViewChild(LearnComponent) learnComponent: LearnComponent;
  @ViewChild(TestComponent) testComponent: TestComponent;
  @ViewChild(NavigatorComponent) navigatorComponent: NavigatorComponent;

  mode: string = '';

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private contentService: ContentService,
    private stateService: StateService) {

      // Get the supplied navigation key, if not supply use default
      var navigationItem = navParams.get('navigationItem');
      if (navigationItem)
        this.navigationKey = navigationItem.key;
  }

  ngOnInit() {
    this.navigatorComponent.load(this.navigationKey);
    this.learnComponent.load(this.navigationKey);  
    this.testComponent.load(this.navigationKey);

    this.mode = this.stateService.getCurrentMode();
    this.stateService.mode.subscribe(mode => {
      this.mode = mode;
    });
  }

  toggleMode() {
    this.stateService.toggleMode();
  }

  isInLearnMode() {
    return this.mode === this.stateService.MODE_LEARN;
  }

  isInTestMode() {
    return this.mode === this.stateService.MODE_TEST;
  }

}
