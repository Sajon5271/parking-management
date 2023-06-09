import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ParkInfoFormComponent } from './components/park-info-form/park-info-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { AddParkingDialogueComponent } from './components/add-parking-dialogue/add-parking-dialogue.component';
import { EditParkingDialogueComponent } from './components/edit-parking-dialogue/edit-parking-dialogue.component';

@NgModule({
  declarations: [AppComponent, ParkInfoFormComponent, DashboardComponent, DataTableComponent, AddParkingDialogueComponent, EditParkingDialogueComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
