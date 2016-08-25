import {Component, OnInit} from '@angular/core';

// Services
import {StoreService} from '../../services/store.service';
import {ContentService} from '../../services/content.service';

@Component({
  templateUrl: 'build/components/checklist/checklist.component.html'
})
export class ChecklistComponent implements OnInit {

  rootNavigationKey: string = 'rootNavigation.learner';

  // Conent Read
  contentAllRead: boolean = null;
  contentReadCount: number = null;
  contentSectionCount: number = null;

  // Tests
  testsAllPassed: boolean = null;
  testsPassedCount: number = null;
  testsSectionCount: number = null;

  // Mock Test
  mockTestPassed: boolean = false;

  constructor(private storeService: StoreService,
                private contentService: ContentService) {
  }

  ngOnInit() {
      this.loadContentRead();
      this.loadTestsPassed();
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

  loadTestsPassed() {
      this.storeService.getTestSectionsPassed()
      .then(passedSections => {
        
        this.contentService.getAllNavigationItems(this.rootNavigationKey)
          .then(navigationItems => {

              this.testsAllPassed = passedSections.length >= navigationItems.length;
              this.testsPassedCount = passedSections.length;
              this.testsSectionCount = navigationItems.length;
          });
      });
  }

}