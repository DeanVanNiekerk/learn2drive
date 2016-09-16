import {
  describe,
  it,
  beforeEach,
  expect,
  async,
  inject,
  TestComponentBuilder,
} from '@angular/core/testing';

//Models
import {Answer} from '../../models/answer';
import {Question} from '../../models/question';

import {QuestionComponent} from './question.component';

describe('QuestionComponent Component Tests', () => {

  let fixture;
  let builder : TestComponentBuilder;

  beforeEach(async(inject([TestComponentBuilder], (tcb) => {
    builder = tcb;
    fixture = builder
    // .overrideProviders(MockTestComponent,
    //    [
    //      QuestionService, {useValue: questionService},
    //    ])
      .createAsync(QuestionComponent)
      .then((f) => {
        fixture = f;
      });
  })));


  it('renders a question', done => {

    let nativeElement = fixture.nativeElement;

    fixture.componentInstance.question = new Question(1, "A", ["Question 1"], [new Answer("A", "Answer 1")], [] );
    fixture.componentInstance.questionNumber = 1;

    fixture.detectChanges();

    console.log(nativeElement);

    expect(nativeElement
      .querySelectorAll('question').length).toBe(3);
    done();
  });


});
