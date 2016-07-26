import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

// Services
import {ContentService} from '../../services/content.service';

// Models
import {NavigationItem} from '../../models/navigation-item';
import {Content} from '../../models/content';

// Pipes
import {TranslatePipe} from '../../pipes/translate.pipe.ts';

@Component({
  pipes: [TranslatePipe],
  templateUrl: 'build/pages/content/content.component.html'
})
export class ContentComponent implements OnInit {

  navigationKey: string = 'rootNavigation.learner';
  navigationItems: NavigationItem[] = [];
  contentItems: Content[] = [];

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private contentService: ContentService) {

      // Get the supplied navigation key, if not supply use default
      var navigationItem = navParams.get('navigationItem');
      if (navigationItem)
        this.navigationKey = navigationItem.key;
  }

  ngOnInit() {
    this.contentService
      .getNavigationItems(this.navigationKey)
      .then(items => { 
        this.navigationItems = items;
      });

    this.contentService
      .getContent(this.navigationKey)
      .then(items => { 
        this.contentItems = items;
      });
  }

  navigateTo(navigationItem: NavigationItem) {
      this.navCtrl.push(ContentComponent, {
        navigationItem: navigationItem
      });
  }

}
