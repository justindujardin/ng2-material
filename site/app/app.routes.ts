import {Routes} from '@angular/router';
import {Home} from './home/index';
import {About} from './about/index';
import {NoContent} from './no-content/index';


export const ROUTES: Routes = [
  {path: '', component: Home},
  {path: 'home', component: Home},
  {path: 'about', component: About},
  {path: '**', component: NoContent},
];
