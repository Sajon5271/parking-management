import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ParkingServicesService } from '../services/parking-services.service';
import { Parking } from '../parking';
@Component({
  selector: 'app-park-info-form',
  templateUrl: './park-info-form.component.html',
  styleUrls: ['./park-info-form.component.css'],
})
export class ParkInfoFormComponent {
  minDate = new Date();
  errorMsg = '';
  constructor(
    private formBuilder: FormBuilder,
    private parking: ParkingServicesService
  ) {}

  parkingForm = this.formBuilder.group({
    licenseNumber: ['', Validators.required],
    vehicleType: ['car', Validators.required],
    ownerName: ['', Validators.required],
    ownerPhone: [
      '',
      [
        Validators.required,
        Validators.pattern(/[0-9]/),
        Validators.minLength(11),
        Validators.maxLength(11),
      ],
    ],
    status: ['in', Validators.required],
    ownerAddress: ['', Validators.required],
    entryDate: [new Date(), Validators.required],
    entryTime: [this.currentTimeOnly, Validators.required],
    exitDate: [],
    exitTime: [],
    parkingCharge: [0, Validators.required],
  });

  ngOnInt() {}

  async handleSubmit() {
    console.log(this.parkingForm.value);
    if (this.parkingForm.valid) {
      const {
        licenseNumber,
        vehicleType,
        ownerAddress,
        ownerName,
        ownerPhone,
        status,
        entryDate,
        entryTime,
        exitDate,
        exitTime,
        parkingCharge,
      } = this.parkingForm.value;
      if (
        licenseNumber &&
        vehicleType &&
        ownerAddress &&
        ownerName &&
        ownerPhone &&
        status &&
        entryDate &&
        entryTime
      ) {
        try {
          const fullEntryTime = entryDate;
          fullEntryTime.setHours(parseInt(entryTime.slice(0, 2)));
          fullEntryTime.setMinutes(parseInt(entryTime.slice(2)));
          const parkObj: Parking = {
            licenseNumber,
            vehicleType: vehicleType as 'microbus' | 'car' | 'truck',
            ownerAddress,
            ownerName,
            ownerPhone,
            status: status as 'in' | 'out',
            entryTime: fullEntryTime,
            parkingCharge: parkingCharge || 0,
          };
          if (exitDate && exitTime) {
            const exTime = exitTime as string;
            const fullExitTime = exitDate as Date;
            fullExitTime.setHours(parseInt(exTime.slice(0, 2)));
            fullExitTime.setMinutes(parseInt(exTime.slice(2)));
            parkObj.exitTime = fullExitTime;
          }
          await this.parking.addParking(parkObj);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      this.errorMsg = 'Please fill in the form correctly';
    }
  }

  get phoneNumberError() {
    if (
      this.parkingForm.controls.ownerPhone.hasError('minlength') ||
      this.parkingForm.controls.ownerPhone.hasError('maxlength') ||
      this.parkingForm.controls.ownerPhone.hasError('pattern')
    )
      return true;
    else return false;
  }

  get currentTimeOnly() {
    const hour = new Date().getHours() + '';
    const minutes = new Date().getMinutes() + '';

    return hour.padStart(2, '0') + ':' + minutes.padStart(2, '0');
  }

  get ParkingCharge() {
    const res = this.parkingForm.controls.vehicleType.value;
    if (res === 'car') {
      this.parkingForm.controls.parkingCharge.setValue(100);
    } else if (res === 'microbus') {
      this.parkingForm.controls.parkingCharge.setValue(200);
    } else {
      this.parkingForm.controls.parkingCharge.setValue(300);
    }

    return this.parkingForm.controls.parkingCharge.value || 0;
  }
}
