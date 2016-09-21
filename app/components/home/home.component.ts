import {Component, OnInit, ViewChild} from '@angular/core';
import {NavController, NavParams, ViewController, PopoverController} from 'ionic-angular';

// Components
import {ContentComponent} from '../content/content.component';
import {SettingsComponent} from '../settings/settings.component';
import {MockTestComponent} from '../mock-test/mock-test.component';
import {ChecklistComponent} from '../checklist/checklist.component';
import {ContentProgressComponent} from '../content-progress/content-progress.component';
import {ChecklistProgressComponent} from '../checklist-progress/checklist-progress.component';
import {HomeMenuComponent} from '../home-menu/home-menu.component';

// Directives
import {ProgressDirective} from '../../directives/progress.directive';

@Component({
  directives: [ChecklistProgressComponent, ContentProgressComponent, ProgressDirective],
  templateUrl: 'build/components/home/home.component.html'
})
export class HomeComponent implements OnInit {

  rootNavigationKey: string = 'rootNavigation.learner';

  @ViewChild(ContentProgressComponent) contentProgressComponent: ContentProgressComponent;
  @ViewChild(ChecklistProgressComponent) checklistProgressComponent: ChecklistProgressComponent;

  constructor(private navCtrl: NavController,
      private viewCtrl: ViewController,
      private popoverCtrl: PopoverController) {
  }

  ngOnInit() {
    this.viewCtrl.didEnter.subscribe(() => {
      //this.checklistProgressComponent.loadChecklistProgress();
      //this.contentProgressComponent.loadContentProgress();
    });
  }

  navigateToContent() {
    this.navCtrl.push(ContentComponent, {
      navigationKey: 'rootNavigation.learner'
    });
  }

  navigateToMockTest() {
   this.navCtrl.push(MockTestComponent);
  }

  navigateToChecklist() {
    this.navCtrl.push(ChecklistComponent);
  }

  showHomeMenu(event: Event) {
    let popover = this.popoverCtrl.create(HomeMenuComponent);
    popover.present({
      ev: event
    });
  }

}
