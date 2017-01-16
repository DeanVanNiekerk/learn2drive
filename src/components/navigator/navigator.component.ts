import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {ContentService} from '../../services';
import {NavigationItem} from '../../models';
import {ContentPage} from '../../pages';
import {ContentProgressComponent} from '../';

@Component({
    selector: 'navigator',
    templateUrl: './navigator.component.html'
})
export class NavigatorComponent {

    navigationItems: NavigationItem[] = [];

    constructor(private navCtrl: NavController,
        private contentService: ContentService) { }

    load(key: string) {
        this.contentService
            .getNavigationItems(key)
            .then(items => { 
                this.navigationItems = items;
            });
    }

    navigateTo(navigationItem: NavigationItem) {
      this.navCtrl.push(ContentPage, {
        navigationKey: navigationItem.key
      });
  }

}