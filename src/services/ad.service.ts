import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

import { AdMobPro } from '@ionic-native/admob-pro';

@Injectable()
export class AdService {

    constructor(private admob: AdMobPro) {
    }

    public prepareInterstitial() {

        this.admob.prepareInterstitial({
            adId: 'ca-app-pub-8418396680963201/8587373373', 
            autoShow: false
        });
    }

    public showInterstitial() {
        this.admob.showInterstitial();
    }

}