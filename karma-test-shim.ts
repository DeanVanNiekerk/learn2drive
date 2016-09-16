import {setBaseTestProviders} from '@angular/core/testing';
import {
  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
  TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS
} from '@angular/platform-browser-dynamic/testing';

setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
  TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

// var testing = require('@angular/core/testing');
// var browser = require('@angular/platform-browser-dynamic/testing');
//
// testing.setBaseTestProviders(
//   browser.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
//   browser.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS
// );
