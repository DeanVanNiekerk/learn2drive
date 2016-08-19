import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

// Components
import {ContentComponent} from '../content/content.component';
import {SettingsComponent} from '../settings/settings.component';
import {MockTestComponent} from '../mock-test/mock-test.component';


@Component({
  templateUrl: 'build/components/home/home.component.html'
})
export class HomeComponent {

  constructor(private navCtrl: NavController) {
  }

  navigateToContent() {
    this.navCtrl.push(ContentComponent, {
      navigationKey: 'rootNavigation.learner'
    });
  }

  navigateToMockTest() {
   this.navCtrl.push(MockTestComponent);
  }

  navigateToSettings() {
    this.navCtrl.push(SettingsComponent);
  }

}
