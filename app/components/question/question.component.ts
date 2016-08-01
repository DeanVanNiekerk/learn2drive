import {Component, Input, Output} from '@angular/core';

// Models
import {Question} from '../../models/question';
import {Answer} from '../../models/answer';


@Component({
    selector: 'question',
    templateUrl: 'build/components/question/question.component.html'
})
export class QuestionComponent {

  @Input() question: Question;
  @Input() questionNumber: number;

  constructor(private questionService: QuestionService) { 
  }

}
