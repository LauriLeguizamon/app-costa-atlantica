import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  AlertController,
  ModalController,
  NavController,
} from '@ionic/angular';

import { StateService } from 'src/app/services/state.service';

import { PassengerModalComponent } from 'src/app/components/passenger-modal/passenger-modal.component';

import { Passenger } from 'src/app/interfaces/passenger';
import { Tour } from 'src/app/interfaces/tour';
import { Hotel } from 'src/app/interfaces/hotel';
import { SummaryModalComponent } from 'src/app/components/summary-modal/summary-modal.component';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.page.html',
  styleUrls: ['./tour-detail.page.scss'],
})
export class TourDetailPage implements OnInit {
  selectedTour?: Tour;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private stateService: StateService
  ) {}

  ngOnInit() {
    const tourId = parseInt(
      this.route.snapshot.paramMap.get('tourId') as string
    );

    this.selectedTour = this.stateService.group!.tours.find(
      (t) => t.id === tourId
    );

    if (!tourId || !this.selectedTour) {
      this.navCtrl.navigateRoot('');
    }
  }

  deletePassengerAlert(hotel: Hotel, passenger: Passenger) {
    this.alertCtrl
      .create({
        header: '¿Seguro que quieres eliminar al pasajero?',
        subHeader: 'Esta acción no se puede deshacer',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Eliminar',
            handler: () => {
              hotel.passengers = hotel.passengers.filter((p: Passenger) => {
                return p.id !== passenger.id;
              });
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  createHotelAlert() {
    this.alertCtrl
      .create({
        header: 'Creación de un Hotel',
        inputs: [
          {
            type: 'text',
            placeholder: 'Nombre del Hotel',
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
                this.selectedTour!.hotels.length + 1 * Math.random() * 10000
              );

              this.selectedTour!.hotels.push({
                name: data[0],
                id: tourId,
                passengers: [],
              });
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  editHotelAlert(hotel: Hotel) {
    this.alertCtrl
      .create({
        header: 'Editar hotel',
        inputs: [
          {
            type: 'text',
            placeholder: 'Nombre de la excursion',
            value: hotel.name,
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Eliminar',
            role: 'destructive',
            cssClass: 'text-danger',
            handler: () => {
              this.selectedTour!.hotels = this.selectedTour!.hotels.filter(
                (h) => h.id !== hotel.id
              );
            },
          },
          {
            text: 'Editar',
            handler: (data) => {
              hotel.name = data[0];

              // this.hotels.map((h) => (h.id === hotel.id ? hotel : h));
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  deleteHotelAlert(hotel: Hotel) {
    this.alertCtrl
      .create({
        header: '¿Seguro que quieres eliminar el hotel?',
        subHeader:
          'Borraras todos sus pasajeros. Ademas esta acción no se puede deshacer',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Eliminar',
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  async openPassengerModal(hotel: Hotel, passenger?: Passenger) {
    const modal = await this.modalCtrl.create({
      component: PassengerModalComponent,
      componentProps: {
        passengerToEdit: passenger,
      },
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      let passenger = data as Passenger;

      hotel.passengers.push(passenger);

      console.log(hotel);
    } else if (role === 'edit') {
      let passenger = data as Passenger;

      hotel.passengers = hotel.passengers.map((p) =>
        p.id === passenger.id ? passenger : p
      );
    }
  }

  async openSummaryModal() {
    const modal = await this.modalCtrl.create({
      component: SummaryModalComponent,
    });

    modal.present();
  }
}
