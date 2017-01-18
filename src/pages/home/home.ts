import {Component, OnInit, ViewChild} from '@angular/core';
import {NavController, ViewController, PopoverController, MenuController} from 'ionic-angular';

// Services
import {ProgressService, StoreService} from '../../services';
import {ProgressBarComponent} from '../../components';
import {ContentPage, ChecklistPage, 
        MockTestPage, IntroductionSlidesPage,
        SettingsPage, AboutPage } from '../';

@Component({
  templateUrl: './home.html'
})
export class HomePage implements OnInit {

  hidden: boolean = true;

  rootNavigationKey: string = 'rootNavigation.learner';
  introductionMessageKey: string = 'IntroductionSlidesShown';

  @ViewChild('checklistprogressbar') checklistProgressComponent: ProgressBarComponent;
  @ViewChild('contentprogressbar') contentProgressComponent: ProgressBarComponent;
  @ViewChild('mocktestprogressbar') mockTestProgressComponent: ProgressBarComponent;

  constructor(private navCtrl: NavController,
      private viewCtrl: ViewController,
      private popoverCtrl: PopoverController,
      private progressService: ProgressService,
      private storeService: StoreService,
      public menuCtrl: MenuController) {
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

          var mockTestPassTarget = this.storeService.MOCK_TEST_PASS_TARGET;
          
          if (count > mockTestPassTarget)
            count = mockTestPassTarget;

          let percent = (count / mockTestPassTarget) * 100;

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

  openMenu() {
    this.menuCtrl.open();
  }

  navigateToContent() {
    this.navCtrl.push(ContentPage, {
      navigationKey: 'rootNavigation.learner'
    });
  }

  navigateToIntroductionSlides() {
    this.navCtrl.push(IntroductionSlidesPage);
  }

  navigateToMockTest() {
   this.navCtrl.push(MockTestPage);
  }

  navigateToChecklist() {
    this.navCtrl.push(ChecklistPage);
  }

  navigateToSettings() {
    this.navCtrl.push(SettingsPage);
  }

  navigateToAbout() {
    this.navCtrl.push(AboutPage);
  }
  
}
