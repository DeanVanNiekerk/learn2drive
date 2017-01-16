import { L2D3DApp }                      from './app.component';
import { MenuMock, NavMock, PlatformMock } from '../mocks';


let instance: L2D3DApp = null;

describe('L2D3DApp', () => {

  beforeEach(() => {
    instance = new L2D3DApp((<any> new PlatformMock));
  });



  it('initialises with a root page', () => {
    expect(instance['rootPage']).not.toBe(null);
  });

  
});
