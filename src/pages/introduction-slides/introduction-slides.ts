import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {StoreService} from '../../services';
import {Message} from '../../models';

@Component({
  templateUrl: './introduction-slides.html'
})
export class IntroductionSlidesPage {

    introductionMessageKey: string = 'IntroductionSlidesShown';

    slideOptions = {
        pager: true
    };

    constructor(private navCtrl: NavController,
                    private storeService: StoreService) { }

    navigateToHome() {

        let message = new Message(this.introductionMessageKey, true, false);

        this.storeService.updateMessage(message)
            .then(() => {
                this.navCtrl.popToRoot();
            }
        ); 
    }

}