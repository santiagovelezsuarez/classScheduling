import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassListComponent } from './components/class-list/class-list.component';
import { ScheduleAssignmentComponent } from './components/schedule-assignment/schedule-assignment.component';
import { FormCourseComponent } from './components/form-course/form-course.component';
import { FormRoomComponent } from './components/form-room/form-room.component';
import { FormTeacherComponent } from './components/form-teacher/form-teacher.component';
import { UpdateCourseComponent } from './components/update-course/update-course.component';
import { FreeRoomsComponent } from './components/free-rooms/free-rooms.component';

const routes: Routes = [
  { path: '', component: ScheduleAssignmentComponent },
  { path: 'class-list', component: ClassListComponent },
  { path: 'reservate-room', component: ScheduleAssignmentComponent },
  { path: 'create-course', component: FormCourseComponent },
  { path: 'create-room', component: FormRoomComponent },
  { path: 'create-teacher', component: FormTeacherComponent },
  { path: 'update-course/:id', component: UpdateCourseComponent },
  { path: 'free-rooms', component: FreeRoomsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
