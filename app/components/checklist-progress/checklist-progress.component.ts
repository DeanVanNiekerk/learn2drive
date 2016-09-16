import {Component, OnInit, Input} from '@angular/core';
import {NavController} from 'ionic-angular';

// Services
import {StoreService} from '../../services/store.service';
import {ContentService} from '../../services/content.service';


@Component({
  selector: 'checklist-progress',
  templateUrl: 'build/components/checklist-progress/checklist-progress.component.html'
})
export class ChecklistProgressComponent implements OnInit {

  rootNavigationKey: string = 'rootNavigation.learner';

  checklistCount: number = 0;
  contentReadCount: number = 0;
  mockTestsPassedCount: number = 0;
  completeCount: number = 0;
  totalCount: number = 8;
  
  constructor(private navCtrl: NavController,
    private storeService: StoreService,
    private contentService: ContentService) { 

  }

  ngOnInit() {
    this.loadChecklistProgress();
  }

  loadChecklistProgress() {

    //1. Get Checklist count
    this.storeService.getCompleteChecklistItemCount()
      .then(count => {
        this.checklistCount = count;
        this.setCompleteCount();
    });

    //2. Get Content Read count
    this.storeService.getContentReadCount(this.rootNavigationKey)
      .then(readCount => {
        
        this.contentService.getContentSectionCount(this.rootNavigationKey)
          .then(sectionCount => {
             this.contentReadCount = readCount >= sectionCount ? 1 : 0;
             this.setCompleteCount();
          });
      });


    //3. Get Mock Tests Passed count
    //TODO

  }

  setCompleteCount() {
    this.completeCount = this.checklistCount + this.contentReadCount + this.mockTestsPassedCount;
  }
}