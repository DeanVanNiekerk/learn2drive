import { NgModule }         from '@angular/core';
import { IonicModule }      from 'ionic-angular';

import { PipesModule }      from '../pipes';
import { ComponentsModule } from '../components';

import { HomePage, ContentPage, TestPage, 
          TestResultPage, ChecklistPage,
          ChecklistItemInfoPage, AboutPage,
          SettingsPage, MockTestPage,
          MockTestResultPage, IntroductionSlidesPage,
          TestHistoryPage }  from './';

@NgModule({
  declarations: [
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
  imports: [ 
    IonicModule,
    ComponentsModule,
    PipesModule
  ],
  exports: [
    // HomePage,
  ],
  entryComponents: [],
  providers: [ ],
})

export class PagesModule {}
