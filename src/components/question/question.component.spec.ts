// // import { beforeEach, beforeEachProviders, describe, expect, it }          from '@angular/core/testing';
// import { asyncCallbackFactory, injectAsyncWrapper, providers }            from '../../../test/ionic-test-shim';

// // Models
// import {Answer} from '../../models/answer';
// import {Question} from '../../models/question';

// // Component
// import {QuestionComponent} from './question.component';


// this.fixture = null;
// this.instance = null;

// describe('QuestionComponent Component Tests', () => {

//   let beforeEachFn: Function = ((testSpec) => {
//     // testSpec.instance['clicker'] = { name: 'TEST CLICKER' };
//     // testSpec.instance['clicker'].getCount = function(): number { return 10; };
//   });

//   // beforeEachProviders(() => providers);
//   beforeEach(injectAsyncWrapper(asyncCallbackFactory(QuestionComponent, this, false, beforeEachFn)));



//   it('initialises', () => {
//     expect(this.instance).not.toBeNull();
//   });

//   it('renders a question', () => {

//     let nativeElement = this.fixture.nativeElement;

//     this.fixture.componentInstance.question = new Question(1, 'A', ['Question 1'], [new Answer('A', 'Answer 1')], [] );
//     this.fixture.componentInstance.questionNumber = 1;

//     this.fixture.detectChanges();


//     expect(nativeElement
//       .querySelector('ion-list').getAttribute('ng-reflect-model')).toBe('');
//   });

//   it('is selected when clicked', () => {

//     let nativeElement = this.fixture.nativeElement;

//     this.fixture.componentInstance.question = new Question(1, 'A', ['Question 1'], [new Answer('A', 'Answer 1')], [] );
//     this.fixture.componentInstance.questionNumber = 1;

//     this.fixture.detectChanges();

//     nativeElement
//       .querySelector('ion-row p').click();

//     this.fixture.detectChanges();

//     expect(nativeElement
//       .querySelector('ion-list').getAttribute('ng-reflect-model')).toBe('A');
//   });


// });
