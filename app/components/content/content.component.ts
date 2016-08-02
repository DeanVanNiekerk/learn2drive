import {Component, OnInit, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

// Services
import {ContentService} from '../../services/content.service';

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
  directives: [LearnComponent, NavigatorComponent],
  templateUrl: 'build/components/content/content.component.html'
})
export class ContentComponent implements OnInit {

  navigationKey: string = '';
  
  @ViewChild(LearnComponent) learnComponent: LearnComponent;
  @ViewChild(NavigatorComponent) navigatorComponent: NavigatorComponent;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private contentService: ContentService) {

      // Get the supplied navigation key, if not supply use default
      this.navigationKey = navParams.get('navigationKey');
      if(!this.navigationKey)
        this.navigationKey = 'rootNavigation.learner';
  }

  ngOnInit() {
    console.log(this.navigationKey);
    this.navigatorComponent.load(this.navigationKey);
    this.learnComponent.load(this.navigationKey);  
  }

  startTest() {
    this.navCtrl.push(TestComponent, {
      navigationKey: this.navigationKey
    });
  }

}
