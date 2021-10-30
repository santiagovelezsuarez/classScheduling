import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScheduleAssignmentComponent } from './components/schedule-assignment/schedule-assignment.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ClassListComponent } from './components/class-list/class-list.component';
import { FormRoomComponent } from './components/form-room/form-room.component';


@NgModule({
  declarations: [
    AppComponent,
    ScheduleAssignmentComponent,
    ScheduleComponent,
    ClassListComponent,
    FormRoomComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
