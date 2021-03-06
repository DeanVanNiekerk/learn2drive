# Learn2Drive

*Learn2Drive - K53 contains everything you need to know to pass your learner's licence test* 

https://play.google.com/store/apps/details?id=mobi.learn2drive3d

## Installation

1. Make sure NodeJS is installed. (NodeJS > v5)
2. npm install -g ionic cordova
3. npm install

## Usage

```npm start```

## Run Tests

```npm test```


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

## Build for Debug

NB: ionic serve first!
cordova build --debug android

## Build for Release

https://ionicframework.com/docs/guide/publishing.html

NB: ionic serve first!

cordova build --release android --env=prod
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore learn2drive-key.keystore android-release-unsigned.apk learn2drive
zipalign -v 4 android-release-unsigned.apk learn2drive.apk

## Installing Android SDK Licence

mkdir "%ANDROID_HOME%\licenses"
echo |set /p="8933bad161af4178b1185d1a37fbf41ea5269c55" > "%ANDROID_HOME%\licenses\android-sdk-license"


## Links

* [Ionic2](http://ionicframework.com/docs/v2/)
* [Unit testing walkthrough](http://lathonez.com/2016/ionic-2-unit-testing/)
* [Removing assets from the APK](http://lathonez.com/2016/cordova-remove-assets/)
* [State](https://www.raymondcamden.com/2015/04/20/ionic-adds-a-new-state-feature?utm_content=buffer20073&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer)


## TODO

Phase 1
-------
- Icons (laucher etc)
- Add numbers to Vehicle Controls Image - Dylan 
- Mock test info popup

Phase 2
--------
- Introduction Slides on first use (http://ionicframework.com/docs/v2/components/#slides) - Dean
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
- Google Login and Cloud storage
    - https://docs.ionic.io/services/auth/google-auth.html



Done
-------
- Cancel Test/Mock Test confirmation - Dean
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




