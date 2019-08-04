import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGridComponent } from './user-grid.component';


const routes: Routes = [
  {
    path: '',
    component: UserGridComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserGridRoutingModule { }
