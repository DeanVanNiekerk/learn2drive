import {Component, OnInit, Input} from '@angular/core';
import {NavController} from 'ionic-angular';

// Services
import {ProgressService} from '../../services/progress.service';


@Component({
  selector: 'content-progress',
  templateUrl: 'build/components/content-progress/content-progress.component.html'
})
export class ContentProgressComponent implements OnInit {

  @Input() navigationKey: string = '';

  progress: string = '';
  complete: boolean = false;
  
  constructor(private navCtrl: NavController,
    private progressService: ProgressService) { 

  }

  ngOnInit() {
    this.loadContentProgress();
  }

  loadContentProgress() {

    this.progressService.getContentProgress(this.navigationKey)
      .then(progress => {
          this.progress = `${progress.complete}/${progress.total}`;
          this.complete = progress.isComplete();
      });
  }

}