import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGridRoutingModule } from './user-grid-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UserGridComponent } from './user-grid.component';


@NgModule({
  declarations: [UserGridComponent],
  imports: [
    CommonModule,
    UserGridRoutingModule,
    SharedModule
  ]
})
export class UserGridModule { }
