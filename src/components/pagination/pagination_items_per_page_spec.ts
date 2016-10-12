import {componentSanityCheck} from '../../platform/testing/util';
import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {MdPaginationItemsPerPage, IPaginationModel, PaginationService} from './index';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MdServicesModule} from '../../core/util/util.module';

describe('Pagination', () => {

  componentSanityCheck('MdPaginationItemsPerPage', 'md-pagination-items-per-page', `<md-pagination-items-per-page></md-pagination-items-per-page>`);

  describe('MdPaginationItemsPerPage', () => {
    interface IPaginationItemsPerPageFixture {
      fixture: ComponentFixture<TestComponent>;
      comp: MdPaginationItemsPerPage;
      debug: DebugElement;
    }
    @Component({
      selector: 'test-app',
      template: `<md-pagination-items-per-page></md-pagination-items-per-page>`
    })
    class TestComponent {
      page1: IPaginationModel = {
        currentPage: 1,
        itemsPerPage: 30,
        totalItems: 65
      };
      page2: IPaginationModel = {
        currentPage: 2,
        itemsPerPage: 30,
        totalItems: 65
      };

      defaultItemsPerPageOptions: Array<number> = [10, 50, 100];
    }

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          MdPaginationItemsPerPage,
          TestComponent
        ],
        imports: [CommonModule, FormsModule, MdServicesModule],
        providers: [PaginationService]
      });
    });

    function setup(template: string = null): Promise<IPaginationItemsPerPageFixture> {
      if (template) {
        TestBed.overrideComponent(TestComponent, {
          set: {
            template: template
          }
        });
      }
      return TestBed.compileComponents()
        .then(() => {
          const fixture = TestBed.createComponent(TestComponent);
          let debug = fixture.debugElement.query(By.css('md-pagination-items-per-page'));
          let comp: MdPaginationItemsPerPage = debug.componentInstance;
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
        return setup().then((api: IPaginationItemsPerPageFixture) => {
          expect(api.comp.model.currentPage).toEqual(0);
          expect(api.comp.model.itemsPerPage).toEqual(0);
          expect(api.comp.model.totalItems).toEqual(0);
        });
      }));

      it('should accept custom model', async(() => {
        return setup(`<md-pagination-items-per-page [model]="page2"></md-pagination-items-per-page>`).then((api: IPaginationItemsPerPageFixture) => {
          expect(api.comp.model.currentPage).toEqual(2);
          expect(api.comp.model.itemsPerPage).toEqual(30);
          expect(api.comp.model.totalItems).toEqual(65);
        });
      }));

      it('should have a default name', async(() => {
        return setup().then((api: IPaginationItemsPerPageFixture) => {
          expect(api.comp.name).toEqual('default');
        });
      }));

      it('should accept a custom name', async(() => {
        return setup(`<md-pagination-items-per-page name="book"></md-pagination-items-per-page>`).then((api: IPaginationItemsPerPageFixture) => {
          expect(api.comp.name).toEqual('book');
        });
      }));

      it('should have a default prepended string', async(() => {
        return setup().then((api: IPaginationItemsPerPageFixture) => {
          expect(api.comp.itemsPerPageBefore).toEqual('Rows per page:');
        });
      }));

      it('should accept a custom prepended string', async(() => {
        return setup(`<md-pagination-items-per-page items-per-page-before="Items per page:"></md-pagination-items-per-page>`).then((api: IPaginationItemsPerPageFixture) => {
          expect(api.comp.itemsPerPageBefore).toEqual('Items per page:');
        });
      }));

      it('should not have a default appended string', async(() => {
        return setup().then((api: IPaginationItemsPerPageFixture) => {
          expect(api.comp.itemsPerPageAfter).toBeUndefined();
        });
      }));

      it('should accept a custom appended string', async(() => {
        return setup(`<md-pagination-items-per-page items-per-page-after=" - "></md-pagination-items-per-page>`).then((api: IPaginationItemsPerPageFixture) => {
          expect(api.comp.itemsPerPageAfter).toEqual(' - ');
        });
      }));

      it('should have a empty list of options for items per page', async(() => {
        return setup().then((api: IPaginationItemsPerPageFixture) => {
          expect(api.comp.itemsPerPageOptions).toEqual([]);
        });
      }));

      it('should accept a custom list of options for items per page', async(() => {
        return setup(`<md-pagination-items-per-page [items-per-page-options]="defaultItemsPerPageOptions"></md-pagination-items-per-page>`).then((api: IPaginationItemsPerPageFixture) => {
          expect(api.comp.itemsPerPageOptions).not.toContain(5);
          expect(api.comp.itemsPerPageOptions).toContain(10);
          expect(api.comp.itemsPerPageOptions).toContain(50);
          expect(api.comp.itemsPerPageOptions).toContain(100);
        });
      }));

    });

    describe('construct', () => {
      const updatedPagination: IPaginationModel = {
        currentPage: 1,
        itemsPerPage: 30,
        totalItems: 65
      };

      it('should listen PaginationService', async(() => {
        return setup().then((api: IPaginationItemsPerPageFixture) => {
          const service = TestBed.get(PaginationService);
          service.onChange.subscribe((event) => {
            expect(api.comp.model).toEqual(updatedPagination);
          });

          service.change('default', updatedPagination);
        });
      }));

      it('should listen PaginationService only for his reference name', async(() => {
        return setup(`<md-pagination-items-per-page name="book"></md-pagination-items-per-page>`).then((api: IPaginationItemsPerPageFixture) => {
          const service = TestBed.get(PaginationService);
          service.onChange.subscribe(() => {
            expect(api.comp.model.currentPage).toEqual(0);
            expect(api.comp.model.itemsPerPage).toEqual(0);
            expect(api.comp.model.totalItems).toEqual(0);
          });

          service.change('default', updatedPagination);
        });
      }));
    });

    describe('changePaginationLength', () => {

      it('should dispatch page change to the service and reset to first page', async(() => {
        return setup(`<md-pagination-items-per-page [model]="page2"></md-pagination-items-per-page>`).then((api: IPaginationItemsPerPageFixture) => {
          const service = TestBed.get(PaginationService);
          spyOn(service, 'change');
          api.comp.changePaginationLength(50);
          expect(service.change).toHaveBeenCalledWith('default', {
            currentPage: 1,
            itemsPerPage: 50,
            totalItems: 65
          });
        });
      }));

    });

  });

});
