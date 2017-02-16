import { Injectable } from '@angular/core';

import {AdMob} from 'ionic-native';

@Injectable()
export class AdService {

    public prepareInterstitial() {
        AdMob.prepareInterstitial({
            adId: 'ca-app-pub-8418396680963201/8587373373', 
            autoShow: false
        });
    }

    public showInterstitial() {
        AdMob.showInterstitial();
    }

}