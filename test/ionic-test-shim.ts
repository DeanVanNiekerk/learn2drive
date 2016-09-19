'use strict';
import { Component, provide, Type, ViewChild }           from '@angular/core';
import { ComponentFixture, TestComponentBuilder }     from '@angular/compiler/testing';
import { inject, async }                              from '@angular/core/testing';
import { disableDeprecatedForms, provideForms, FormControl } from '@angular/forms';
import { ionicBootstrap, App, Config, Form, Nav, NavController, Platform } from 'ionic-angular';
import { StatusBar }                                     from 'ionic-native';

export class Utils {

  public static promiseCatchHandler(err:Error):void {
    console.error('ERROR - An error has occurred inside a promise! ' + err);
    // throw the error out to the console - http://stackoverflow.com/a/30741722
    setTimeout(function ():void {
      throw err;
    });
  }
}


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MockApp {

  @ViewChild(Nav) private nav: Nav;

  private rootPage: Type;
  private platform: Platform;

  constructor(platform: Platform) {

    this.platform = platform;

    this.rootPage = null;
    this.initializeApp();
  }

  private initializeApp(): void {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MockApp, [
  disableDeprecatedForms(),
  provideForms(),
]);


export class MockPlatform {
  public ready(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }

  public close(): any {
    return true;
  }

  public setRoot(): any {
    return true;
  }
}


// IONIC:
export class ConfigMock {

  public get(): any {
    return '';
  }

  public getBoolean(): boolean {
    return true;
  }

  public getNumber(): number {
    return 1;
  }
}

export class NavMock {

  public pop(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }

  public push(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }

  public getActive(): any {
    return {
      'instance': {
        'model': 'something',
      },
    };
  }

  public setRoot(): any {
    return true;
  }
}

export let providers: Array<any> = [
  disableDeprecatedForms(),
  provideForms(),
  Form,
  provide(Config, {useClass: ConfigMock}),
  provide(App, {useClass: ConfigMock}),        // required by ClickerList
  provide(NavController, {useClass: NavMock}), // required by ClickerList
  provide(Platform, {useClass: ConfigMock}),   // -> IonicApp
];

export let injectAsyncWrapper: Function = ((callback) => async(inject([TestComponentBuilder], callback)));

export let asyncCallbackFactory: Function = ((component, testSpec, detectChanges, beforeEachFn) => {

  return ((tcb: TestComponentBuilder) => {

    return tcb.createAsync(component)
      .then((fixture: ComponentFixture<Type>) => {
        testSpec.fixture = fixture;
        testSpec.instance = fixture.componentInstance;
        testSpec.instance.control = new FormControl('');
        if (detectChanges) fixture.detectChanges();
        if (beforeEachFn) beforeEachFn(testSpec);
      })
      .catch(Utils.promiseCatchHandler);
  });
});
