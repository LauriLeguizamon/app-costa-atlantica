import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalController } from '@ionic/angular';
import { Passenger } from 'src/app/interfaces/passenger';

@Component({
  selector: 'app-passenger-modal',
  templateUrl: './passenger-modal.component.html',
  styleUrls: ['./passenger-modal.component.scss'],
})
export class PassengerModalComponent implements OnInit {
  @Input() passengerToEdit?: Passenger;

  passengerForm: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {
    this.passengerForm = this.fb.group({
      name: ['', [Validators.required]],
      description: '',
      adults: 0,
      underage: 0,
      free: 0,
      babies: 0,
      upfront: null,
    });
  }

  ngOnInit() {
    if (this.passengerToEdit) {
      this.passengerForm.patchValue(this.passengerToEdit);
    }
  }

  onViewWillDismiss() {
    this.passengerForm.reset();
    this.passengerToEdit = undefined;
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  manageActionButton() {
    this.passengerToEdit ? this.editPassenger() : this.loadPassenger();
  }

  editPassenger() {
    this.passengerToEdit = {
      ...this.passengerToEdit,
      ...this.passengerForm.value,
    };

    console.log(this.passengerToEdit);

    this.modalCtrl.dismiss(this.passengerToEdit, 'edit');
  }

  loadPassenger() {
    const passenger = {
      id: Math.floor(Math.random() * 1000),
      ...this.passengerForm.value,
    };
    this.modalCtrl.dismiss(passenger, 'confirm');
  }
}
