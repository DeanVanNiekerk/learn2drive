import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Question, Answer } from '../models';

@Injectable()
export class QuestionService {

  private questionFilePath = 'content/questions.json';
  private questionData = null;

  constructor(private http: Http) {
  }

  private getData(): Promise<any> {
    if (this.questionData) {
      return Promise.resolve(this.questionData);
    }

    return new Promise(resolve => {
      this.http.get(this.questionFilePath)
        .map(res => res.json())
        .subscribe(data => {
          this.questionData = data;
          resolve(this.questionData);
        });
    });
  }

  public getQuestionsByKeys(keys: string[], count: number): Promise<Question[]> {

    return new Promise(resolve => {
      this.getData().then(data => {

        let whereClause = `WHERE `;
        keys.forEach((key, index) => {

          if (index !== 0)
            whereClause += ` OR `;

          whereClause += `navPath LIKE "${key}%"`;
        });

        let result = alasql(`
          SELECT question
          FROM ? 
          ${whereClause}`
          , [data]);

        let models = new Array<Question>();
        result.forEach(item => {

          if (!Array.isArray(item.question)) {
            models.push(this.mapQuestion(item.question));
            return;
          }

          item.question.forEach(question => {
            models.push(this.mapQuestion(question));
          });

        });

        // Select random questions
        models = this.getRandomQuestions(models, count);

        resolve(models);

      });
    });
  }

  public getQuestions(key: string, count: number): Promise<Question[]> {
    return this.getQuestionsByKeys([key], count);
  }

  private getRandomQuestions(questions: Question[], max): Question[] {

    // Shuffle
    questions.sort(() => { return 0.5 - Math.random(); });

    // Take top
    return questions.slice(0, max);

  }

  private mapQuestion(question: any): Question {

    // Get answers
    let answers = new Array<Answer>();
    question.option.forEach(option => {
      answers.push(new Answer(option.id, option.value));
    });

    // Get question text
    let text = new Array<string>();
    if (typeof question.text === 'string') {
      text.push(question.text);
    } else {
      question.text.list.forEach(questionText => {
        text.push(questionText);
      });
    }

    // Get images
    let images = new Array<string>();
    if (question.image)
      images.push(question.image);
    if (question.image2)
      images.push(question.image2);

    return new Question(parseInt(question.id), question.answer, text, answers, images);

  }


}