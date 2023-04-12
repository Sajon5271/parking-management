import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParkingDialogueComponent } from './edit-parking-dialogue.component';

describe('EditParkingDialogueComponent', () => {
  let component: EditParkingDialogueComponent;
  let fixture: ComponentFixture<EditParkingDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditParkingDialogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditParkingDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
