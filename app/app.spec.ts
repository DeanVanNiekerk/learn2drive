import { beforeEach, beforeEachProviders, describe, expect, it }          from '@angular/core/testing';

import {
  TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS, TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
}                               from '@angular/platform-browser-dynamic/testing';
import { setBaseTestProviders } from '@angular/core/testing';

setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

import {MockApp, MockPlatform} from '../test/ionic-test-shim.ts';


//TODO: Extend this to create the real app

let myApp: MockApp = null;


describe('MockApp', () => {

  beforeEach(() => {
    let mockPlatform: any = new MockPlatform();
    myApp = new MockApp(mockPlatform);
  });

  it('is not null', () => {
    expect(myApp).not.isNull;
  });

  //
  // it('initialises with a root page', () => {
  //   expect(L2D3DApp['rootPage']).not.toBe(null);
  // });
  //
  // it('initialises with an app', () => {
  //   expect(L2D3DApp['app']).not.toBe(null);
  // });
  //
  // it('opens a page', () => {
  //   spyOn(L2D3DApp['menu'], 'close');
  //   // cant be bothered to set up DOM testing for app.ts to get access to @ViewChild (Nav)
  //   myApp['nav'] = (<any>myApp['menu']);
  //   spyOn(clickerApp['nav'], 'setRoot');
  //   myApp.openPage(myApp['pages'][1]);
  //   expect(myApp['menu']['close']).toHaveBeenCalled();
  //   //expect(clickerApp['nav'].setRoot).toHaveBeenCalledWith(Page2);
  // });
});
