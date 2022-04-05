import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponsRoutingModule } from './coupons-routing.module';
import { CouponsComponent } from './coupons.component';
import { CouponComponent } from './coupon/coupon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';


@NgModule({
  declarations: [
    CouponsComponent,
    CouponComponent
  ],
  imports: [
    CommonModule,
    CouponsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule
  ]
})
export class CouponsModule { }
