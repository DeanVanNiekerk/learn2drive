import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

// Components
import {ContentComponent} from '../content/content.component';

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
   alert('todo');
  }

  navigateToSettings() {
    alert('todo');
  }

}
