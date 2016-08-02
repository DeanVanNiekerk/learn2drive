import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

// Services
import {ContentService} from '../../services/content.service';

// Models
import {NavigationItem} from '../../models/navigation-item';

// Pipes
import {TranslatePipe} from '../../pipes/translate.pipe.ts';

// Components
import {ContentComponent} from '../content/content.component';

@Component({
    selector: 'navigator',
    pipes: [TranslatePipe],
    templateUrl: 'build/components/navigator/navigator.component.html'
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
      this.navCtrl.push(ContentComponent, {
        navigationKey: navigationItem.key
      });
  }

}