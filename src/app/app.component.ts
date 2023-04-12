import { Component } from '@angular/core';
import { ParkingServicesService } from './services/parking-services.service';
import { Parking } from './parking';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  allParkings: Parking[] = [];
  title = 'parking-management';
  constructor(private parking: ParkingServicesService) {}
  async ngOnInit() {
    try {
      this.allParkings = await this.parking.getAllParkings();
    } catch (error) {
      console.log(error);
    }
  }
}
