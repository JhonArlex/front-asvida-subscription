import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';
import { NgxLoadingModule } from 'ngx-loading';
import { RoleActionComponent } from './action/role-action.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RoleComponent,
    RoleActionComponent,

  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    NgxLoadingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RoleModule { }
