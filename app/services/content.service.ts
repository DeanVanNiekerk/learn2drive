import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {NavigationItem} from '../models/navigation-item';
import {Content} from '../models/content';


@Injectable()
export class ContentService {
  
  private rulesOfTheRoadFilePath = 'content/content.json';

  private rulesOfTheRoadData = null;

  constructor(private http: Http) {
  }

  getData(): Promise<any> {
    if (this.rulesOfTheRoadData) {
      return Promise.resolve(this.rulesOfTheRoadData);
    }

    return new Promise(resolve => {
      this.http.get(this.rulesOfTheRoadFilePath)
        .map(res => res.json())
        .subscribe(data => {
          this.rulesOfTheRoadData = data;
          resolve(this.rulesOfTheRoadData);
        });
    });
  }

  getNavigationItems(key: string): Promise<NavigationItem[]> {

    return new Promise(resolve => {
      this.getData().then(data => {
        
        let result = alasql(`
          SELECT DISTINCT Node 
          FROM ? 
          WHERE Node LIKE "${key}.%"`
          , [data]);

        // Get list of nav items one level down
        let level = key.split('.').length;
        let oneLevelDown = result.map(function(item){
            let name = item.Node.split('.')[level];
            return `${key}.${name}`;
        });

        // Filter out duplicates
        oneLevelDown = oneLevelDown.filter(function(x, i) {
          return oneLevelDown.indexOf(x) === i;
        });

        // Map to model
        let models = oneLevelDown.map(function(item){
          return new NavigationItem(item);
        });
        
        resolve(models);
      });
    });
  }

  getContent(key: string): Promise<Content[]> {

    return new Promise(resolve => {
      this.getData().then(data => {

          let result = alasql(`
            SELECT Heading, Description
            FROM ? 
            WHERE Node = "${key}"`
            , [data]);

          // Map to model
          let models = result.map(function(item){
            return new Content(item.Heading, item.Description);
          });
        
          resolve(models);

      });
    });
  }
}

