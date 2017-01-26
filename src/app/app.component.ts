import { Component, ViewChild }           from '@angular/core';
import { Platform }                       from 'ionic-angular';
import { StatusBar, Splashscreen }        from 'ionic-native';
import { HomePage }                       from '../pages';
import { environment }                    from '../environments/environment';

@Component({
  templateUrl: './app.html',
})
export class L2D3DApp {

  public rootPage: any;
  private platform: Platform;

  constructor(platform: Platform) {

    this.platform = platform;
    this.initializeApp();
  }

  private initializeApp(): void {
    
  this.platform.ready().then(() => {

      this.rootPage = HomePage;

      StatusBar.styleDefault();
      Splashscreen.hide();

      console.log('production: ' + environment.production);
    });
  }
}
