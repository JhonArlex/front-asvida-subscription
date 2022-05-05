import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionRoutingModule } from './subscription-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { SubscriptionActionComponent } from './action/subscription-action.component';
import { SubscriptionsComponent } from './subscription.component';


@NgModule({
  declarations: [
    SubscriptionsComponent,
    SubscriptionActionComponent
  ],
  imports: [
    CommonModule,
    SubscriptionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule
  ]
})
export class SubscriptionModule { }
