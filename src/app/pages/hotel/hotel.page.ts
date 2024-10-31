/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  AlertController,
  ModalController,
  NavController,
} from '@ionic/angular';

import { StateService } from 'src/app/services/state.service';

import { Hotel } from 'src/app/interfaces/hotel';

import { SummaryModalComponent } from 'src/app/components/summary-modal/summary-modal.component';

@Component({
  selector: 'app-tour',
  templateUrl: './hotel.page.html',
  styleUrls: ['./hotel.page.scss'],
})
export class HotelPage implements OnInit {
  groupNameControl: FormControl = new FormControl('', [Validators.required]);

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    public stateService: StateService
  ) {}

  ngOnInit() {
    this.stateService.group = { name: 'Grupo 1', hotels: [] };
  }

  changeGroupName(ev: any) {
    this.stateService.group!.name = ev.detail.value;
  }

  createHotelAlert() {
    this.alertCtrl
      .create({
        header: 'Creación de hotel',
        inputs: [
          {
            type: 'text',
            placeholder: 'Nombre del hotel',
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Crear',
            handler: (data) => {
              const tourId = Math.round(
                this.stateService.group!.hotels.length +
                  1 * Math.random() * 10000
              );

              this.stateService.group!.hotels.push({
                name: data[0],
                id: tourId,
                tours: [],
              });
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  editHotelAlert(tour: Hotel) {
    this.alertCtrl
      .create({
        header: 'Edición del hotel',
        inputs: [
          {
            type: 'text',
            placeholder: 'Nombre del hotel',
            value: tour.name,
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Editar',
            handler: (data) => {
              tour.name = data[0];
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  deleteHotelAlert(tour: Hotel) {
    this.alertCtrl
      .create({
        header: '¿Seguro que quieres eliminar el hotel?',
        subHeader: 'Esta acción no se puede deshacer',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Eliminar',
            role: 'destructive',
            cssClass: 'text-danger',
            handler: (data) => {
              this.stateService.group!.hotels =
                this.stateService.group!.hotels.filter((t) => t.id !== tour.id);
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  navigateToHotel(hotelId: number) {
    this.navCtrl.navigateForward('hotel/' + hotelId);
  }

  async openSummaryModal() {
    const modal = await this.modalCtrl.create({
      component: SummaryModalComponent,
    });

    modal.present();
  }
}
