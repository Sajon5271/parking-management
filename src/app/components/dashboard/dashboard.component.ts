import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddParkingDialogueComponent } from '../add-parking-dialogue/add-parking-dialogue.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private dialogue: MatDialog) {}

  addParking() {
    const dialogueRef = this.dialogue.open(AddParkingDialogueComponent);
    dialogueRef.afterClosed().subscribe((res) => {
      console.log(res);
    });
  }
}
