import {Component, Input, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';

// Services
import {StoreService} from '../../services';

// Components
import {ChecklistItemInfoPage} from '../../pages';

@Component({
    selector: 'checklist-item',
    templateUrl: './checklist-item.component.html'
})
export class ChecklistItemComponent implements OnInit {

    @Input() key: string;
    @Input() heading: string;
    @Input() information: string;

    complete: boolean = false;

    constructor(private navCtrl: NavController,
        private storeService: StoreService) {
    }

    ngOnInit() {
        this.storeService.getChecklistItem(this.key)
        .then((item) => {
            if (item != null)
                this.complete = item.complete;
        });
    }

    showInformation() {
        this.navCtrl.push(ChecklistItemInfoPage, {
            heading: this.heading,
            information: this.information
      });
    }

    toggleComplete() {
        this.complete = !this.complete;
        this.storeService.updateChecklistItem(this.key, this.complete);
    }
}