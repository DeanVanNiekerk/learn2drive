import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';

// Components
import {SettingsComponent} from '../settings/settings.component';
import {AboutComponent} from '../about/about.component';

@Component({
  templateUrl: 'build/components/home-menu/home-menu.component.html'
})
export class HomeMenuComponent {
  constructor(private navCtrl: NavController,
    private viewCtrl: ViewController) { }

  navigateToSettings() {

    this.navCtrl.push(SettingsComponent).then(() => {
        this.viewCtrl.dismiss();
    });

  }

  navigateToAbout() {
    
    this.navCtrl.push(AboutComponent).then(() => {
        this.viewCtrl.dismiss();
    });

  }
}