import {Component, OnInit} from '@angular/core';


@Component({
  templateUrl: 'build/components/prototype/prototype.component.html'
})
export class ProtoTypeComponent implements OnInit {

  constructor() {

    // Get the supplied navigation key
    //this.navigationKey = navParams.get('navigationKey');
  }

  ngOnInit(): Promise<any> {

    return new Promise(resolve => {
      resolve();
    });

  }
}
