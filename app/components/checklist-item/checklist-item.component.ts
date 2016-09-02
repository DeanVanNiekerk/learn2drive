import {Component, Input, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';

// Services
import {StoreService} from '../../services/store.service';

// Components
import {ChecklistItemInfoComponent} from '../checklist-item-info/checklist-item-info.component';

@Component({
    selector: 'checklist-item',
    templateUrl: 'build/components/checklist-item/checklist-item.component.html'
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
        this.navCtrl.push(ChecklistItemInfoComponent, {
            heading: this.heading,
            information: this.information
      });
    }

    toggleComplete() {
        this.complete = !this.complete;
        this.storeService.updateChecklistItem(this.key, this.complete);
    }
}