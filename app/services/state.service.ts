import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable() 
export class StateService {
  
    private modeObservable: Subject<string>;
    private modeBacking: string; 
  
    MODE_LEARN: string = 'learn';
    MODE_TEST: string = 'test';
 
    constructor() {
        // Default mode
        this.modeBacking = this.MODE_LEARN;
        this.modeObservable = <Subject<string>>new Subject();
        this.modeObservable.subscribe(mode => { this.modeBacking = mode; });
        
    }

    get mode(): Observable<string>  {
        return this.modeObservable.asObservable();
    }

    getCurrentMode(): string {
        return this.modeBacking;
    }

    toggleMode() {
        let newMode = this.modeBacking === this.MODE_LEARN ? this.MODE_TEST : this.MODE_LEARN;
        this.modeObservable.next(newMode);
    }

}