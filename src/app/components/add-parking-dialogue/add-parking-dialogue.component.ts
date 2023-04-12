import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Parking } from 'src/app/parking';
import { ParkingServicesService } from 'src/app/services/parking-services.service';

@Component({
  selector: 'app-add-parking-dialogue',
  templateUrl: './add-parking-dialogue.component.html',
  styleUrls: ['./add-parking-dialogue.component.css'],
})
export class AddParkingDialogueComponent {
  newParkingData?: Parking;
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
      console.log(parkDupl);
      await this.parking.addParking(parkDupl);
    } catch (error) {
      console.log(error);
    }
  }
}
