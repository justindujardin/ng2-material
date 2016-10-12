import {componentSanityCheck} from '../../platform/testing/util';
import {inject, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {MdPaginationRange, IPaginationModel, PaginationService} from './index';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';


describe('Pagination', () => {

  componentSanityCheck('MdPaginationRange', 'md-pagination-range', `<md-pagination-range></md-pagination-range>`);

  describe('MdPaginationRange', () => {
    let service: PaginationService;

    interface IPaginationRangeFixture {
      fixture: ComponentFixture<TestComponent>;
      comp: MdPaginationRange;
      debug: DebugElement;
    }
    @Component({
      selector: 'test-app',
      template: `<md-pagination-range></md-pagination-range>`
    })
    class TestComponent {
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

      defaultRangeFormat: string = '{start}-{end} / {total}';
    }


    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          MdPaginationRange,
          TestComponent
        ],
        imports: [CommonModule, FormsModule],
        providers: [PaginationService]
      });
    });

    function setup(template: string = null): Promise<IPaginationRangeFixture> {
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
          let debug = fixture.debugElement.query(By.css('md-pagination-range'));
          let comp: MdPaginationRange = debug.componentInstance;
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
        return setup().then((api: IPaginationRangeFixture) => {
          expect(api.comp.model.currentPage).toEqual(0);
          expect(api.comp.model.itemsPerPage).toEqual(0);
          expect(api.comp.model.totalItems).toEqual(0);
        });
      });

      it('should accept custom model', () => {
        return setup(`<md-pagination-range [model]="page2"></md-pagination-range>`).then((api: IPaginationRangeFixture) => {
          expect(api.comp.model.currentPage).toEqual(2);
          expect(api.comp.model.itemsPerPage).toEqual(30);
          expect(api.comp.model.totalItems).toEqual(65);
        });
      });

      it('should have a default name', () => {
        return setup().then((api: IPaginationRangeFixture) => {
          expect(api.comp.name).toEqual('default');
        });
      });

      it('should accept a custom name', () => {
        return setup(`<md-pagination-range name="book"></md-pagination-range>`).then((api: IPaginationRangeFixture) => {
          expect(api.comp.name).toEqual('book');
        });
      });

      it('should have a default range format', () => {
        return setup().then((api: IPaginationRangeFixture) => {
          expect(api.comp.rangeFormat).toEqual('{start}-{end} of {total}');
        });
      });

      it('should accept a custom range format', () => {
        return setup(`<md-pagination-range [range-format]="defaultRangeFormat"></md-pagination-range>`).then((api: IPaginationRangeFixture) => {
          expect(api.comp.rangeFormat).toEqual('{start}-{end} / {total}');
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

      it('should listen PaginationService', () => {
        return setup().then((api: IPaginationRangeFixture) => {
          service.onChange.subscribe((event) => {
            expect(api.comp.model).toEqual(updatedPagination);
          });

          service.change('default', updatedPagination);
        });
      });

      it('should listen PaginationService only for his reference name', () => {
        return setup(`<md-pagination-range name="book"></md-pagination-range>`).then((api: IPaginationRangeFixture) => {
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

    describe('getFormattedValue', () => {

      it('should replace pattern in the range format', () => {
        return setup().then((api: IPaginationRangeFixture) => {
          expect(api.comp.getFormattedValue(1, 5, 30)).toEqual('1-5 of 30');
        });
      });

    });

    describe('getRange', () => {

      it('should calculate range at the middle', () => {
        return setup(`<md-pagination-range [model]="page2"></md-pagination-range>`).then((api: IPaginationRangeFixture) => {
          spyOn(api.comp, 'getFormattedValue').and.callThrough();
          let result = api.comp.getRange();
          expect(result['changingThisBreaksApplicationSecurity']).toEqual('31-60 of 65');
          expect(api.comp.getFormattedValue).toHaveBeenCalledWith(31, 60, 65);
        });
      });


      it('should calculate range at the end', () => {
        return setup(`<md-pagination-range [model]="page3"></md-pagination-range>`).then((api: IPaginationRangeFixture) => {
          spyOn(api.comp, 'getFormattedValue').and.callThrough();
          let result = api.comp.getRange();
          expect(result['changingThisBreaksApplicationSecurity']).toEqual('61-65 of 65');
          expect(api.comp.getFormattedValue).toHaveBeenCalledWith(61, 65, 65);
        });
      });

    });

  });


});
