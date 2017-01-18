import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';

import {NavigationItem, Content} from '../models';
import {StorageService} from '../services';

@Injectable()
export class ContentService {

  private contentFilePath = 'content/content.json';
  private contentData = null;

  constructor(private http: Http) {
  }

  private getData(): Promise<any> {
    if (this.contentData) {
      return Promise.resolve(this.contentData);
    }

    return new Promise(resolve => {
      this.http.get(this.contentFilePath)
        .map(res => res.json())
        .subscribe(data => {
          this.contentData = data;
          resolve(this.contentData);
        });
    });
  }

  // Gets a list of navidation items one level down
  public getNavigationItems(key: string): Promise<NavigationItem[]> {

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

  // Gets all navigations items below
  public getAllNavigationItems(key: string): Promise<NavigationItem[]> {

      return new Promise(resolve => {

        this.getData().then(data => {
        
          let result = alasql(`
            SELECT DISTINCT Node 
            FROM ? 
            WHERE Node LIKE "${key}.%"`
            , [data]);

          let items = [];

          // First add top level
          items.push(key);

          // Get list of nav items
          let level = key.split('.').length;

          result.forEach(item => {

            let currentKey = key;
            let split = item.Node.split('.');

            for (var i = level; i < split.length; i++) {
              currentKey = `${currentKey}.${split[i]}`;
              items.push(currentKey.toString());
            }
            
          });

          // Filter out duplicates
          items = items.filter(function(x, i) {
            return items.indexOf(x) === i;
          });

          // Map to model
          let models = items.map(function(item){
            return new NavigationItem(item);
          });
          
          resolve(models);
        });

        
      });
  }

  public getContent(key: string): Promise<Content[]> {

    return new Promise(resolve => {
      this.getData().then(data => {

          let result = alasql(`
            SELECT Heading, Description, ImageName
            FROM ? 
            WHERE Node = "${key}"`
            , [data]);

          // Map to model
          let models = result.map(function(item){
            return new Content(item.Heading, item.Description, item.ImageName);
          });
        
          resolve(models);

      });
    });
  }

  public getContentSectionCount(key: string): Promise<number> {

    return new Promise(resolve => {
      this.getData().then(data => {

          let result = alasql(`
            SELECT COUNT (DISTINCT Node) AS [count]
            FROM ? 
            WHERE Node LIKE "${key}%"`
            , [data]);

          resolve(result[0].count);
      });
    });
  }

}

