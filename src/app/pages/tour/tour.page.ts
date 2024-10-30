/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { StateChangeListener } from '@capacitor/app';
import {
  AlertController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { SummaryModalComponent } from 'src/app/components/summary-modal/summary-modal.component';
import { Tour } from 'src/app/interfaces/tour';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.page.html',
  styleUrls: ['./tour.page.scss'],
})
export class TourPage implements OnInit {
  groupNameControl: FormControl = new FormControl('', [Validators.required]);

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    public stateService: StateService
  ) {}

  ngOnInit() {
    this.stateService.group = { name: 'Grupo 1', tours: [] };
  }

  changeGroupName(ev: any) {
    this.stateService.group!.name = ev.detail.value;
  }

  createTourAlert() {
    this.alertCtrl
      .create({
        header: 'Creación de excursion',
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
              const tourId = Math.round(
                this.stateService.group!.tours.length +
                  1 * Math.random() * 10000
              );

              this.stateService.group!.tours.push({
                name: data[0],
                id: tourId,
                hotels: [],
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
        header: 'Edición de excursion',
        inputs: [
          {
            type: 'text',
            placeholder: 'Nombre de la excursion',
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

  deleteTourAlert(tour: Tour) {
    this.alertCtrl
      .create({
        header: '¿Seguro que quieres eliminar la excursion?',
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
              this.stateService.group!.tours =
                this.stateService.group!.tours.filter((t) => t.id !== tour.id);
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  navigateToTour(tourId: number) {
    this.navCtrl.navigateForward('tour/' + tourId);
  }

  async openSummaryModal() {
    const modal = await this.modalCtrl.create({
      component: SummaryModalComponent,
    });

    modal.present();
  }
}
