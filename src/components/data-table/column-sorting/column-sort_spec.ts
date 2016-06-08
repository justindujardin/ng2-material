import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  inject,
  it,
  async
} from '@angular/core/testing';
import {ComponentFixture, TestComponentBuilder} from "@angular/compiler/testing";
import {Component, DebugElement, ViewChildren, QueryList, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {By} from "@angular/platform-browser";
import {
  MdDataColumnSortingService,
  MdDataColumnSortDirective,
  SortDirection,
  ColumnSortingModel
} from './index';

export function main() {

  describe('Data Column Sorting', () => {
    let builder: TestComponentBuilder;

    beforeEach(inject([TestComponentBuilder], (tcb) => {
      builder = tcb;
    }));

    interface IColumnSortingFixture {
      fixture: ComponentFixture<TestComponent>;
      service: MdDataColumnSortingService;
      testComp: TestComponent;
      debug: DebugElement;
    }

    @Component({
      selector: 'test-app',
      providers: [MdDataColumnSortingService],
      directives: [CORE_DIRECTIVES, MdDataColumnSortDirective],
      template: `
      <table>
        <thead>
          <tr>
            <th md-data-column-sort="1">Wine</th>
            <th md-data-column-sort="2">Cheese</th>
            <th md-data-column-sort="3">Crackers</th>
          </tr>
        </thead>
      </table>`
    })
    class TestComponent implements OnInit {
      defaultModel: ColumnSortingModel = {
        column: '1',
        direction: SortDirection.DESCEND
      };
      @ViewChildren(MdDataColumnSortDirective) columns: QueryList<MdDataColumnSortDirective>;

      /**
       * Constructor.
       * @param sortingService - reference to the service for this area.
       */
      constructor(public sortingService: MdDataColumnSortingService) { }

      ngOnInit() {
        this.sortingService.setSorting(this.defaultModel);
      }
    }

    function setup(template: string = null): Promise<IColumnSortingFixture> {
      let prep = template === null ?
        builder.createAsync(TestComponent) :
        builder.overrideTemplate(TestComponent, template).createAsync(TestComponent);
      return prep.then((fixture: ComponentFixture<TestComponent>) => {
        let debug = fixture.debugElement.query(By.css('test-app'));
        let comp: TestComponent = fixture.componentInstance;
        let service: MdDataColumnSortingService = comp.sortingService;
        fixture.detectChanges();

        return {
          fixture: fixture,
          service: comp.sortingService,
          testComp: comp,
          debug: debug
        };
      }).catch(console.error.bind(console));
    }

    describe('MdDataSortColumnService', () => {

      describe('sortingColumn', () => {

        it('is observable sorting state', inject([], () => {
          return setup().then((api: IColumnSortingFixture) => {
            expect(api.service.sortingColumn.subscribe).toBeDefined();
            api.service.sortingColumn.subscribe((col) => {
              expect(col).toEqual(api.testComp.defaultModel);
            });
          });
        }));

      });

      describe('setSorting', () => {
        it('sets sorting programatically', done => {
          return setup().then((api: IColumnSortingFixture) => {
            let notDefault = false;
            let testSort = { column: '1', direction: SortDirection.ASCEND };
            expect(api.service.sortingColumn).toBeDefined();

            api.service.sortingColumn.subscribe(col => {
              if (notDefault) {
                expect(col).toEqual(testSort);
                done();
              }
              notDefault = true;
            });

            api.service.setSorting(testSort);

          });
        });
      });

      describe('onColumnSelect', () => {
        it('updates sorting to selected column', done => {
          return setup().then((api: IColumnSortingFixture) => {
            let clicks = 0;
            let currentSort = { column: '1', direction: SortDirection.ASCEND };
            let firstSort = { column: '2', direction: SortDirection.ASCEND };
            let secondSort = { column: '3', direction: SortDirection.ASCEND };
            let thirdSort = currentSort;

            api.service.sortingColumn.subscribe(col => {
              switch (clicks) {
                case 0:
                  //expect it to be default
                  expect(col).toEqual(api.testComp.defaultModel);
                  break;
                case 1:
                  //change to be col 2
                  expect(col).toEqual(firstSort);
                  break;
                case 2:
                  // change to col 3:
                  expect(col).toEqual(secondSort);
                  break;
                case 3:
                  // click same column inverts back:
                  expect(col).toEqual(thirdSort);
                  done();
                  break;
              }

              currentSort = col;
              clicks ++;

            });

            api.service.onColumnSelect('2', currentSort);
            api.service.onColumnSelect('3', currentSort);
            api.service.onColumnSelect('1', currentSort);

          });
        });

        it('inverts sorting if column is the same', done => {
          return setup().then((api: IColumnSortingFixture) => {
            let clicks = 0;
            let currentSort = { column: '1', direction: SortDirection.DESCEND };
            let firstSort = { column: '3', direction: SortDirection.ASCEND };
            let secondSort = { column: '3', direction: SortDirection.DESCEND };
            let thirdSort = firstSort;

            api.service.sortingColumn.subscribe(col => {
              switch (clicks) {
                case 1:
                  //change to clicked column ASCENDING
                  expect(col).toEqual(firstSort);
                  break;
                case 2:
                  // click same column inverts direction:
                  expect(col).toEqual(secondSort);
                  break;
                case 3:
                  // click same column inverts back:
                  expect(col).toEqual(thirdSort);
                  done();
                  break;
              }

              currentSort = col;
              clicks ++;

            });

            while (clicks < 4) {
              api.service.onColumnSelect('3', currentSort);
            }
          });
        });

        it('handles column input even with no "current" model', done => {
          return setup().then((api: IColumnSortingFixture) => {
            let count = 0;
            api.service.sortingColumn.subscribe(col => {
              if (!count) {
                // not testing the default value.
                count ++;
                return;
              }
              expect(col).toEqual({ column: '2', direction: SortDirection.ASCEND });
              done();
            });

            api.service.onColumnSelect('2', null);
          });
        });
      });
    });

    describe('MdDataSortColumnDirective', () => {

      it('listens to MdDataColumnSortingService', done => {
        return setup().then((api: IColumnSortingFixture) => {
          let firstColumn: MdDataColumnSortDirective = api.testComp.columns.first;
          let count = 0
          api.testComp.sortingService.sortingColumn.subscribe(col => {
            if (!count) {
              // not testing the default value.
              count ++;
              return;
            }
            expect(firstColumn.sortingSubscription).toBeDefined();
            expect(firstColumn.sortingColumn).toEqual(col);
            done();
          });

          api.testComp.sortingService.setSorting({ column: '2', direction: SortDirection.ASCEND });
        });
      });

      it('notifies the MdDataColumnSortingService on click', () => {
        return setup().then((api: IColumnSortingFixture) => {
          let secondColumn:MdDataColumnSortDirective = api.testComp.columns.toArray()[1];
          let secondHost = api.fixture.nativeElement.querySelector('th[md-data-column-sort="2"]');
          let clickSpy = spyOn(secondColumn, 'sortBy').and.callThrough();
          let changeSpy = spyOn(api.testComp.sortingService, 'onColumnSelect').and.callThrough();

          expect(changeSpy).not.toHaveBeenCalled();

          secondHost.click();

          expect(clickSpy).toHaveBeenCalled();
          expect(changeSpy.calls.argsFor(0)[0]).toEqual('2');
          expect(changeSpy.calls.argsFor(0)[1]).toEqual(api.testComp.defaultModel);
        });
      });

      it('styles it\'s host according to sorting state', () => {
        return setup().then((api: IColumnSortingFixture) => {
          let el = api.fixture.nativeElement;
          let first = el.querySelector('th[md-data-column-sort="1"]');
          let seconnd = el.querySelector('th[md-data-column-sort="2"]');
          let third = el.querySelector('th[md-data-column-sort="3"]');

          //it finds class "sortable on it's host elements:
          expect(first.classList.contains('sortable')).toBe(true);;
          expect(seconnd.classList.contains('sortable')).toBe(true);;
          expect(third.classList.contains('sortable')).toBe(true);

          third.click();
          api.fixture.detectChanges();
          expect(third.classList.contains('sorted-ascending')).toBe(true);
          expect(third.classList.contains('sorted-descending')).toBe(false);

          third.click();
          api.fixture.detectChanges();
          expect(third.classList.contains('sorted-ascending')).toBe(false);
          expect(third.classList.contains('sorted-descending')).toBe(true);
        });
      });

    });
  });


}
