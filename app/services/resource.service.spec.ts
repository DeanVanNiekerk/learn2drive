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
import {ResourceService} from './resource.service';

const mockHttpProvider = {
  deps: [ MockBackend, BaseRequestOptions ],
  useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
    return new Http(backend, defaultOptions);
  }
};
 
describe('Resource Service', () => {
 
    beforeEachProviders(() => {
        return [
            MockBackend,
            BaseRequestOptions,
            provide(Http, mockHttpProvider),
            ResourceService
        ];
    });



   it('getResourceIndex: multiple items in index', inject(
    [ResourceService, MockBackend],
    fakeAsync((service: ResourceService, backend: MockBackend) => {
      backend.connections.subscribe((connection: MockConnection) => {

        // Given
        let items: any[] = [
            { 'Name': 'key1', 'Value': 'val1' },
            { 'Name': 'key2', 'Value': 'val2' }
        ];

        let response = new ResponseOptions({body: JSON.stringify(items)});
        connection.mockRespond(new Response(response));
      });

      // When
      service.getResourceIndex()
        .then(items => {
          // Then
          expect(items['key1']).toEqual('val1');
          expect(items['key2']).toEqual('val2');
        });
    })));


  
});