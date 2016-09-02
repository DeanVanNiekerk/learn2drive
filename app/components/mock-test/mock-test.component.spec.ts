import {
  describe,
  expect,
  it,
  inject,
  fakeAsync,
  beforeEachProviders
} from '@angular/core/testing';

import {MockTestComponent} from './mock-test.component';
import {Question} from '../../models/question';
import {QuestionService} from '../../services/question.service';

class MockQuestionService extends QuestionService {
  getQuestions(key: string): Promise<Question[]> {

    return new Promise(resolve => {
      resolve([
        new Question(1, "B", [], [], [])
      ])
    });
  }
}



describe('MockTest unit tests', () => {
  var mocktest : MockTestComponent;

  beforeEach(() => {
    let questionService = new MockQuestionService();
    mocktest = new MockTestComponent(null, null, null, null, questionService, null);
  });

  it('shows list of questions by default', (done) => {
    let promise = mocktest.ngOnInit();

    promise.then(() => {
      expect(mocktest.questions.length).toBe(1);

      done();

    });
  });
});



// describe('MockTest Component Integration Tests', () => {
//
//
//   it('shows list of questions by default',
//   injectAsync([TestComponentBuilder], (tcb) => {
//     return tcb
//
//       .overrideProviders(BlogRoll,
//           [ provide(BlogService, {useValue: mockBlogService}) ])
//       .createAsync(BlogRoll)
//       .then((fixture) => {
//         let nativeElement = fixture.nativeElement;
//         fixture.detectChanges();
//         // we start with the blog roll panel visible
//         expect(fixture.componentInstance.editing).toBe(false);
//         expect(nativeElement.querySelector(
//         '#blog-editor-panel') === null).toBe(true);
//         expect(nativeElement.querySelector(
//         '#blog-roll-panel') === null).toBe(false);
//         let trs = nativeElement.querySelectorAll('tr');
//         expect(trs.length).toBe(2);
//         let tdTitleContent = trs[1].children[1].innerHTML;
//         let tdRenderedContent = trs[1].children[2].innerHTML;
//         expect(tdTitleContent).toContain('The title');
//         expect(tdRenderedContent).toContain('Hi there');
//       });
//     26
//   }));
//
//
// });
