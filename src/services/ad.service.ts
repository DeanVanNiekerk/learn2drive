import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

import {AdMob} from 'ionic-native';

@Injectable()
export class AdService {

    public prepareInterstitial() {

        // if (!environment.production)
        //    return;

        AdMob.prepareInterstitial({
            adId: 'ca-app-pub-8418396680963201/8587373373', 
            autoShow: false
        });
    }

    public showInterstitial() {

        // if (!environment.production)
        //   return;

        AdMob.showInterstitial();
    }

}