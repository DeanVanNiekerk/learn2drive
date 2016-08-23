import {Component, OnInit, Input} from '@angular/core';
import {NavController} from 'ionic-angular';

// Services
import {StoreService} from '../../services/store.service';
import {ContentService} from '../../services/content.service';


@Component({
  selector: 'content-progress',
  templateUrl: 'build/components/content-progress/content-progress.component.html'
})
export class ContentProgressComponent implements OnInit {

  @Input() navigationKey: string = '';
  progress: string = '';
  
  constructor(private navCtrl: NavController,
    private storeService: StoreService,
    private contentService: ContentService) { }

  ngOnInit() {
      this.navCtrl.viewDidEnter.subscribe((view) => {
        this.loadContentProgress();
      });
  }

  loadContentProgress() {
    this.storeService.getContentReadCount(this.navigationKey)
      .then(readCount => {
        
        this.contentService.getContentSectionCount(this.navigationKey)
          .then(sectionCount => {

            this.progress = `${readCount}/${sectionCount}`;

          });
      });
  }

}