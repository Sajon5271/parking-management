import { Injectable } from '@angular/core';
import { set, get, update, del } from 'idb-keyval';
import { Parking } from '../parking';

@Injectable({
  providedIn: 'root',
})
export class ParkingServicesService {
  constructor() {}

  async addParking(parking: Parking): Promise<void> {
    try {
      const currentTotalParkings = await this.getParkingCount();
      parking.id = currentTotalParkings + 1;
      return update('parking', (old) => {
        return old ? [...old, parking] : [parking];
      });
    } catch (error) {
      console.log(error);
    }
  }

  getAllParkings(): Promise<Parking[] | undefined> {
    return get('parking');
  }

  async getParkingCount(): Promise<number> {
    try {
      const allData: Parking[] | undefined = await get('parking');
      return allData ? allData.length : 0;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }
  async getSingleParking(id: number) {
    try {
      const allData: Parking[] | undefined = await get('parking');
      const parking = allData ? allData.find((el) => (el.id = id)) : undefined;
      return parking;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }

  updateStatus(id: number, status: 'in' | 'out') {
    return update('parking', (old: Parking[] | undefined) => {
      if (!old) return [];
      old.forEach((element) => {
        if (element.id === id) element.status = status;
      });
      return old;
    });
  }
  updateExitTime(id: number, exitTime: Date) {
    return update('parking', (old: Parking[] | undefined) => {
      if (!old) return [];
      old.forEach((element) => {
        if (element.id === id) element.exitTime = exitTime;
      });
      return old;
    });
  }

  updateParking(id: number, parking: Parking) {
    return update('parking', (old: Parking[] | undefined) => {
      if (!old) return [];
      const newData = old.map((element) => {
        if (element.id === id) element = { ...element, ...parking };
        return element;
      });
      return newData;
    });
  }
}
