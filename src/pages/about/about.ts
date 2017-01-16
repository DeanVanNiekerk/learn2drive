import {Component, OnInit} from '@angular/core';
import {Platform} from 'ionic-angular';
import {AppVersion} from 'ionic-native';

@Component({
    providers: [AppVersion],
    templateUrl: './about.html'
})
export class AboutPage implements OnInit {

    version: string = '';

    constructor(private platform: Platform) {
    }

    ngOnInit() {

        if (this.platform.is('cordova')) {
            AppVersion.getVersionNumber().then((s) => {
                this.version = s;
            });
        }

    }
}