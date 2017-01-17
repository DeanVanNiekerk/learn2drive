import {
  inject,
  TestBed
} from '@angular/core/testing';

import {
  Http,
  BaseRequestOptions,
  Response,
  ResponseOptions
} from '@angular/http';

import { HttpModule } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { ResourceService } from './resource.service';

const mockHttpProvider = {
  provide: Http,
  deps: [MockBackend, BaseRequestOptions],
  useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
    return new Http(backend, defaultOptions);
  }
};

describe('Resource Service', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ResourceService,
        MockBackend,
        BaseRequestOptions,
        { provide: Http, useValue: mockHttpProvider }
      ]
    });
  });

  
  it('getResourceIndex: multiple items in index', inject(
    [ResourceService, MockBackend],
    (service: ResourceService, backend: MockBackend) => {
      backend.connections.subscribe((connection: MockConnection) => {

        // Given
        let items: any[] = [
          { 'Name': 'key1', 'Value': 'val1' },
          { 'Name': 'key2', 'Value': 'val2' }
        ];

        let response = new ResponseOptions({ body: JSON.stringify(items) });
        connection.mockRespond(new Response(response));
      });

      // When
      service.getResourceIndex()
        .then(items => {
          // Then
          expect(items['key1']).toEqual('val1');
          expect(items['key2']).toEqual('val2');
        });
    }));


  it('getResource: multiple items in index', inject(
    [ResourceService, MockBackend],
    (service: ResourceService, backend: MockBackend) => {
      backend.connections.subscribe((connection: MockConnection) => {

        // Given
        let items: any[] = [
          { 'Name': 'key1', 'Value': 'val1' },
          { 'Name': 'key2', 'Value': 'val2' }
        ];

        let response = new ResponseOptions({ body: JSON.stringify(items) });
        connection.mockRespond(new Response(response));
      });

      // When
      service.getResource('key2')
        .then(item => {
          // Then
          expect(item).toEqual('val2');
        });
    }));



});