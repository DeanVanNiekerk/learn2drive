'use strict';
import { Injectable } from '@angular/core';
import { Storage }    from '@ionic/storage';

@Injectable()
export class StorageService {

  private storage: Storage;

  public static KEY_CONTENTREAD: string = 'CONTENT_READ';

  constructor() {
    this.storage = StorageService.initStorage();
  }

  public static initStorage(): Storage {
    return new Storage();
  }

  public get(key: string): Promise<{}> {
    return this.storage.get(key);
  }

  public set(key: string, value: string): Promise<{}> {
    return this.storage.set(key, value);
  }

  public remove(key: string): Promise<{}> {
    return this.storage.remove(key);
  }
}
