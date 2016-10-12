import {componentSanityCheck} from '../../platform/testing/util';
import {inject, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {MdPaginationItemsPerPage, IPaginationModel, PaginationService} from './index';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

describe('Pagination', () => {

  componentSanityCheck('MdPaginationItemsPerPage', 'md-pagination-items-per-page', `<md-pagination-items-per-page></md-pagination-items-per-page>`);

  describe('MdPaginationItemsPerPage', () => {
    let service: PaginationService;

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
        imports: [CommonModule, FormsModule],
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
        .then(inject([PaginationService], (serv) => {
          service = serv;
        }))
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

      it('should have a default model', () => {
        return setup().then((api: IPaginationItemsPerPageFixture) => {
          expect(api.comp.model.currentPage).toEqual(0);
          expect(api.comp.model.itemsPerPage).toEqual(0);
          expect(api.comp.model.totalItems).toEqual(0);
        });
      });

      it('should accept custom model', () => {
        return setup(`<md-pagination-items-per-page [model]="page2"></md-pagination-items-per-page>`).then((api: IPaginationItemsPerPageFixture) => {
          expect(api.comp.model.currentPage).toEqual(2);
          expect(api.comp.model.itemsPerPage).toEqual(30);
          expect(api.comp.model.totalItems).toEqual(65);
        });
      });

      it('should have a default name', () => {
        return setup().then((api: IPaginationItemsPerPageFixture) => {
          expect(api.comp.name).toEqual('default');
        });
      });

      it('should accept a custom name', () => {
        return setup(`<md-pagination-items-per-page name="book"></md-pagination-items-per-page>`).then((api: IPaginationItemsPerPageFixture) => {
          expect(api.comp.name).toEqual('book');
        });
      });

      it('should have a default prepended string', () => {
        return setup().then((api: IPaginationItemsPerPageFixture) => {
          expect(api.comp.itemsPerPageBefore).toEqual('Rows per page:');
        });
      });

      it('should accept a custom prepended string', () => {
        return setup(`<md-pagination-items-per-page items-per-page-before="Items per page:"></md-pagination-items-per-page>`).then((api: IPaginationItemsPerPageFixture) => {
          expect(api.comp.itemsPerPageBefore).toEqual('Items per page:');
        });
      });

      it('should not have a default appended string', () => {
        return setup().then((api: IPaginationItemsPerPageFixture) => {
          expect(api.comp.itemsPerPageAfter).toBeUndefined();
        });
      });

      it('should accept a custom appended string', () => {
        return setup(`<md-pagination-items-per-page items-per-page-after=" - "></md-pagination-items-per-page>`).then((api: IPaginationItemsPerPageFixture) => {
          expect(api.comp.itemsPerPageAfter).toEqual(' - ');
        });
      });

      it('should have a empty list of options for items per page', () => {
        return setup().then((api: IPaginationItemsPerPageFixture) => {
          expect(api.comp.itemsPerPageOptions).toEqual([]);
        });
      });

      it('should accept a custom list of options for items per page', () => {
        return setup(`<md-pagination-items-per-page [items-per-page-options]="defaultItemsPerPageOptions"></md-pagination-items-per-page>`).then((api: IPaginationItemsPerPageFixture) => {
          expect(api.comp.itemsPerPageOptions).not.toContain(5);
          expect(api.comp.itemsPerPageOptions).toContain(10);
          expect(api.comp.itemsPerPageOptions).toContain(50);
          expect(api.comp.itemsPerPageOptions).toContain(100);
        });
      });

    });

    describe('construct', () => {
      let service: PaginationService,
        updatedPagination: IPaginationModel = {
          currentPage: 1,
          itemsPerPage: 30,
          totalItems: 65
        };

      beforeEach(inject([PaginationService], (serv) => {
        service = serv;
      }));

      it('should listen PaginationService', () => {
        return setup().then((api: IPaginationItemsPerPageFixture) => {
          service.onChange.subscribe((event) => {
            expect(api.comp.model).toEqual(updatedPagination);
          });

          service.change('default', updatedPagination);
        });
      });

      it('should listen PaginationService only for his reference name', () => {
        return setup(`<md-pagination-items-per-page name="book"></md-pagination-items-per-page>`).then((api: IPaginationItemsPerPageFixture) => {
          service.onChange.subscribe(() => {
            expect(api.comp.model.currentPage).toEqual(0);
            expect(api.comp.model.itemsPerPage).toEqual(0);
            expect(api.comp.model.totalItems).toEqual(0);
          });

          service.change('default', updatedPagination);
        });
      });
    });

    describe('changePaginationLength', () => {

      beforeEach(() => {
        spyOn(service, 'change');
      });

      it('should dispatch page change to the service and reset to first page', () => {
        return setup(`<md-pagination-items-per-page [model]="page2"></md-pagination-items-per-page>`).then((api: IPaginationItemsPerPageFixture) => {
          api.comp.changePaginationLength(50);
          expect(service.change).toHaveBeenCalledWith('default', {
            currentPage: 1,
            itemsPerPage: 50,
            totalItems: 65
          });
        });
      });

    });

  });

});
