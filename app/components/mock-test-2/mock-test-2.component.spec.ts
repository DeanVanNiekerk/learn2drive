import { beforeEach, beforeEachProviders, describe, expect, it }          from '@angular/core/testing';
import { asyncCallbackFactory, injectAsyncWrapper, providers }            from '../../../test/ionic-test-shim';


import {MockTest2Component} from './mock-test-2.component';


this.builder = null;
this.fixture = null;
this.instance = null;


describe('MockTest2 Component Tests', () => {


  let beforeEachFn: Function = ((testSpec) => {
    //testSpec.instance['clicker'] = { name: 'TEST CLICKER' };
    //testSpec.instance['clicker'].getCount = function(): number { return 10; };
  });


  beforeEachProviders(() => providers);
  beforeEach(injectAsyncWrapper(asyncCallbackFactory(MockTest2Component, this, false, beforeEachFn)));



   it('shows a list of questions by default', () => {

       let nativeElement = this.fixture.nativeElement;

       this.fixture.detectChanges();

       expect(nativeElement
         .querySelectorAll('question').length).toBe(3);

 });


});
