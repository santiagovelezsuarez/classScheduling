import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScheduleAssignmentComponent } from './components/schedule-assignment/schedule-assignment.component';
import { ScheduleComponent } from './components/schedule/schedule.component';


@NgModule({
  declarations: [
    AppComponent,
    ScheduleAssignmentComponent,
    ScheduleComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
