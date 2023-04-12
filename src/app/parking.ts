export interface Parking {
  id?: number;
  licenseNumber: string;
  vehicleType: 'microbus' | 'car' | 'truck';
  ownerName: string;
  ownerPhone: string;
  status: 'in' | 'out';
  ownerAddress: string;
  entryTime: Date;
  exitTime?: Date;
  parkingCharge: number;
}
