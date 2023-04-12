import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ParkingServicesService } from '../../services/parking-services.service';
import { Parking } from '../../parking';
@Component({
  selector: 'app-park-info-form',
  templateUrl: './park-info-form.component.html',
  styleUrls: ['./park-info-form.component.css'],
})
export class ParkInfoFormComponent {
  @Input() prevInfo?: Parking;
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

  ngOnInt() {
    if (this.prevInfo) {
      const formData: any = { ...this.prevInfo };
      formData.entryDate = this.prevInfo.entryTime;
      formData.entryTime = this.convertDateToTimeString(
        this.prevInfo.entryTime
      );
      if (this.prevInfo.exitTime) {
        formData.exitDate = this.prevInfo.exitTime;
        formData.exitTime = this.convertDateToTimeString(
          this.prevInfo.exitTime
        );
      }
      this.parkingForm.patchValue(formData);
    }
  }

  async handleSubmit() {
    const { entryTime } = this.parkingForm.value;
    if (entryTime)
      console.log(entryTime, entryTime.slice(0, 2), entryTime.slice(3));
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
          fullEntryTime.setMinutes(parseInt(entryTime.slice(3)));
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

  convertDateToTimeString(date: Date) {
    const hour = date.getHours() + '';
    const minutes = date.getMinutes() + '';

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
