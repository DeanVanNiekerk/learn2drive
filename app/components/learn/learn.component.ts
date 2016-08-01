import {Component} from '@angular/core';


// Services
import {ContentService} from '../../services/content.service';

// Models
import {Content} from '../../models/content';


@Component({
    selector: 'learn',
    templateUrl: 'build/components/learn/learn.component.html'
})
export class LearnComponent {

    contentItems: Content[] = [];

    constructor(private contentService: ContentService) { }

    load(key: string) {
         this.contentService
            .getContent(key)
            .then(items => { 
                this.contentItems = items;
            });
    }

}