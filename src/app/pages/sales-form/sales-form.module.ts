import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesFormPageRoutingModule } from './sales-form-routing.module';

import { SalesFormPage } from './sales-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesFormPageRoutingModule
  ],
  declarations: [SalesFormPage]
})
export class SalesFormPageModule {}
