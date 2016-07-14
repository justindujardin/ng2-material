import {addProviders, inject} from '@angular/core/testing';
import {ComponentFixture, TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {SidenavBasicUsageComponent} from './sidenav-basic-usage.component';

describe('Component: SidenavBasicUsage', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([
      SidenavBasicUsageComponent,
    ]);
  });

  beforeEach(
      inject([TestComponentBuilder], function(tcb: TestComponentBuilder) { builder = tcb; }));

  it('should inject the component',
     inject([SidenavBasicUsageComponent], (component: SidenavBasicUsageComponent) => {
       expect(component).toBeTruthy();
     }));

  it('should create the component', inject([], () => {
       return builder.createAsync(SidenavBasicUsageComponentTestController)
           .then((fixture: ComponentFixture<any>) => {
             let query = fixture.debugElement.query(By.directive(SidenavBasicUsageComponent));
             expect(query).toBeTruthy();
             expect(query.componentInstance).toBeTruthy();
           });
     }));
});

@Component({
  selector: 'test',
  template: `
    <sidenav-basic-usage></sidenav-basic-usage>
  `,
  directives: [SidenavBasicUsageComponent]
})
class SidenavBasicUsageComponentTestController {
}
