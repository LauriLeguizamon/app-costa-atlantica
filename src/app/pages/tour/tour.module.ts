import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TourPageRoutingModule } from './tour-routing.module';

import { TourPage } from './tour.page';
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
  declarations: [TourPage, PassengerModalComponent, SummaryModalComponent],
})
export class TourPageModule {}
