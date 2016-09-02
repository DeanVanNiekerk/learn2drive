import {Component, Input} from '@angular/core';
import {NavParams} from 'ionic-angular';


@Component({
    templateUrl: 'build/components/checklist-item-info/checklist-item-info.component.html'
})
export class ChecklistItemInfoComponent {

    heading: string;
    information: string;

    constructor(private navParams: NavParams) {
        this.heading = navParams.get('heading');
        this.information = navParams.get('information');
    }

}