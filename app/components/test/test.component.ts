import {Component} from '@angular/core';


// Services
import {QuestionService} from '../../services/question.service';

// Models
import {Question} from '../../models/question';
import {Answer} from '../../models/answer';


@Component({
    selector: 'test',
    templateUrl: 'build/components/test/test.component.html'
})
export class TestComponent {

  navigationKey: string = '';
  questions: Question[] = [];

  constructor(private questionService: QuestionService) { }

  load(key: string) {

    this.questionService.getQuestions(key)
      .then(questions => {
        this.questions = questions;
      }); 
  }

}
