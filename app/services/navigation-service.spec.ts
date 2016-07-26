import {provide} from '@angular/core';
import {
  ResponseOptions,
  Response,
  Http,
  BaseRequestOptions,
  RequestMethod
} from '@angular/http';

import {
  describe,
  expect,
  it,
  inject,
  fakeAsync,
  beforeEachProviders
} from '@angular/core/testing';

import { MockBackend, MockConnection } from '@angular/http/testing';
import {NavigationService} from './navigation-service';

const mockHttpProvider = {
  deps: [ MockBackend, BaseRequestOptions ],
  useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
    return new Http(backend, defaultOptions);
  }
}
 
describe('Navigation Service', () => {
 
    beforeEachProviders(() => {
        return [
            MockBackend,
            BaseRequestOptions,
            provide(Http, mockHttpProvider)
        ];
    });



   it('should parse the server response correctly', inject(
    [NavigationService, MockBackend],
    fakeAsync((service: NavigationService, backend: MockBackend) => {
      backend.connections.subscribe((connection: MockConnection) => {

        let mockResponseBody: any[] = [{
          Node: '1.1'
        }];

        let response = new ResponseOptions({body: JSON.stringify(mockResponseBody)});
        connection.mockRespond(new Response(response));
      });

      const parsedQuote$ = service.getNavigationItems("1")
        .then(items => {
          expect(items.length).toEqual(1);
        });
    })));
 
});