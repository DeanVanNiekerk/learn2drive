import { NgModule, ErrorHandler }                   from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';


import { L2D3DApp }                                 from './app.component';

import { PagesModule, HomePage, 
          ContentPage, TestPage, 
          TestResultPage, ChecklistPage,
          ChecklistItemInfoPage, AboutPage,
          SettingsPage, MockTestPage,
          MockTestResultPage, IntroductionSlidesPage,
          TestHistoryPage }                         from '../pages';

import { ComponentsModule }                         from '../components';

import { ContentService, QuestionService, 
          ResourceService, TestService, 
          ProgressService, StoreService, 
          StorageService, RateService }             from '../services';

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
    TestHistoryPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ContentService,
    QuestionService,
    ResourceService,
    TestService,
    ProgressService,
    RateService,    
    
    StorageService,
    StoreService,
  ],
})

export class AppModule {}
