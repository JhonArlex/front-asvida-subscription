import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ClientComponent } from './client/client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';


@NgModule({
  declarations: [
    ClientsComponent,
    ClientComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule
  ]
})
export class ClientsModule { }
