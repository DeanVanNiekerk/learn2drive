import {Component, OnInit} from '@angular/core';

// Services
import {StoreService} from '../../services/store.service';
import {ContentService} from '../../services/content.service';

// Components
import {ChecklistItemComponent} from '../checklist-item/checklist-item.component';

@Component({
    directives: [ChecklistItemComponent],
    templateUrl: 'build/components/checklist/checklist.component.html'
})
export class ChecklistComponent implements OnInit {

  rootNavigationKey: string = 'rootNavigation.learner';

  // Conent Read
  contentAllRead: boolean = null;
  contentReadCount: number = null;
  contentSectionCount: number = null;

  // Mock Test
  mockTestPassed: boolean = false;

  constructor(private storeService: StoreService,
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

}