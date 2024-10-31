import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TourPageRoutingModule } from './hotel-routing.module';

import { HotelPage } from './hotel.page';
import { PassengerModalComponent } from 'src/app/components/passenger-modal/passenger-modal.component';
import { SummaryModalComponent } from 'src/app/components/summary-modal/summary-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TourPageRoutingModule,
  ],
  declarations: [HotelPage, PassengerModalComponent, SummaryModalComponent],
})
export class TourPageModule {}
