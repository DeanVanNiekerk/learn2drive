import {provide} from '@angular/core';
import {
  ResponseOptions,
  Response,
  Http,
  BaseRequestOptions,
  RequestMethod
} from '@angular/http';

import {
  describe,
  expect,
  it,
  inject,
  fakeAsync,
  beforeEachProviders
} from '@angular/core/testing';

import { MockBackend, MockConnection } from '@angular/http/testing';
import {QuestionService} from './question.service';

const mockHttpProvider = {
  deps: [ MockBackend, BaseRequestOptions ],
  useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
    return new Http(backend, defaultOptions);
  }
};
 
describe('Question Service', () => {
 
    beforeEachProviders(() => {
        return [
            MockBackend,
            BaseRequestOptions,
            provide(Http, mockHttpProvider),
            QuestionService
        ];
    });



   it('getQuestions: one question, one answer', inject(
    [QuestionService, MockBackend],
    fakeAsync((service: QuestionService, backend: MockBackend) => {
      backend.connections.subscribe((connection: MockConnection) => {

        // Given
        let items: any[] = [
            {
                "navPath": "1.2",
                "question": [
                    {
                        "id": "1",
                        "answer": "A",
                        "text": "Question 1",
                        "option": [
                            {
                                "id": "A",
                                "value": "Answer 1"
                            }
                        ]
                    }
                ]
            }
        ];

        let response = new ResponseOptions({body: JSON.stringify(items)});
        connection.mockRespond(new Response(response));
      });

      // When
      service.getQuestions('1.2')
        .then(questions => {
          // Then
          expect(questions.length).toEqual(1);

          let question = questions[0]; 
          expect(question.id).toEqual(1);
          expect(question.answerId).toEqual('A');

          expect(question.text.length).toEqual(1);
          expect(question.text[0]).toEqual('Question 1');

          expect(question.answers.length).toEqual(1);
          expect(question.answers[0].id).toEqual('A');
          expect(question.answers[0].text).toEqual('Answer 1');
        });
    })));


    it('getQuestions: one question, multi-text', inject(
    [QuestionService, MockBackend],
    fakeAsync((service: QuestionService, backend: MockBackend) => {
      backend.connections.subscribe((connection: MockConnection) => {

        // Given
        let items: any[] = [
            {
                "navPath": "1.2",
                "question": [
                    {
                        "id": "1",
                        "answer": "A",
                        "text": {
                        "list": [
                            "Q line 1",
                            "Q line 2"
                        ]
                        },
                        "option": []
                    }
                ]
            }
        ];

        let response = new ResponseOptions({body: JSON.stringify(items)});
        connection.mockRespond(new Response(response));
      });

      // When
      service.getQuestions('1.2')
        .then(questions => {
          // Then
          expect(questions.length).toEqual(1);

          let question = questions[0]; 

          expect(question.text.length).toEqual(2);
          expect(question.text[0]).toEqual('Q line 1');
          expect(question.text[1]).toEqual('Q line 2');
      
        });
    })));

    it('getQuestions: multiple questions', inject(
    [QuestionService, MockBackend],
    fakeAsync((service: QuestionService, backend: MockBackend) => {
      backend.connections.subscribe((connection: MockConnection) => {

        // Given
        let items: any[] = [
            {
                "navPath": "1.2",
                "question": [
                    {
                        "id": "1",
                        "answer": "A",
                        "text": "Question 1",
                        "option": []
                    },
                    {
                        "id": "2",
                        "answer": "A",
                        "text": "Question 2",
                        "option": []
                    }
                ]
            },
            {
                "navPath": "1.3",
                "question": [
                    {
                        "id": "3",
                        "answer": "A",
                        "text": "Question 3",
                        "option": []
                    }
                ]
            }
        ];

        let response = new ResponseOptions({body: JSON.stringify(items)});
        connection.mockRespond(new Response(response));
      });

      // When
      service.getQuestions('1.2')
        .then(questions => {
          // Then
          expect(questions.length).toEqual(2);

          expect(questions[0].id).toEqual(1);
          expect(questions[1].id).toEqual(2);

        });
    })));
  
});
