import {Component,OnInit} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';

import {NavigationItem} from '../../models/navigation-item'
import {NavigationService} from '../../services/navigation-service';

import {TranslatePipe} from '../../pipes/translate-pipe.ts';

@Component({
  pipes: [TranslatePipe],
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage implements OnInit {

  navigationKey:string = "rootNavigation.learner";
  navigationItems: NavigationItem[] = [];

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private navigationService: NavigationService) {
      var navigationItem = navParams.get("navigationItem");
      if(navigationItem)
        this.navigationKey = navigationItem.key;
  }

  ngOnInit() {
  	this.navigationService
      .getNavigationItems(this.navigationKey)
      .then(items => { 
        this.navigationItems = items;
      })
  }

  navigateTo(navigationItem: NavigationItem) {
      this.navCtrl.push(HomePage, {
        navigationItem: navigationItem
      });
  }

}
