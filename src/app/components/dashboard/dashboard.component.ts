import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddParkingDialogueComponent } from '../add-parking-dialogue/add-parking-dialogue.component';
import { ParkingServicesService } from 'src/app/services/parking-services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  totalCars = 0;
  totalEmptySlot = 0;
  vehicleInfo = {
    cars: 0,
    microbus: 0,
    trucks: 0,
  };

  constructor(
    private dialogue: MatDialog,
    private parking: ParkingServicesService
  ) {}

  async ngOnInit() {
    try {
      const allData = await this.parking.getAllParkings();
      if (allData) {
        this.totalCars = allData.filter(
          (el) =>
            el.entryTime >
            new Date(new Date().setDate(new Date().getDate() - 1))
        ).length;
        this.totalEmptySlot = 50 - this.totalCars;
        allData.forEach((el) => {
          if (el.vehicleType === 'car') this.vehicleInfo.cars++;
          else if (el.vehicleType === 'microbus') this.vehicleInfo.microbus++;
          else this.vehicleInfo.trucks++;
        });
      }
      console.log(this.totalCars);
      console.log(this.totalEmptySlot);
      console.log(this.vehicleInfo);
    } catch (error) {
      console.log(error);
    }
  }

  addParking() {
    const dialogueRef = this.dialogue.open(AddParkingDialogueComponent);
  }
}
