import { Injectable } from '@angular/core';
import { AppRate } from '@ionic-native/app-rate';


@Injectable()
export class RateService {

    constructor(private appRate: AppRate) {
        this.appRate.preferences = {
                storeAppURL: {
                    // ios: '849930087',
                    android: 'market://details?id=mobi.learn2drive3d'
                },
                usesUntilPrompt: 12,
                customLocale: {
                    title: 'Please take a moment to rate our app?',
                    message: 'Ratings help us put food on the table :)',
                    rateButtonLabel: 'Rate app!',
                    laterButtonLabel: 'Maybe later',
                    cancelButtonLabel: 'No thanks'
                }
            };
    }

    public promptForRating(immediate: boolean) {
        this.appRate.promptForRating(immediate);
    }

}