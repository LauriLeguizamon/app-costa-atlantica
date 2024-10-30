import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Passenger } from 'src/app/interfaces/passenger';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-summary-modal',
  templateUrl: './summary-modal.component.html',
  styleUrls: ['./summary-modal.component.scss'],
})
export class SummaryModalComponent implements OnInit {
  emailFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  summaryFormControl: FormControl = new FormControl('');

  constructor(
    private stateService: StateService,
    private modalCtrl: ModalController
  ) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    const group = this.stateService.group;
    this.summaryFormControl.setValue(this.formatData(group));
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  sendEmail() {
    // Encode subject and body to ensure special characters are URL-safe
    const encodedSubject = encodeURIComponent(
      `Información sobre grupo: ${this.stateService.group!.name}`
    );
    const encodedBody = encodeURIComponent(
      this.formatData(this.stateService.group)
    );

    // Create mailto link
    const mailtoLink = `mailto:${this.emailFormControl.value}?subject=${encodedSubject}&body=${encodedBody}`;

    // Open the mailto link to launch the email app
    window.location.href = mailtoLink;
  }

  formatData(data: any, level: number = 0): string {
    const indent = '  '.repeat(level);
    let result = '';

    if (Array.isArray(data)) {
      data.forEach((item) => {
        result += this.formatData(item, level) + '\n';
      });
    } else if (typeof data === 'object' && data !== null) {
      for (const key in data) {
        const value = data[key];
        if (key === 'passengers' && Array.isArray(value)) {
          value.forEach((passenger: Passenger) => {
            result += `${indent}  - ${passenger.name}, ${
              passenger.adults
            } Mayores, ${passenger.underage} Menores, ${
              passenger.babies
            } Upas, ${passenger.free} Liberados, Seña: ${
              passenger.upfront ?? 'Sin seña'
            } Extra info: ${passenger.description ?? ''}\n`;
          });
        } else if (key !== 'id' && typeof value === 'object') {
          result += `${indent}${this.formatData(value, level + 1)}`;
        } else if (key !== 'id') {
          result += `${indent}${value}\n`;
        }
      }
    }

    console.log(result);
    return result;
  }
}
