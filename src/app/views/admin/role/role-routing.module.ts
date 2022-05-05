import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleActionComponent } from './action/role-action.component';
import { RoleComponent } from './role.component';

const routes: Routes = [
  {
    path: '',
    component: RoleComponent,
  },
  {
    path: 'action',
    component: RoleActionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
