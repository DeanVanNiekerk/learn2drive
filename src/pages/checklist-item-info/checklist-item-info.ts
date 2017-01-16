import {Component, Input} from '@angular/core';
import {NavParams} from 'ionic-angular';


@Component({
    templateUrl: './checklist-item-info.html'
})
export class ChecklistItemInfoPage {

    heading: string;
    information: string;

    constructor(private navParams: NavParams) {
        this.heading = navParams.get('heading');
        this.information = navParams.get('information');
    }

}