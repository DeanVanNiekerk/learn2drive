import {Component, OnInit, Input} from '@angular/core';
import {NavController} from 'ionic-angular';

// Services
import {ProgressService} from '../../services/progress.service';


@Component({
  selector: 'checklist-progress',
  templateUrl: 'build/components/checklist-progress/checklist-progress.component.html'
})
export class ChecklistProgressComponent implements OnInit {

  completeCount: number = 0;
  totalCount: number = 8;
  
  constructor(private navCtrl: NavController,
    private progressService: ProgressService) { 

  }

  ngOnInit() {
    this.loadChecklistProgress();
  }

  loadChecklistProgress() {

    this.progressService.getChecklistProgress()
      .then(progress => {
        this.totalCount = progress.total;
        this.completeCount = progress.complete;
      }
    );
  }
}