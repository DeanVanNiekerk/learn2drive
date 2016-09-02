import {Component, Input} from '@angular/core';
import {NavController} from 'ionic-angular';

// Services
import {StoreService} from '../../services/store.service';

// Components
import {ChecklistItemInfoComponent} from '../checklist-item-info/checklist-item-info.component';

@Component({
    selector: 'checklist-item',
    templateUrl: 'build/components/checklist-item/checklist-item.component.html'
})
export class ChecklistItemComponent {

    @Input() heading: string;
    @Input() information: string;

    constructor(private navCtrl: NavController,
        private storeService: StoreService) {
    }

    showInformation() {
        this.navCtrl.push(ChecklistItemInfoComponent, {
            heading: this.heading,
            information: this.information
      });
    }
}