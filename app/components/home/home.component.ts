import {Component, OnInit, ViewChild} from '@angular/core';
import {NavController, NavParams, ViewController, PopoverController} from 'ionic-angular';

// Services
import {ProgressService} from '../../services/progress.service';

// Components
import {ContentComponent} from '../content/content.component';
import {SettingsComponent} from '../settings/settings.component';
import {MockTestComponent} from '../mock-test/mock-test.component';
import {ChecklistComponent} from '../checklist/checklist.component';
import {HomeMenuComponent} from '../home-menu/home-menu.component';
import {ProgressBarComponent} from '../progressbar/progressbar.component';

@Component({
  directives: [ProgressBarComponent],
  templateUrl: 'build/components/home/home.component.html'
})
export class HomeComponent implements OnInit {

  rootNavigationKey: string = 'rootNavigation.learner';

  @ViewChild('checklistprogressbar') checklistProgressComponent: ProgressBarComponent;
  @ViewChild('contentprogressbar') contentProgressComponent: ProgressBarComponent;

  constructor(private navCtrl: NavController,
      private viewCtrl: ViewController,
      private popoverCtrl: PopoverController,
      private progressService: ProgressService) {
  }

  ngOnInit() {
    this.viewCtrl.didEnter.subscribe(() => {

      this.progressService.getChecklistProgress().
        then(progress => {
          this.checklistProgressComponent.update(progress.percent());
        }
      );

      this.progressService.getContentProgress(this.rootNavigationKey).
        then(progress => {
          this.contentProgressComponent.update(progress.percent());
        }
      );
      
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
