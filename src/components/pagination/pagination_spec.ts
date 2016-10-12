import {componentSanityCheck} from '../../platform/testing/util';
import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {
  MdPagination,
  MdPaginationControls,
  MdPaginationItemsPerPage,
  MdPaginationRange,
  IPaginationModel,
  PaginationService
} from './index';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MdServicesModule} from '../../core/util/util.module';

describe('Pagination', () => {
  let service: PaginationService;

  componentSanityCheck('MdPagination', 'md-pagination', `<md-pagination></md-pagination>`);

  describe('MdPagination', () => {

    interface IPaginationFixture {
      fixture: ComponentFixture<TestComponent>;
      comp: MdPagination;
      debug: DebugElement;
    }
    @Component({
      selector: 'test-app',
      template: `<md-pagination></md-pagination>`
    })
    class TestComponent {
      defaultModel: IPaginationModel = {
        currentPage: 1,
        itemsPerPage: 5,
        totalItems: 24
      };

      defaultItemsPerPageOptions: Array<number> = [10, 50, 100];
    }


    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          MdPagination,
          MdPaginationControls,
          MdPaginationItemsPerPage,
          MdPaginationRange,
          TestComponent
        ],
        imports: [CommonModule, FormsModule, MdServicesModule],
        providers: [PaginationService]
      });
    });

    function setup(template: string = null): Promise<IPaginationFixture> {
      if (template) {
        TestBed.overrideComponent(TestComponent, {
          set: {
            template: template
          }
        });
      }
      return TestBed.compileComponents()
        .then(() => {
          service = TestBed.get(PaginationService);
          spyOn(service, 'change');

          const fixture = TestBed.createComponent(TestComponent);
          let debug = fixture.debugElement.query(By.css('md-pagination'));
          let comp: MdPagination = debug.componentInstance;
          fixture.detectChanges();
          return {
            fixture: fixture,
            comp: comp,
            debug: debug
          };
        })
        .catch(error => console.error.bind(console));
    }

    describe('default values', () => {

      it('should have a default model', async(() => {
        return setup().then((api: IPaginationFixture) => {
          expect(api.comp.model.currentPage).toEqual(0);
          expect(api.comp.model.itemsPerPage).toEqual(0);
          expect(api.comp.model.totalItems).toEqual(0);
        });
      }));

      it('should accept custom model', async(() => {
        return setup(`<md-pagination [model]="defaultModel"></md-pagination>`).then((api: IPaginationFixture) => {
          expect(api.comp.model.currentPage).toEqual(1);
          expect(api.comp.model.itemsPerPage).toEqual(5);
          expect(api.comp.model.totalItems).toEqual(24);
        });
      }));

      it('should have a default name', async(() => {
        return setup().then((api: IPaginationFixture) => {
          expect(api.comp.name).toEqual('default');
        });
      }));

      it('should accept a custom name', async(() => {
        return setup(`<md-pagination name="book"></md-pagination>`).then((api: IPaginationFixture) => {
          expect(api.comp.name).toEqual('book');
        });
      }));

      it('should display range by default', async(() => {
        return setup().then((api: IPaginationFixture) => {
          expect(api.comp.range).toBeTruthy();
        });
      }));

      it('should accept a custom display for range', async(() => {
        return setup(`<md-pagination [range]="false"></md-pagination>`).then((api: IPaginationFixture) => {
          expect(api.comp.range).toBeFalsy();
        });
      }));

      it('should not have a default rangeFormat', async(() => {
        return setup().then((api: IPaginationFixture) => {
          expect(api.comp.rangeFormat).toBeUndefined();
        });
      }));

      it('should accept a custom rangeFormat', async(() => {
        return setup(`<md-pagination range-format="{start}/{total}"></md-pagination>`).then((api: IPaginationFixture) => {
          expect(api.comp.rangeFormat).toEqual('{start}/{total}');
        });
      }));

      it('should display controls by default', async(() => {
        return setup().then((api: IPaginationFixture) => {
          expect(api.comp.controls).toBeTruthy();
        });
      }));

      it('should accept a custom display for controls', async(() => {
        return setup(`<md-pagination [controls]="false"></md-pagination>`).then((api: IPaginationFixture) => {
          expect(api.comp.controls).toBeFalsy();
        });
      }));

      it('should display items per page options by default', async(() => {
        return setup().then((api: IPaginationFixture) => {
          expect(api.comp.itemsPerPage).toBeTruthy();
        });
      }));

      it('should accept a custom display for items per page', async(() => {
        return setup(`<md-pagination [items-per-page]="false"></md-pagination>`).then((api: IPaginationFixture) => {
          expect(api.comp.itemsPerPage).toBeFalsy();
        });
      }));

      it('should not have a default prepended string to items per page', async(() => {
        return setup().then((api: IPaginationFixture) => {
          expect(api.comp.itemsPerPageBefore).toBeUndefined();
        });
      }));

      it('should accept a custom prepended string to items per page', async(() => {
        return setup(`<md-pagination items-per-page-before="page:"></md-pagination>`).then((api: IPaginationFixture) => {
          expect(api.comp.itemsPerPageBefore).toEqual('page:');
        });
      }));

      it('should not have a default appended string to items per page', async(() => {
        return setup().then((api: IPaginationFixture) => {
          expect(api.comp.itemsPerPageAfter).toBeUndefined();
        });
      }));

      it('should accept a custom appended string to items per page', async(() => {
        return setup(`<md-pagination items-per-page-after=" - "></md-pagination>`).then((api: IPaginationFixture) => {
          expect(api.comp.itemsPerPageAfter).toEqual(' - ');
        });
      }));

      it('should not have a default list of options for items per page', async(() => {
        return setup().then((api: IPaginationFixture) => {
          expect(api.comp.itemsPerPageOptions).toBeUndefined();
        });
      }));

      it('should accept a custom list of options for items per page', async(() => {
        return setup(`<md-pagination [items-per-page-options]="defaultItemsPerPageOptions"></md-pagination>`).then((api: IPaginationFixture) => {
          expect(api.comp.itemsPerPageOptions).not.toContain(5);
          expect(api.comp.itemsPerPageOptions).toContain(10);
          expect(api.comp.itemsPerPageOptions).toContain(50);
          expect(api.comp.itemsPerPageOptions).toContain(100);
        });
      }));

    });

    describe('construct', () => {
      let service: PaginationService;
      let updatedPagination: IPaginationModel = {
        currentPage: 2,
        itemsPerPage: 30,
        totalItems: 65
      };

      it('should listen PaginationService', async(() => {
        return setup().then((api: IPaginationFixture) => {
          api.comp.onPaginationChange.subscribe((event) => {
            expect(event.name).toEqual('pagination_changed');
            expect(event.target).toEqual('default');
            expect(event.pagination).toEqual(updatedPagination);
          });
          service = TestBed.get(PaginationService);
          service.change('default', updatedPagination);
        });
      }));

      it('should listen PaginationService only for his reference name', async(() => {
        setup(`<md-pagination name="book"></md-pagination>`).then((api: IPaginationFixture) => {
          let spy = jasmine.createSpy('spy');

          api.comp.onPaginationChange.subscribe(spy);
          service = TestBed.get(PaginationService);
          service.onChange.subscribe(() => {
            expect(spy).not.toHaveBeenCalled();
          });
          service.change('default', updatedPagination);
        });
      }));
    });

    describe('ngAfterContentInit', () => {

      it('should init default components', async(() => {
        return setup().then((api: IPaginationFixture) => {
          let element = api.debug.nativeElement;
          api.fixture.detectChanges();
          expect(element.children.length).toEqual(3);
        });
      }));

      it('should accept custom components as children', async(() => {
        return setup(`<md-pagination><button></button></md-pagination>`).then((api: IPaginationFixture) => {
          let element = api.debug.nativeElement;
          api.fixture.detectChanges();
          expect(element.children.length).toEqual(1);
        });
      }));

    });

    describe('ngAfterViewInit', () => {
      const defaultModel: IPaginationModel = {
        currentPage: 1,
        itemsPerPage: 30,
        totalItems: 65
      };

      it('should dispatch his model after init', async(() => {
        return setup(`<md-pagination name="book" [model]="defaultModel"></md-pagination>`).then((api: IPaginationFixture) => {

          expect(service.change).toHaveBeenCalled();
        });
      }));

    });

  });

});
