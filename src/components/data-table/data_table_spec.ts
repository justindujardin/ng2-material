import {componentSanityCheck} from '../../platform/testing/util';
import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {Component, DebugElement, EventEmitter} from '@angular/core';
import {By} from '@angular/platform-browser';
import {MdDataTableHeaderSelectableRow, MdDataTable, MdDataTableSelectableRow} from './index';
import {CommonModule} from '@angular/common';
import {MdCheckboxModule} from '@angular/material';

interface IDataTableFixture {
  fixture: ComponentFixture<TestComponent>;
  comp: MdDataTable;
  debug: DebugElement;
}

@Component({
  selector: 'test-app',
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
        <tr md-data-table-selectable-row>
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MdDataTable,
        MdDataTableSelectableRow,
        MdDataTableHeaderSelectableRow,
        TestComponent
      ],
      imports: [CommonModule, MdCheckboxModule],
      providers: []
    });
  });

  function setup(): Promise<IDataTableFixture> {
    let result: IDataTableFixture = null;
    return TestBed.compileComponents()
      .then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        const debug = fixture.debugElement.query(By.css('md-data-table'));
        const comp: MdDataTable = debug.componentInstance;
        const testComp = fixture.debugElement.componentInstance;
        testComp.selected = [];
        fixture.detectChanges();
        result = {
          fixture: fixture,
          comp: comp,
          debug: debug
        };
        return fixture.whenStable();
      })
      .then(() => result)
      .catch(error => {
        console.error(error);
      });
  }

  describe('md-data-table', () => {
    it('should initialize selected', async(() => {
      setup().then((api: IDataTableFixture) => {
        expect(api.comp.selected.length).toEqual(0);
        api.fixture.destroy();
      });
    }));

    it('should toggle checked value when a click is fired on a row checkbox', async(() => {
      setup().then((api: IDataTableFixture) => {
        let row = api.debug.query(By.css('tbody tr:first-child'));
        row.nativeElement.click();
        expect(api.comp.selected.length).toEqual(1);
        expect(api.comp.selected[0]).toEqual('0');
        row.nativeElement.click();
        expect(api.comp.selected.length).toEqual(0);
        api.fixture.destroy();
      });
    }));

    it('should check all row checkbox when a click is fired on master checkbox', async(() => {
      setup().then((api: IDataTableFixture) => {
        let masterRow = api.debug.query(By.css('thead tr:first-child'));
        masterRow.nativeElement.click();
        expect(api.comp.selected.length).toEqual(2);
        expect(api.comp.selected[0]).toEqual('0');
        masterRow.nativeElement.click();
        expect(api.comp.selected.length).toEqual(0);
        api.fixture.destroy();
      });
    }));

    it('should uncheck master checkbox if a row checkbox is unchecked', async(() => {
      setup().then((api: IDataTableFixture) => {
        const masterRow = api.debug.query(By.css('thead tr:first-child'));
        const row = api.debug.query(By.css('tbody tr:first-child')).nativeElement;

        masterRow.nativeElement.click();
        expect(masterRow.componentInstance.isActive).toBe(true);
        row.click();
        expect(api.comp.selected.length).toEqual(1);
        expect(api.comp.selected[0]).toEqual('1');
        expect(masterRow.componentInstance.isActive).toBe(false);
        api.fixture.destroy();
      });
    }));

    it('should fire a selectable_change event when a row checkbox change', async(() => {
      setup().then((api: IDataTableFixture) => {
        const row = api.debug.query(By.css('tbody tr:first-child')).nativeElement;

        api.comp.onSelectableAll.subscribe((event) => {
          expect(event.name).toBe('selectable_change');
        });

        row.click();
        api.fixture.destroy();
      });
    }));
  });

  describe('_unsubscribeChildren', () => {

    it('should reset the selected values', async(() => {
      setup().then((api: IDataTableFixture) => {
        api.comp.selected = ['1', '2'];

        api.comp._unsubscribeChildren();

        expect(api.comp.selected.length).toEqual(0);
      });
    }));

    it('should unsubscribe to listener', async(() => {
      setup().then((api: IDataTableFixture) => {
        const emitter = new EventEmitter(false);
        const spy = jasmine.createSpy('spy');

        emitter.subscribe(spy);

        api.comp._listeners = [emitter];

        emitter.emit({name: 'custom_event'});
        api.comp._unsubscribeChildren()

        expect(() => {
          emitter.emit({name: 'custom_event2'})
        }).toThrow();

        expect(spy.calls.count()).toEqual(1);
      });
    }));

  });

  describe('_updateChildrenListener', () => {

    it('should ask unsubscription', async(() => {
      setup().then((api: IDataTableFixture) => {
        spyOn(api.comp, '_unsubscribeChildren');

        api.comp._updateChildrenListener(api.comp._rows);

        expect(api.comp._unsubscribeChildren).toHaveBeenCalled();
      });
    }));

  });

});

