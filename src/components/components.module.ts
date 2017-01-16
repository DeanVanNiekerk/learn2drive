import { NgModule }                                     from '@angular/core';
import { FormsModule, ReactiveFormsModule }             from '@angular/forms'; // TODO: takeout?
import { IonicModule }                                  from 'ionic-angular';

import { PipesModule }                                  from '../pipes';

import { LearnComponent, NavigatorComponent, 
          ContentProgressComponent, QuestionComponent,
          TestResultQuestionsComponent, ChecklistItemComponent,
          ChecklistProgressComponent, HomeMenuComponent,
          ProgressBarComponent } from './';

@NgModule({
  declarations: [
    LearnComponent,
    NavigatorComponent,
    ContentProgressComponent,
    QuestionComponent,
    TestResultQuestionsComponent,
    ChecklistItemComponent,
    ChecklistProgressComponent, 
    HomeMenuComponent,
    ProgressBarComponent
  ],
  imports: [
    PipesModule,
    FormsModule, // TODO: delete
    IonicModule, // TODO: delete
    ReactiveFormsModule, // TODO: delete
  ],
  exports: [
    LearnComponent,
    NavigatorComponent,
    ContentProgressComponent,
    QuestionComponent,
    TestResultQuestionsComponent,
    ChecklistItemComponent,
    ChecklistProgressComponent, 
    HomeMenuComponent,
    ProgressBarComponent
  ],
  entryComponents: [],
  providers: [ ],
})

export class ComponentsModule {}
