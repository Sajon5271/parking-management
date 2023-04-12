import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParkingDialogueComponent } from './add-parking-dialogue.component';

describe('AddParkingDialogueComponent', () => {
  let component: AddParkingDialogueComponent;
  let fixture: ComponentFixture<AddParkingDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddParkingDialogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddParkingDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
