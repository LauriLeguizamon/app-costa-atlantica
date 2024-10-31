import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TourDetailPageRoutingModule } from './hotel-detail-routing.module';

import { HotelDetailPage } from './hotel-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TourDetailPageRoutingModule,
  ],
  declarations: [HotelDetailPage],
})
export class TourDetailPageModule {}
