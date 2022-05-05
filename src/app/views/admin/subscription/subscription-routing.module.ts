import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionActionComponent } from './action/subscription-action.component';
import { SubscriptionsComponent } from './subscription.component';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionsComponent,
  },
  {
    path: 'action',
    component: SubscriptionActionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionRoutingModule { }
