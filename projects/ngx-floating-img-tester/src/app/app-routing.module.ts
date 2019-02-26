import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamplesComponent } from './features/examples/examples.component';
import { ApiComponent } from './features/api/api.component';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'examples', component: ExamplesComponent},
  {path: 'api', component: ApiComponent}
]
 
@NgModule({
    imports: [
      RouterModule.forRoot(routes)  
    ],
    exports: [
      RouterModule
    ]
  })
  export class AppRoutingModule { }