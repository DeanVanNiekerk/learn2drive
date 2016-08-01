import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

// Services
import {QuestionService} from '../../services/question.service';

// Models
import {Question} from '../../models/question';
import {Answer} from '../../models/answer';

// Pipes
import {TranslatePipe} from '../../pipes/translate.pipe.ts';

@Component({
    pipes: [TranslatePipe],
    templateUrl: 'build/components/test/test.component.html'
})
export class TestComponent implements OnInit {

  navigationKey: string = '';
  questions: Question[] = [];

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private questionService: QuestionService) { 

      // Get the supplied navigation key
      this.navigationKey = navParams.get('navigationKey');
  }
 
  ngOnInit() {

    this.questionService.getQuestions(this.navigationKey)
      .then(questions => {
        this.questions = questions;
      }); 
  }

}
