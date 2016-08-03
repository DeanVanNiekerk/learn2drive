import {Component, Input, Output, EventEmitter} from '@angular/core';

// Models
import {Question} from '../../models/question';
import {Answer} from '../../models/answer';
import {AnsweredQuestion} from '../../models/answered-question';


@Component({
    selector: 'question',
    templateUrl: 'build/components/question/question.component.html'
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
