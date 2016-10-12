import {componentSanityCheck} from '../../platform/testing/util';
import {inject, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {MdPaginationControls, IPaginationModel, PaginationService} from './index';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

describe('Pagination', () => {
  componentSanityCheck('MdPaginationControls', 'md-pagination-controls', `<md-pagination-controls></md-pagination-controls>`);

  describe('MdPaginationControls', () => {
    let service: PaginationService;

    interface IPaginationControlsFixture {
      fixture: ComponentFixture<TestComponent>;
      comp: MdPaginationControls;
      debug: DebugElement;
    }
    @Component({
      selector: 'test-app',
      template: `<md-pagination-controls></md-pagination-controls>`
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
      page3: IPaginationModel = {
        currentPage: 3,
        itemsPerPage: 30,
        totalItems: 65
      };
    }

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          MdPaginationControls,
          TestComponent
        ],
        imports: [CommonModule, FormsModule],
        providers: [PaginationService]
      });
    });

    function setup(template: string = null): Promise<IPaginationControlsFixture> {
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
          let debug = fixture.debugElement.query(By.css('md-pagination-controls'));
          let comp: MdPaginationControls = debug.componentInstance;
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
        return setup().then((api: IPaginationControlsFixture) => {
          expect(api.comp.model.currentPage).toEqual(0);
          expect(api.comp.model.itemsPerPage).toEqual(0);
          expect(api.comp.model.totalItems).toEqual(0);
        });
      });

      it('should accept custom model', () => {
        return setup(`<md-pagination-controls [model]="page2"></md-pagination-controls>`).then((api: IPaginationControlsFixture) => {
          expect(api.comp.model.currentPage).toEqual(2);
          expect(api.comp.model.itemsPerPage).toEqual(30);
          expect(api.comp.model.totalItems).toEqual(65);
        });
      });

      it('should have a default name', () => {
        return setup().then((api: IPaginationControlsFixture) => {
          expect(api.comp.name).toEqual('default');
        });
      });

      it('should accept a custom name', () => {
        return setup(`<md-pagination-controls name="book"></md-pagination-controls>`).then((api: IPaginationControlsFixture) => {
          expect(api.comp.name).toEqual('book');
        });
      });

    });

    describe('construct', () => {
      const updatedPagination: IPaginationModel = {
        currentPage: 1,
        itemsPerPage: 30,
        totalItems: 65
      };


      it('should listen PaginationService', () => {
        return setup().then((api: IPaginationControlsFixture) => {
          service.onChange.subscribe((event) => {
            expect(api.comp.model).toEqual(updatedPagination);
          });

          service.change('default', updatedPagination);
        });
      });

      it('should listen PaginationService only for his reference name', () => {
        return setup(`<md-pagination-controls name="book"></md-pagination-controls>`).then((api: IPaginationControlsFixture) => {
          service.onChange.subscribe(() => {
            expect(api.comp.model).toEqual({
              currentPage: 0,
              itemsPerPage: 0,
              totalItems: 0
            });
          });

          service.change('default', updatedPagination);
        });
      });
    });

    describe('isFirstPage', () => {

      it('should accept first page as first page', () => {
        return setup(`<md-pagination-controls [model]="page1"></md-pagination-controls>`).then((api: IPaginationControlsFixture) => {
          expect(api.comp.isFirstPage()).toBeTruthy();
        });
      });

      it('should not accept second page as first page', () => {
        return setup(`<md-pagination-controls [model]="page2"></md-pagination-controls>`).then((api: IPaginationControlsFixture) => {
          expect(api.comp.isFirstPage()).toBeFalsy();
        });
      });

    });

    describe('isLastPage', () => {

      it('should accept third page as last page', () => {
        return setup(`<md-pagination-controls [model]="page3"></md-pagination-controls>`).then((api: IPaginationControlsFixture) => {
          expect(api.comp.isLastPage()).toBeTruthy();
        });
      });

      it('should not accept second page as last page', () => {
        return setup(`<md-pagination-controls [model]="page2"></md-pagination-controls>`).then((api: IPaginationControlsFixture) => {
          expect(api.comp.isLastPage()).toBeFalsy();
        });
      });

    });

    describe('previousPage', () => {

      it('should call change of page to previous one', () => {
        return setup(`<md-pagination-controls [model]="page2"></md-pagination-controls>`).then((api: IPaginationControlsFixture) => {
          spyOn(api.comp, 'changePage');
          api.comp.previousPage();
          expect(api.comp.changePage).toHaveBeenCalledWith(1);
        });
      });

    });

    describe('nextPage', () => {

      it('should call change of page to previous one', () => {
        return setup(`<md-pagination-controls [model]="page2"></md-pagination-controls>`).then((api: IPaginationControlsFixture) => {
          spyOn(api.comp, 'changePage');
          api.comp.nextPage();
          expect(api.comp.changePage).toHaveBeenCalledWith(3);
        });
      });

    });

    describe('changePage', () => {
      let service: PaginationService;

      beforeEach(() => {
        spyOn(service, 'change');
      });

      it('should dispatch the new current page to the service', () => {
        return setup(`<md-pagination-controls [model]="page2"></md-pagination-controls>`).then((api: IPaginationControlsFixture) => {
          api.comp.changePage(1);
          expect(service.change).toHaveBeenCalledWith('default', {
            currentPage: 1,
            itemsPerPage: 30,
            totalItems: 65
          });
        });
      });

    });

  });

});

