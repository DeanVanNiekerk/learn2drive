import {Component} from '@angular/core';
import {ContentComponent} from '../content/content.component';
import {TestPage} from '../test/test';
import {MockTestPage} from '../mock-test/mock-test';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = ContentComponent;
    this.tab2Root = TestPage;
    this.tab3Root = MockTestPage;
  }
}
