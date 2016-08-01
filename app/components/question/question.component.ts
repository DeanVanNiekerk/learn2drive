import {Component, Input, Output, EventEmitter} from '@angular/core';

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

  @Output() questionAnsweredEvent: EventEmitter<any> = new EventEmitter<any>();

  selectedAnswerId: string = '';

  constructor() { 
  }

  selectAnswer(answerId: string) {
    this.selectedAnswerId = answerId;
  }

  answerChanged() {
    if (this.selectedAnswerId === '')
      return;

    this.questionAnsweredEvent.emit({
      questionId: this.question.id, 
      selectedAnswerId: this.selectedAnswerId
    });
  }

}
