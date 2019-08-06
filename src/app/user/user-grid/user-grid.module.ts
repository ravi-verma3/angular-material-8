import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGridRoutingModule } from './user-grid-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UserGridComponent } from './user-grid.component';
import { ModalModule } from 'ngx-modal';
import { NgxSmartModalModule } from 'ngx-smart-modal';


@NgModule({
  declarations: [UserGridComponent],
  imports: [
    CommonModule,
    UserGridRoutingModule,
    SharedModule,
    ModalModule,
    NgxSmartModalModule.forRoot()
  ],
})
export class UserGridModule { }
