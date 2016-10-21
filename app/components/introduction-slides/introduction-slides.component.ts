import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

// Services
import {StoreService} from '../../services/store.service';

// Models
import {Message} from '../../models/message';

@Component({
  templateUrl: 'build/components/introduction-slides/introduction-slides.component.html'
})
export class IntroductionSlidesComponent {

    introductionMessageKey: string = 'IntroductionSlidesShown';

    slideOptions = {
        pager: true
    };

    constructor(private navCtrl: NavController,
                    private storeService: StoreService) { }

    navigateToHome() {

        let message = new Message(0, this.introductionMessageKey, true, false);

        this.storeService.updateMessage(message)
            .then(() => {
                this.navCtrl.popToRoot();
            }
        ); 
    }

}