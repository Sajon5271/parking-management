import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Parking } from 'src/app/parking';
import { ParkingServicesService } from 'src/app/services/parking-services.service';
import { MatDialog } from '@angular/material/dialog';
import { EditParkingDialogueComponent } from '../edit-parking-dialogue/edit-parking-dialogue.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent {
  displayedColumns: string[] = [
    'id',
    'ownerName',
    'vehicleType',
    'licenseNumber',
    'entryTime',
    'exitTime',
    'status',
    'edit',
  ];
  dataSource!: MatTableDataSource<Parking>;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private parking: ParkingServicesService,
    private dialogue: MatDialog
  ) {}
  async ngOnInit() {
    try {
      const allParkings = await this.parking.getAllParkings();
      console.log(allParkings);
      this.dataSource = new MatTableDataSource(allParkings);
      this.dataSource.sort = this.sort;
    } catch (err) {
      console.log(err);
    }
  }

  ngAfterViewInit() {}

  applyFilter(event: Event) {}

  editParking(parking: Parking) {
    const dialogueRef = this.dialogue.open(EditParkingDialogueComponent, {
      data: parking,
    });
    dialogueRef.afterClosed().subscribe(() => {
      location.reload();
    });
  }
}
