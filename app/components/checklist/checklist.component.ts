import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController} from 'ionic-angular';

// Services
import {StoreService} from '../../services/store.service';
import {ContentService} from '../../services/content.service';

// Components
import {ChecklistItemComponent} from '../checklist-item/checklist-item.component';
import {ChecklistProgressComponent} from '../checklist-progress/checklist-progress.component';

@Component({
    directives: [ChecklistItemComponent, ChecklistProgressComponent],
    templateUrl: 'build/components/checklist/checklist.component.html'
})
export class ChecklistComponent implements OnInit {

  rootNavigationKey: string = 'rootNavigation.learner';

  @ViewChild(ChecklistProgressComponent) checklistProgressComponent: ChecklistProgressComponent;

  // Conent Read
  contentAllRead: boolean = null;
  contentReadCount: number = null;
  contentSectionCount: number = null;

  // Mock Test
  mockTestsPassed: boolean = false;

  constructor(private alertCtrl: AlertController,
                private storeService: StoreService,
                private contentService: ContentService) {
  }

  ngOnInit() {
      this.loadContentRead();
  }


  loadContentRead() {
      this.storeService.getContentReadCount(this.rootNavigationKey)
      .then(readCount => {
        
        this.contentService.getContentSectionCount(this.rootNavigationKey)
          .then(sectionCount => {

              this.contentAllRead = readCount >= sectionCount;
              this.contentReadCount = readCount;
              this.contentSectionCount = sectionCount;
          });
      });
  }

  toggleContentAllRead() {
       
    if(this.contentAllRead == true)
        return;

    let infoAlert = this.alertCtrl.create({
        title: 'Information',
        message: 'In order to complete this checklist item you must first read through all the content.',
        buttons: [
          {
            text: 'Okay'
          }
        ]
    });

    infoAlert.present();
  }

  toggleMockTestsPassed() {
       
    if(this.mockTestsPassed == true)
        return;

    let infoAlert = this.alertCtrl.create({
        title: 'Information',
        message: 'In order to complete this checklist item you must first pass the mock test 3 times.',
        buttons: [
          {
            text: 'Okay'
          }
        ]
    });

    infoAlert.present();
  }

  checklistChanged() {
    let component = this;
    setTimeout(function() {
        component.checklistProgressComponent.loadChecklistProgress();    
    }, 500);
  }

}