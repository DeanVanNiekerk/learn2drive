import { Injectable } from '@angular/core';
import { AppRate } from 'ionic-native';
import { Platform } from 'ionic-angular';

@Injectable()
export class RateService {

    constructor() {
        AppRate.preferences = {
                storeAppURL: {
                    // ios: '849930087',
                    android: 'market://details?id=mobi.learn2drive3d'
                },
                usesUntilPrompt: 12,
                customLocale: {
                    title: 'Please take a moment to give us feedback?',
                    message: 'Feedback helps us improve the app',
                    rateButtonLabel: 'Give feedback',
                    laterButtonLabel: 'Maybe later',
                    cancelButtonLabel: 'No thanks'
                }
            };
    }

    public promptForRating(immediate: boolean) {
        AppRate.promptForRating(immediate);
    }

}