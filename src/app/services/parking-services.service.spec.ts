import { TestBed } from '@angular/core/testing';

import { ParkingServicesService } from './parking-services.service';

describe('ParkingServicesService', () => {
  let service: ParkingServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
