import {componentSanityCheck} from '../../util';
import {
  TestComponentBuilder,
  beforeEach,
  describe,
  expect,
  inject,
  it,
  injectAsync,
  ComponentFixture
} from 'angular2/testing';
import {Component, DebugElement} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {MdDataTable} from 'ng2-material/components/data_table/data_table';
import {By} from 'angular2/platform/browser';
import {MdDataTableHeaderSelectableRow, MdDataTableSelectableRow} from '../../../ng2-material/components/data_table/data_table_selectable_tr';

export function main() {

  interface IDataTableFixture {
    fixture: ComponentFixture;
    comp: MdDataTable;
    debug: DebugElement;
  }
  @Component({
    selector: 'test-app',
    directives: [CORE_DIRECTIVES, MdDataTable, MdDataTableHeaderSelectableRow, MdDataTableSelectableRow],
    template: `<md-data-table [selectable]="true">
      <thead>
        <tr md-data-table-header-selectable-row>
          <th>Unit price</th>
        </tr>
      </thead>
      <tbody>
        <tr md-data-table-selectable-row>
          <td>$2.90</td>
        </tr>
        <tr md-data-table-selectable-row selectable-value="$1.25">
          <td>$1.25</td>
        </tr>
        <tr md-data-table-selectable-row *ngFor="#price of prices" class="dynamic">
          <td>{{price}}</td>
        </tr>
      </tbody>
    </md-data-table>`
  })
  class TestComponent {
    selected: Array<any> = [];
    prices: Array<any> = [];
  }

  componentSanityCheck('Data table', 'md-data-table', `<md-data-table></md-data-table>`);

  describe('Data table', () => {
    let builder: TestComponentBuilder;

    function setup(checked: boolean = false, disabled: boolean = false): Promise<IDataTableFixture> {
      return builder.createAsync(TestComponent).then((fixture: ComponentFixture) => {
        let debug = fixture.debugElement.query(By.css('md-data-table'));
        let comp: MdDataTable = debug.componentInstance;
        let testComp = fixture.debugElement.componentInstance;
        testComp.selected = [];
        fixture.detectChanges();
        return {
          fixture: fixture,
          comp: comp,
          debug: debug
        };
      }).catch(console.error.bind(console));
    }

    beforeEach(inject([TestComponentBuilder], (tcb) => {
      builder = tcb;
    }));

    describe('md-data-table', () => {
      it('should initialize selected', injectAsync([], () => {
        return setup().then((api: IDataTableFixture) => {
          expect(api.comp.selected.length).toEqual(0);
          api.fixture.destroy();
        });
      }));

      it('should toggle checked value when a click is fired on a row checkbox', injectAsync([], () => {
        return setup(true).then((api: IDataTableFixture) => {
          let row = api.debug.query(By.css('tbody tr:first-child'));
          row.nativeElement.click();
          expect(api.comp.selected.length).toEqual(1);
          expect(api.comp.selected[0]).toEqual('0');
          row.nativeElement.click();
          expect(api.comp.selected.length).toEqual(0);
          api.fixture.destroy();
        });
      }));

      it('should check all row checkbox when a click is fired on master checkbox', injectAsync([], () => {
        return setup(true).then((api: IDataTableFixture) => {
            let masterRow = api.debug.query(By.css('thead tr:first-child'));
            masterRow.nativeElement.click();
            expect(api.comp.selected.length).toEqual(2);
            expect(api.comp.selected[0]).toEqual('0');
            masterRow.nativeElement.click();
            expect(api.comp.selected.length).toEqual(0);
            api.fixture.destroy();
          });
      }));

      it('should uncheck master checkbox if a row checkbox is unchecked', injectAsync([], () => {
        return setup(true).then((api: IDataTableFixture) => {
            let masterRow = api.debug.query(By.css('thead tr:first-child')),
              row =  api.debug.query(By.css('tbody tr:first-child')).nativeElement;

            masterRow.nativeElement.click();
            expect(masterRow.componentInstance.isActive).toBe(true);
            row.click();
            expect(api.comp.selected.length).toEqual(1);
            expect(api.comp.selected[0]).toEqual('$1.25');
            expect(masterRow.componentInstance.isActive).toBe(false);
            api.fixture.destroy();
          });
      }));

      it('should fire a selectable_change event when a row checkbox change', injectAsync([], () => {
        return setup(true).then((api: IDataTableFixture) => {
          let row = api.debug.query(By.css('tbody tr:first-child')).nativeElement;

          api.comp.onSelectableAll.subscribe((event) => {
            expect(event.name).toBe('selectable_change');
          });

          row.click();
          api.fixture.destroy();
        });
      }));

      describe('Dynamic md-data-table-selectable-row', () => {

        function setupDynamic(checked: boolean = false, disabled: boolean = false): Promise<IDataTableFixture> {
          return builder.createAsync(TestComponent).then((fixture: ComponentFixture) => {
            let debug = fixture.debugElement.query(By.css('md-data-table'));
            let comp: MdDataTable = debug.componentInstance;
            let testComp = fixture.debugElement.componentInstance;
            testComp.selected = [];
            testComp.prices.push('$4.95');
            fixture.detectChanges();
            return {
              fixture: fixture,
              comp: comp,
              debug: debug
            };
          }).catch(console.error.bind(console));
        }

        it('should toggle checked value when a click is fired on a dynamically added row checkbox', injectAsync([], () => {
          return setupDynamic(true).then((api: IDataTableFixture) => {
            let dynamicRow = api.debug.query(By.css('tbody tr.dynamic'));
            dynamicRow.nativeElement.click();
            expect(api.comp.selected.length).toEqual(1);
            expect(api.comp.selected).toContain('2');
            dynamicRow.nativeElement.click();
            expect(api.comp.selected.length).toEqual(0);
            api.fixture.destroy();
          });
        }));

        it('should check all row checkbox when a click is fired on master checkbox', injectAsync([], () => {
          return setupDynamic(true).then((api: IDataTableFixture) => {
            let masterRow = api.debug.query(By.css('thead tr:first-child'));
            masterRow.nativeElement.click();
            expect(api.comp.selected.length).toEqual(3);
            expect(api.comp.selected).toEqual(['0', '$1.25', '2']);
            masterRow.nativeElement.click();
            expect(api.comp.selected.length).toEqual(0);
            api.fixture.destroy();
          });
        }));

        it('should uncheck master checkbox if a dynamically added row checkbox is unchecked', injectAsync([], () => {
          return setupDynamic(true).then((api: IDataTableFixture) => {
            let masterRow = api.debug.query(By.css('thead tr:first-child')),
              dynamicRow = api.debug.query(By.css('tbody tr.dynamic')).nativeElement;

            masterRow.nativeElement.click();
            expect(masterRow.componentInstance.isActive).toBe(true);
            dynamicRow.click();
            expect(api.comp.selected.length).toEqual(2);
            expect(api.comp.selected).toEqual(['0', '$1.25']);
            expect(masterRow.componentInstance.isActive).toBe(false);
            api.fixture.destroy();
          });
        }));

        it('should fire a selectable_change event when a dynamically added row checkbox change', injectAsync([], () => {
          return setupDynamic(true).then((api: IDataTableFixture) => {
            let dynamicRaw = api.debug.query(By.css('tbody tr.dynamic')).nativeElement;

            api.comp.onSelectableAll.subscribe((event) => {
              expect(event.name).toBe('selectable_change');
            });

            dynamicRaw.click();
            api.fixture.destroy();
          });
        }));
      });

    });
  });


}

