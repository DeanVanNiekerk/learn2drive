import {
  describe,
  it,
  beforeEach,
  expect,
  async,
  inject,
  TestComponentBuilder,
} from '@angular/core/testing';


// import {setBaseTestProviders} from '@angular/core/testing';
// import {
//   TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
//   TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS
// } from '@angular/platform-browser-dynamic/testing';

import {QuestionComponent} from './question.component';


describe('QuestionComponent Component Tests', () => {

  let fixture;
  let builder : TestComponentBuilder;

  // setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
  //   TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

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

    fixture.detectChanges();

    console.log(nativeElement);

    expect(nativeElement
      .querySelectorAll('question').length).toBe(3);
    done();
  });


});
