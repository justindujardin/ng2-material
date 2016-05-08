import {beforeEachProviders, describe, expect, it, inject} from '@angular/core/testing';
import {SiteAppComponent} from '../app/site.component';

beforeEachProviders(() => [SiteAppComponent]);

describe('App: Site', () => {
  it('should create the app',
     inject([SiteAppComponent], (app: SiteAppComponent) => { expect(app).toBeTruthy(); }));

  it('should have as title \'site works!\'', inject([SiteAppComponent], (app: SiteAppComponent) => {
       expect(app.title).toEqual('site works!');
     }));
});
