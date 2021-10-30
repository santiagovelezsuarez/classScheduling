import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassListComponent } from './components/class-list/class-list.component';
import { ScheduleAssignmentComponent } from './components/schedule-assignment/schedule-assignment.component';

const routes: Routes = [
  { path: 'class-list', component: ClassListComponent },
  { path: 'reservate-room', component: ScheduleAssignmentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
