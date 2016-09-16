import {Component, OnInit} from '@angular/core';

// Models
import {Answer} from '../../models/answer';
import {Question} from '../../models/question';

// Components
import {QuestionComponent} from '../question/question.component';

@Component({
  directives: [QuestionComponent],
  templateUrl: 'build/components/mock-test-2/mock-test-2.component.html'
})
export class MockTest2Component implements OnInit {


  strings: string[] = ["Test 1", "Test 2"];

  questions: Question[] = [
    new Question(1,"A", ["Question 1"],[new Answer("A", "Answer 1")],[]),
    new Question(2, "A", ["Question 2"], [new Answer("A", "Answer 2")], []),
    new Question(3, "A", ["Question 3"], [new Answer("A", "Answer 3")], [])
  ];

  constructor() {

    // Get the supplied navigation key
    //this.navigationKey = navParams.get('navigationKey');
  }

  ngOnInit(): Promise<any> {

    return new Promise(resolve => {


      resolve();
    });

  }
}
