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
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.page.html',
  styleUrls: ['./hotel-detail.page.scss'],
})
export class HotelDetailPage implements OnInit {
  selectedHotel?: Hotel;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private stateService: StateService
  ) {}

  ngOnInit() {
    const hotelId = parseInt(
      this.route.snapshot.paramMap.get('hotelId') as string
    );

    this.selectedHotel = this.stateService.group!.hotels.find(
      (t) => t.id === hotelId
    );

    if (!hotelId || !this.selectedHotel) {
      this.navCtrl.navigateRoot('');
    }
  }

  deletePassengerAlert(tour: Tour, passenger: Passenger) {
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
              tour.passengers = tour.passengers.filter((p: Passenger) => {
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

  createTourAlert() {
    this.alertCtrl
      .create({
        header: 'Creación de una excursion',
        inputs: [
          {
            type: 'text',
            placeholder: 'Nombre de la excursion',
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
              const hotelId = Math.round(
                this.selectedHotel!.tours.length + 1 * Math.random() * 10000
              );

              this.selectedHotel!.tours.push({
                name: data[0],
                id: hotelId,
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

  editTourAlert(tour: Tour) {
    this.alertCtrl
      .create({
        header: 'Editar excursion',
        inputs: [
          {
            type: 'text',
            placeholder: 'Nombre de la excursion',
            value: tour.name,
          },
        ],
        buttons: [
          {
            text: 'Eliminar',
            role: 'destructive',
            cssClass: 'text-danger',
            handler: () => {
              this.selectedHotel!.tours = this.selectedHotel!.tours.filter(
                (h) => h.id !== tour.id
              );
            },
          },
          {
            text: 'Editar',
            handler: (data) => {
              tour.name = data[0];

              // this.hotels.map((h) => (h.id === hotel.id ? hotel : h));
            },
          },
          {
            text: 'Cancelar',
            role: 'cancel',
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  deleteTourAlert(tour: Tour) {
    this.alertCtrl
      .create({
        header: '¿Seguro que quieres eliminar la excursion?',
        subHeader:
          'Borraras todos sus pasajeros. Ademas esta acción no se puede deshacer',
        buttons: [
          {
            text: 'Eliminar',
          },
          {
            text: 'Cancelar',
            role: 'cancel',
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  async openPassengerModal(tour: Tour, passenger?: Passenger) {
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

      tour.passengers.push(passenger);
    } else if (role === 'edit') {
      let passenger = data as Passenger;

      tour.passengers = tour.passengers.map((p) =>
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
