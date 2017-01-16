import { NgModule, ErrorHandler }                   from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage }                                  from '@ionic/storage';

import { L2D3DApp }                                 from './app.component';

import { PagesModule, HomePage, 
          ContentPage, TestPage, 
          TestResultPage, ChecklistPage,
          ChecklistItemInfoPage, AboutPage,
          SettingsPage, MockTestPage,
          MockTestResultPage, IntroductionSlidesPage,
          TestHistoryPage } from '../pages';

import { ComponentsModule, HomeMenuComponent }      from '../components';

import { ContentService, QuestionService, 
          ResourceService, TestService, 
          ProgressService, StoreService }           from '../services';

import { PipesModule }                              from '../pipes';

@NgModule({
  declarations: [
    L2D3DApp,
  ],
  imports: [
    PagesModule,
    PipesModule,
    IonicModule.forRoot(L2D3DApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    L2D3DApp,
    HomePage,
    ContentPage,
    TestPage,
    TestResultPage,
    ChecklistPage,
    ChecklistItemInfoPage, 
    AboutPage,
    SettingsPage,
    MockTestPage,
    MockTestResultPage,
    IntroductionSlidesPage,
    TestHistoryPage,

    HomeMenuComponent
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Storage,
    ContentService,
    QuestionService,
    ResourceService,
    TestService,
    ProgressService,
    StoreService
  ],
})

export class AppModule {}
