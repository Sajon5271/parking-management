import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Parking } from 'src/app/parking';
import { ParkingServicesService } from 'src/app/services/parking-services.service';

@Component({
  selector: 'app-add-parking-dialogue',
  templateUrl: './add-parking-dialogue.component.html',
  styleUrls: ['./add-parking-dialogue.component.css'],
})
export class AddParkingDialogueComponent {
  constructor(
    public dialogRef: MatDialogRef<AddParkingDialogueComponent>,
    private parking: ParkingServicesService
  ) {}

  onCancel() {
    this.dialogRef.close();
  }

  async onSubmit(parking: Parking) {
    try {
      const parkDupl = { ...parking };
      await this.parking.addParking(parkDupl);
      this.dialogRef.close();
    } catch (error) {
      console.log(error);
    }
  }
}
