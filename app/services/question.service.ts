import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {Question} from '../models/question';
import {Answer} from '../models/answer';


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

  getQuestions(key: string): Promise<Question[]> {

    return new Promise(resolve => {
      this.getData().then(data => {
        
        let result = alasql(`
          SELECT question 
          FROM ? 
          WHERE navPath = "${key}"`
          , [data]);

        let models = new Array<Question>();
        result.forEach(item => {
            item.question.forEach(question => {

                let answers = new Array<Answer>();
                question.option.forEach(option => {
                    answers.push(new Answer(option.id, option.value))
                });

                let text = new Array<string>();
                if(typeof question.text === "string") {
                    text.push(question.text);
                }
                else {
                    question.text.list.forEach(questionText => {
                        text.push(questionText);
                    });
                }

                let images = new Array<string>();
                if(question.image)
                  images.push(question.image);
                if(question.image2)  
                  images.push(question.image2);

                models.push(new Question(parseInt(question.id), question.answer, text, answers, images));
            });
        });
        
        resolve(models);

      });
    });
  }


}