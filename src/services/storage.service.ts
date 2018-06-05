'use strict';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageService {

  public static KEY_CONTENTREAD: string = 'CONTENT_READ';
  public static KEY_TESTRESULTS: string = 'TEST_RESULTS';
  public static KEY_MOCKTESTRESULTS: string = 'MOCK_TEST_RESULTS';
  public static KEY_CHECKLIST: string = 'CHECKLIST';
  public static KEY_MESSAGES: string = 'MESSAGES';

  constructor(private storage: Storage) {
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

  public clear(): Promise<void> {
    return this.storage.clear();
  }
}
