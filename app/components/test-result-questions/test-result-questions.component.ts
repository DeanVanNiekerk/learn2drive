import {Component, Input} from '@angular/core';

// Models
import {Question} from '../../models/question';
import {Answer} from '../../models/answer';
import {AnsweredQuestion} from '../../models/answered-question';

@Component({
    selector: 'test-result-questions',
    templateUrl: 'build/components/test-result-questions/test-result-questions.component.html'
})
export class TestResultQuestionsComponent {

  @Input() questions: Question[] = [];
  @Input() answeredQuestions: AnsweredQuestion[] = [];

  public isQuestionCorrectlyAnswered(question: Question): boolean {
    let userAnswerId = this.getUserAnswer(question.id);
    return question.answerId === userAnswerId;
  }

  public isCorrectAnswer(question: Question, answer: Answer): boolean {
    return question.answerId === answer.id;
  }

  public isUsersAnswer(question: Question, answer: Answer): boolean {
    return answer.id === this.getUserAnswer(question.id);
  }

  getUserAnswer(questionId: number): string {

    let answeredQuestion = this.answeredQuestions.find((aq) => {
        return aq.questionId === questionId;
    });

    if (!answeredQuestion)
      return '0';

    return answeredQuestion.answerId;
  }

}
