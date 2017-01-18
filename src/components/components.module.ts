import { NgModule }                                     from '@angular/core';
import { IonicModule }                                  from 'ionic-angular';

import { PipesModule }                                  from '../pipes';

import { LearnComponent, NavigatorComponent, 
          ContentProgressComponent, QuestionComponent,
          TestResultQuestionsComponent, ChecklistItemComponent,
          ChecklistProgressComponent, ProgressBarComponent } from './';

@NgModule({
  declarations: [
    LearnComponent,
    NavigatorComponent,
    ContentProgressComponent,
    QuestionComponent,
    TestResultQuestionsComponent,
    ChecklistItemComponent,
    ChecklistProgressComponent, 
    ProgressBarComponent
  ],
  imports: [
    PipesModule,
    IonicModule,
  ],
  exports: [
    LearnComponent,
    NavigatorComponent,
    ContentProgressComponent,
    QuestionComponent,
    TestResultQuestionsComponent,
    ChecklistItemComponent,
    ChecklistProgressComponent, 
    ProgressBarComponent
  ],
  entryComponents: [],
  providers: [ ],
})

export class ComponentsModule {}
