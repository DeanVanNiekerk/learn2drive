import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ResourceService {
  
  private resourceFilePath = 'content/strings.json';

  private resourceData = null;

  constructor(private http: Http) {
  }

  private getData(): Promise<any> {
    if (this.resourceData) {
      return Promise.resolve(this.resourceData);
    }

    return new Promise(resolve => {
      this.http.get(this.resourceFilePath)
        .map(res => res.json())
        .subscribe(data => {
          this.resourceData = data;
          resolve(this.resourceData);
        });
    });
  }

  getResourceIndex(): Promise<any[]> {

    return new Promise(resolve => {
      this.getData().then(data => {
        
        let result = alasql('SELECT [Name], [Value] FROM ?', [data]);

        let index = [];
        result.forEach(item => {
            index[item.Name] = item.Value;
        });

        resolve(index);
      });
    });
  }


  getResource(key: string): Promise<string> {

    return new Promise(resolve => {
      this.getData().then(data => {
        
        let result = alasql(`
          SELECT [Name], [Value] 
          FROM ?
          WHERE [Name] = "${key}"`, [data]);

        resolve(result[0].Value);
      });
    });

  }
}

