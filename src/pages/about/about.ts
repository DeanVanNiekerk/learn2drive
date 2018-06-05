import {Component, OnInit} from '@angular/core';
import {Platform} from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';

@Component({
    providers: [AppVersion],
    templateUrl: './about.html'
})
export class AboutPage implements OnInit {

    version: string = '';

    constructor(private platform: Platform, private appVersion: AppVersion) {
    }

    ngOnInit() {

        if (this.platform.is('cordova')) {
            this.appVersion.getVersionNumber().then((s) => {
                this.version = s;
            });
        }

    }
}