import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkInfoFormComponent } from './park-info-form.component';

describe('ParkInfoFormComponent', () => {
  let component: ParkInfoFormComponent;
  let fixture: ComponentFixture<ParkInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkInfoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
