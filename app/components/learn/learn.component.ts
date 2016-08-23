import {Component} from '@angular/core';


// Services
import {ContentService} from '../../services/content.service';
import {StoreService} from '../../services/store.service';

// Models
import {Content} from '../../models/content';


@Component({
    selector: 'learn',
    templateUrl: 'build/components/learn/learn.component.html'
})
export class LearnComponent {

    contentItems: Content[] = [];

    constructor(private contentService: ContentService,
                    private storeService: StoreService) { }

    load(navigationKey: string) {
         this.contentService
            .getContent(navigationKey)
            .then(items => { 
                this.contentItems = items;
                
                if (items.length)
                    this.storeService.insertContentRead(navigationKey);
            });
    }

}