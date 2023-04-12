import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Parking } from 'src/app/parking';
import { ParkingServicesService } from 'src/app/services/parking-services.service';

@Component({
  selector: 'app-edit-parking-dialogue',
  templateUrl: './edit-parking-dialogue.component.html',
  styleUrls: ['./edit-parking-dialogue.component.css'],
})
export class EditParkingDialogueComponent {
  constructor(
    public dialogRef: MatDialogRef<EditParkingDialogueComponent>,
    private parking: ParkingServicesService,
    @Inject(MAT_DIALOG_DATA) public data: Parking
  ) {}

  onCancel() {
    this.dialogRef.close();
  }

  async onSubmit(parking: Parking) {
    try {
      const parkDupl = { ...parking };
      await this.parking.updateParking(parkDupl.id || 0, parkDupl);
      this.dialogRef.close();
    } catch (error) {
      console.log(error);
    }
  }
}
