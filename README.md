# Project Name

Learn2Drive3D Mobile Version

## Installation

1. Make sure NodeJS is installed. (NodeJS > v5)
2. npm install -g ionic cordova
3. npm install

## Usage

```npm start```

## Run Tests

```npm test```

## Run E2E
```
# e2e (aka. end-to-end, integration) - In two different shell windows
# Make sure you don't have a global instance of Protractor

npm start
npm run e2e
```

## Compile for Android

To set up build on windows, open cmd window browse to app root folder and run

set ANDROID_HOME=C:\Program Files (x86)\Android\android-sdk

set PATH=%PATH%;%ANDROID\_HOME%\tools;%ANDROID\_HOME%\platform-tools


## Run on iOS for development

You must have an Apple Developer account which costs $99 a year and generate a developer certificate.

Watch out for permission denied errors. You might need to run the following when in the project directory:
 
 ```sudo chown -R dylan:admin /usr/local```
 ```sudo chown -R dylan:staff ./```

Add build hooks

```ionic hooks add```


### With XCode

Build:
```ionic build ios```

Open the `./build/ios/L3D3D Mobile.xcodeproj`


### With ios-deploy

```npm install --unsafe-perm=true -g ios-deploy```

Build:
```ionic build ios```

Run on emultor:
```ionic run ios```

Run on device:
```ionic run ios --device```


## Links

* [Ionic2](http://ionicframework.com/docs/v2/)
* [Unit testing walkthrough](http://lathonez.com/2016/ionic-2-unit-testing/)
* [E2E testing walkthrough](http://lathonez.com/2016/ionic-2-e2e-testing/)
* [Removing assets from the APK](http://lathonez.com/2016/cordova-remove-assets/)
* [State](https://www.raymondcamden.com/2015/04/20/ionic-adds-a-new-state-feature?utm_content=buffer20073&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer)


## Based on Clicker Starter Template
https://github.com/lathonez/clicker


## TODO

Phase 1
-------

- Introduction Slides on first use (http://ionicframework.com/docs/v2/components/#slides) - Dean
- Add numbers to Vehicle Controls Image - Dylan 
- Icons (laucher etc)



Phase 2
--------
- Whats next?
- Build server
- Home page
    - Restyle home page
        - Progress Dials like http://blog.ionic.io/built-with-ionic-neumob/
            or http://progressbarjs.readthedocs.io/en/latest/
- Directory
    - http://blog.ionic.io/google-maps-component-in-ionic-creator/
- Breadcrumb
- Mock-test
    - Scroll to section in results
- Toast on Settings after save (http://ionicframework.com/docs/v2/components/#toast)
- Search for Content? (http://ionicframework.com/docs/v2/components/#searchbar)
- Tabs for sections (instead of current home page)
- Free and Paid Versions (lite version)
- Multi Language
    - http://blog.ionic.io/localize-your-app-with-ng2-translate/
- Use gulp to copy alasql and progressbar.js from nodemodules into the www/dependencies folder 
- Check for progressbar.js typings file (doesnt currently exit) 
- Styling Updates? 
- Final Naming: rename application to Learn2Drive (L2D) not L2D3D Mobile (maybe get rid of space)


Done
-------
- Home page
    - Status on Learners Content - Dean
    - Checklist to top of page (checklist status) - Dean
    - Settings to top menu - Dean
    - Mocktest status - Dean
- Checklist - Dean
- Checklist - Mock Tests Passed
- Checklist - info popup for readonly checkboxes - Dean
- Install ionic on Kate's phone. (She has Gingerbread!)
- Apple App/Bundle ID
- Check out competition
- Navigation 
    - Content Read Progress - Dean 
    - Test Progress - Dean 
- Vehicle Controls - Dean (Done)
- Running on iOS - Dylan (Done)
- Store service tests, promises not resolving - Dylan (Done)
- Content Read Tracking - Dean
- Funny issue sometime after showing test info popup? goes into state, maybe add some loading stuffs - fixed after v2
- remove import 'rxjs/add/operator/map';
- Vet content (intro, checklist more info)

Testing on iPhone 5
- Navigateion into an item seems sluggish and locks up sometimes half way through screen change.
- Noticed a crash or two
- Radio buttons in test do not show next to options. Can see a tick when one is selected.




