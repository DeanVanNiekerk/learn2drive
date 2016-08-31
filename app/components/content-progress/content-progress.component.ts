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
    private contentService: ContentService) { 

  }

  ngOnInit() {
    this.loadContentProgress();
  }

  loadContentProgress() {

    console.log(`ContentProgress START: ${this.navigationKey}`);

    this.storeService.getContentReadCount(this.navigationKey)
      .then(readCount => {

        console.log(`ContentProgress Content Read Count: ${this.navigationKey}`);
        
        this.contentService.getContentSectionCount(this.navigationKey)
          .then(sectionCount => {

            console.log(`ContentProgress Content Section Count: ${this.navigationKey}`);

            this.progress = `${readCount}/${sectionCount}`;

          });
      });
  }

}