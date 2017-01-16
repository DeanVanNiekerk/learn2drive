import { Injectable, Inject  } from '@angular/core';


// Services
import {StoreService} from './store.service';
import {ContentService} from './content.service';

// Models
import {Progress} from '../models/progress';

@Injectable()
export class ProgressService {

    rootNavigationKey: string = 'rootNavigation.learner';

    constructor(@Inject(StoreService) private storeService: StoreService,
                    @Inject(ContentService) private contentService: ContentService) {
   
    }

    getChecklistProgress(): Promise<Progress> {

        return new Promise(resolve => {

            let total = 8;
            let complete = 0;

            // 1. Get Checklist count
            this.storeService.getCompleteChecklistItemCount()
            .then(checklistComplete => {

                complete += checklistComplete;

                // 2. Get Content Read count
                this.storeService.getContentReadCount(this.rootNavigationKey)
                .then(readCount => {
                    
                    this.contentService.getContentSectionCount(this.rootNavigationKey)
                    .then(sectionCount => {

                        complete += (readCount >= sectionCount) ? 1 : 0;

                        // 3. Get Mock Tests Passed count
                        this.storeService.getMockTestsPassed().
                            then(count => {

                                complete += (count >= this.storeService.MOCK_TEST_PASS_TARGET) ? 1 : 0;

                                let progress = new Progress(total, complete);
                                resolve(progress);
                            }
                        );
                    });
                });
            });
        });
    }

    getContentProgress(navigationKey: string): Promise<Progress> {

        return new Promise(resolve => {

            this.storeService.getContentReadCount(navigationKey)
            .then(readCount => {

                this.contentService.getContentSectionCount(navigationKey)
                .then(sectionCount => {

                    let progress = new Progress(sectionCount, readCount);
                    resolve(progress);

                });
            });
        });
    }
}