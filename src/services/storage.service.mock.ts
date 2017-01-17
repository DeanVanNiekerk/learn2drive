'use strict';

import { Injectable } from '@angular/core';

@Injectable()
export class StorageServiceMock {

  public returnValue = null;

  public get(key: string): Promise<{}> {
    return new Promise((resolve: Function) => {
      resolve(this.returnValue);
    });
  }

  public set(key: string, value: string): Promise<{}> {
    return new Promise((resolve: Function) => {
      resolve({key: key, value: value});
    });
  }

  public remove(key: string): Promise<{}> {
    return new Promise((resolve: Function) => {
      resolve({key: key});
    });
  }
}
