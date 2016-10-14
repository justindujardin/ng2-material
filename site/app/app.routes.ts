import {Routes} from '@angular/router';
import {Home} from './home/index';
import {NoContent} from './no-content/index';
import {IndexComponent} from './index/index.component';
import {ComponentsComponent} from './components/components.component';

export const ROUTES: Routes = [
  {path: '', component: IndexComponent},
  {path: 'home', component: Home},
  {path: 'index', component: IndexComponent},
  {path: 'components/:id', component: ComponentsComponent},
  {path: '**', component: NoContent},
  {
    path: 'detail', loadChildren: () => System.import('./+detail')
  },

];
