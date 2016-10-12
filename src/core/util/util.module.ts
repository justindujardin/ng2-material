import {ViewportHelper, BrowserViewportHelper} from './viewport';
import {NgModule} from '@angular/core';
import {Media} from './media';
import {Animate} from './animate';
@NgModule({
  providers: [
    {provide: ViewportHelper, useClass: BrowserViewportHelper},
    Media,
    Animate
  ]
})
export class MdServicesModule {
}
