import {Component, OnInit, ViewChild} from '@angular/core';
import {NavController, NavParams, ViewController, PopoverController} from 'ionic-angular';

// Services
import {ProgressService} from '../../services/progress.service';
import {StoreService} from '../../services/store.service';

// Components
import {ContentComponent} from '../content/content.component';
import {SettingsComponent} from '../settings/settings.component';
import {MockTestComponent} from '../mock-test/mock-test.component';
import {ChecklistComponent} from '../checklist/checklist.component';
import {HomeMenuComponent} from '../home-menu/home-menu.component';
import {ProgressBarComponent} from '../progressbar/progressbar.component';
import {IntroductionSlidesComponent} from '../introduction-slides/introduction-slides.component';

@Component({
  directives: [ProgressBarComponent],
  templateUrl: 'build/components/home/home.component.html'
})
export class HomeComponent implements OnInit {

  hidden: boolean = true;
  mockTestPassTarget: number = 3;

  rootNavigationKey: string = 'rootNavigation.learner';
  introductionMessageKey: string = 'IntroductionSlidesShown';

  @ViewChild('checklistprogressbar') checklistProgressComponent: ProgressBarComponent;
  @ViewChild('contentprogressbar') contentProgressComponent: ProgressBarComponent;
  @ViewChild('mocktestprogressbar') mockTestProgressComponent: ProgressBarComponent;

  constructor(private navCtrl: NavController,
      private viewCtrl: ViewController,
      private popoverCtrl: PopoverController,
      private progressService: ProgressService,
      private storeService: StoreService) {
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

      this.storeService.getMockTestsPassed().
        then(count => {

          if (count > this.mockTestPassTarget)
            count = this.mockTestPassTarget;

          let percent = (count / this.mockTestPassTarget) * 100;

          this.mockTestProgressComponent.update(percent);
        }
      );
     

      this.storeService.getMessage(this.introductionMessageKey)
        .then(message => {
          if (message.showAgain === true) 
            this.navigateToIntroductionSlides();
          else
            this.hidden = false;
        }
      ); 
      
    });

    

    
  }

  navigateToContent() {
    this.navCtrl.push(ContentComponent, {
      navigationKey: 'rootNavigation.learner'
    });
  }

  navigateToIntroductionSlides() {
    this.navCtrl.push(IntroductionSlidesComponent);
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
