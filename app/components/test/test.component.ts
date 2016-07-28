import {Component} from '@angular/core';


// Services
import {QuestionService} from '../../services/question.service';

// Models



@Component({
    selector: 'test',
    templateUrl: 'build/components/test/test.component.html'
})
export class TestComponent {

  navigationKey: string = '';
  

  constructor(private questionService: QuestionService) {

  }

  load(key: string) {
   
  }

}
