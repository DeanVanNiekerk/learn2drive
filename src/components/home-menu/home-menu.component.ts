import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';

import {SettingsPage, AboutPage} from '../../pages';

@Component({
  templateUrl: './home-menu.component.html'
})
export class HomeMenuComponent {
  constructor(private navCtrl: NavController,
    private viewCtrl: ViewController) { }

  navigateToSettings() {

    this.navCtrl.push(SettingsPage).then(() => {
        this.viewCtrl.dismiss();
    });

  }

  navigateToAbout() {
    
    this.navCtrl.push(AboutPage).then(() => {
        this.viewCtrl.dismiss();
    });

  }
}