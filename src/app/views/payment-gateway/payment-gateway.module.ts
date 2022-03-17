import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentGatewayRoutingModule } from './payment-gateway-routing.module';
import { PaymentGatewayComponent } from './payment-gateway.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { CreditCardDirectivesModule } from 'angular-cc-library';

@NgModule({
  declarations: [PaymentGatewayComponent],
  imports: [
    CommonModule,
    PaymentGatewayRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule,
    CreditCardDirectivesModule
  ]
})
export class PaymentGatewayModule { }
