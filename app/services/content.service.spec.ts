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
import {ContentService} from './content.service';

const mockHttpProvider = {
  deps: [ MockBackend, BaseRequestOptions ],
  useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
    return new Http(backend, defaultOptions);
  }
};
 
describe('Navigation Service', () => {
 
    beforeEachProviders(() => {
        return [
            MockBackend,
            BaseRequestOptions,
            provide(Http, mockHttpProvider),
            ContentService
        ];
    });



   it('getNavigationItems: one item', inject(
    [ContentService, MockBackend],
    fakeAsync((service: ContentService, backend: MockBackend) => {
      backend.connections.subscribe((connection: MockConnection) => {

        // Given
        let items: any[] = [
          { Node: '1.2' }
        ];

        let response = new ResponseOptions({body: JSON.stringify(items)});
        connection.mockRespond(new Response(response));
      });

      // When
      service.getNavigationItems('1')
        .then(items => {
          // Then
          expect(items.length).toEqual(1);
          expect(items[0].key).toEqual('1.2');
        });
    })));


    it('getNavigationItems: multiple items', inject(
    [ContentService, MockBackend],
    fakeAsync((service: ContentService, backend: MockBackend) => {
      backend.connections.subscribe((connection: MockConnection) => {

        // Given
        let items: any[] = [
          { Node: 'a.b.c.d.f' },
          { Node: 'a.b.c.e' },
          { Node: 'a.b.c' },
          { Node: 'a.b' },
          { Node: 'a.b.g' },
          { Node: 'a.b.g.h' }
        ];

        let response = new ResponseOptions({body: JSON.stringify(items)});
        connection.mockRespond(new Response(response));
      });

      // When
      service.getNavigationItems('a.b')
        .then(items => {
          // Then
          expect(items.length).toEqual(2);
          expect(items[0].key).toEqual('a.b.c');
          expect(items[1].key).toEqual('a.b.g');
        });
    })));



    it('getContent: multiple items', inject(
    [ContentService, MockBackend],
    fakeAsync((service: ContentService, backend: MockBackend) => {
      backend.connections.subscribe((connection: MockConnection) => {

        // Given
        let items: any[] = [
          { Node: '1.2', Heading: 'Heading1', Description: 'Description1' },
          { Node: '1.2', Heading: 'Heading2', Description: 'Description2' },
          { Node: '1.2.3', Heading: 'Heading3', Description: 'Description3' },
        ];

        let response = new ResponseOptions({body: JSON.stringify(items)});
        connection.mockRespond(new Response(response));
      });

      // When
      service.getContent('1.2')
        .then(items => {
          // Then
          expect(items.length).toEqual(2);
          
          // Item1
          expect(items[0].heading).toEqual('Heading1');
          expect(items[0].text).toEqual('Description1');

          // Item2
          expect(items[1].heading).toEqual('Heading2');
          expect(items[1].text).toEqual('Description2');
        });
    })));
 

    it('getContentSectionCount: multiple items', inject(
    [ContentService, MockBackend],
    fakeAsync((service: ContentService, backend: MockBackend) => {
      backend.connections.subscribe((connection: MockConnection) => {

        // Given
        let items: any[] = [
          { Node: '1.2' },
          { Node: '1.2' },
          { Node: '1.2.3' },
          { Node: '1.2.3.4' },
          { Node: '1.2.3' },
          { Node: '1.3.4' },
        ];

        let response = new ResponseOptions({body: JSON.stringify(items)});
        connection.mockRespond(new Response(response));
      });

      // When
      service.getContentSectionCount('1.2')
        .then(count => {
          // Then
          expect(count).toEqual(3);
        });
    })));
 
});