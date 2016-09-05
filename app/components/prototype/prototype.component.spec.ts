import {
  describe,
  it,
  beforeEach,
  expect,
  async,
  inject,
  TestComponentBuilder,
} from '@angular/core/testing';


import {setBaseTestProviders} from '@angular/core/testing';
import {
  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
  TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS
} from '@angular/platform-browser-dynamic/testing';

import {ProtoTypeComponent} from './prototype.component';


describe('Prototype Component Tests', () => {

  let fixture;
  let builder : TestComponentBuilder;

  setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
    TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

  beforeEach(async(inject([TestComponentBuilder], (tcb) => {
    builder = tcb;
    fixture = builder
      // .overrideProviders(MockTestComponent,
      //    [
      //      QuestionService, {useValue: questionService},
      //    ])
      .createAsync(ProtoTypeComponent);

  })));


  it('shows something my default', done => {
    fixture
     .then((fixture) => {

       let nativeElement = fixture.nativeElement;

       console.log(nativeElement);

       expect(nativeElement
         .querySelector('#test').innerHTML).toBe("Hello world");
       done();
     });

 });


});
