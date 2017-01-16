import {Component, Input, Output, EventEmitter} from '@angular/core';

// Models
import {Question, Answer, AnsweredQuestion} from '../../models';

@Component({
    selector: 'question',
    templateUrl: './question.component.html'
})
export class QuestionComponent {

  @Input() question: Question;
  @Input() questionNumber: number;

  @Output() answerChangedEvent: EventEmitter<AnsweredQuestion> = new EventEmitter<AnsweredQuestion>();

  selectedAnswerId: string = '';

  constructor() {
  }

  selectAnswer(answerId: string) {
    this.selectedAnswerId = answerId;
  }

  answerChanged() {
    if (this.selectedAnswerId === '')
      return;

    let answeredQuestion = new AnsweredQuestion(this.question.id, this.selectedAnswerId);

    this.answerChangedEvent.emit(answeredQuestion);
  }

}
