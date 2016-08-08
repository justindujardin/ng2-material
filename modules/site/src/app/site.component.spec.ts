import {addProviders, inject} from '@angular/core/testing';
import {SiteAppComponent} from '../app/site.component';

beforeEach(() => {
  addProviders([
    SiteAppComponent,
  ]);
});

describe('App: Site', () => {
  it('should create the app',
     inject([SiteAppComponent], (app: SiteAppComponent) => { expect(app).toBeTruthy(); }));

  it('should have a name', inject([SiteAppComponent], (app: SiteAppComponent) => {
       expect(app.site).toEqual('Angular2 Material');
     }));
});
