import {componentSanityCheck} from "../../util";
import {
  TestComponentBuilder,
  beforeEach,
  describe,
  expect,
  inject,
  it,
  injectAsync,
  ComponentFixture
} from "angular2/testing";
import {Component, DebugElement} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {MdDataTable, MdDataTableRow} from 'ng2-material/components/data_table/data_table';
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {KeyCodes} from "../../../ng2-material/core/key_codes";
import {By} from "angular2/platform/browser";
import {MdDataTableHeaderRow} from '../../../ng2-material/components/data_table/data_table_tr';


export function main() {

  interface IDataTableFixture {
    fixture: ComponentFixture;
    comp: MdDataTable;
    debug: DebugElement;
  }
  @Component({
    selector: 'test-app',
    directives: [CORE_DIRECTIVES, MdDataTable, MdDataTableHeaderRow, MdDataTableRow],
    template: `<md-data-table [selectable]="true">
      <thead>
        <tr md-data-table-header-row>
          <th>Unit price</th>
        </tr>
      </thead>
      <tbody>
        <tr md-data-table-row>
          <td>$2.90</td>
        </tr>
        <tr md-data-table-row>
          <td>$1.25</td>
        </tr>
      </tbody>
    </md-data-table>`
  })
  class TestComponent {
    selected: Array<any> = [];
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
            expect(api.comp.selected[0]).toEqual('1');
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
    });
  });


}

