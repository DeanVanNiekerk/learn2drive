import {
  describe,
  it,
  beforeEach,
  expect,
  async,
  inject,
  TestComponentBuilder,
  addProviders,
} from '@angular/core/testing';

import {MockTestComponent} from './mock-test.component';
import {Question} from '../../models/question';
import {QuestionService} from '../../services/question.service';
import {TestService} from "../../services/test.service";

class MockQuestionService extends QuestionService  {

  constructor() {
    super(null);
  }

  getQuestions(key: string): Promise<Question[]> {

    return new Promise(resolve => {
      resolve([
        new Question(1, "B", [], [], [])
      ])
    });
  }
}

class MockTestService extends TestService  {


}





// describe('MockTest unit tests', () => {
//   var mocktest : MockTestComponent;
//
//   beforeEach(() => {
//     let questionService = new MockQuestionService();
//     mocktest = new MockTestComponent(null, null, null, null, questionService, null);
//   });
//
//   it('shows list of questions by default', (done) => {
//     let promise = mocktest.ngOnInit();
//
//     promise.then(() => {
//       expect(mocktest.questions.length).toBe(1);
//
//       done();
//
//     });
//   });
// });


// import {setBaseTestProviders} from '@angular/core/testing';
// import {
//   TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
//   TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS
// } from '@angular/platform-browser-dynamic/testing';
//
//
//
// describe('MockTest Component Integration Tests', () => {
//
//   let fixture;
//   let questionService: MockQuestionService;
//   let testService: MockTestService;
//   let builder : TestComponentBuilder;
//
//   setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
//     TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);
//
//   beforeEach(async(inject([TestComponentBuilder], (tcb) => {
//     builder = tcb;
//
//     questionService = new MockQuestionService();
//     testService = new TestService();
//
//     fixture = builder
//       .overrideProviders(MockTestComponent,
//          [
//            QuestionService, {useValue: questionService},
//            TestService, {useValue: testService}
//          ])
//       .createAsync(MockTestComponent);
//
//   })));
//
//
//   it('shows list of questions by default', done => {
//     fixture
//      .then((fixture) => {
//        // let nativeElement = fixture.nativeElement;
//        // fixture.detectChanges();
//        // // we start with the blog roll panel visible
//        // expect(fixture.componentInstance.editing).toBe(false);
//        // expect(nativeElement.querySelector(
//        // '#blog-editor-panel') === null).toBe(true);
//        // expect(nativeElement.querySelector(
//        // '#blog-roll-panel') === null).toBe(false);
//        // let trs = nativeElement.querySelectorAll('tr');
//        // expect(trs.length).toBe(2);
//        // let tdTitleContent = trs[1].children[1].innerHTML;
//        // let tdRenderedContent = trs[1].children[2].innerHTML;
//        // expect(tdTitleContent).toContain('The title');
//        // expect(tdRenderedContent).toContain('Hi there');
//
//        done();
//      });
//
//  });
//
//
// });
