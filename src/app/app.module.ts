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
import { FormTeacherComponent } from './components/form-teacher/form-teacher.component';
import { FormCourseComponent } from './components/form-course/form-course.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { ClassToSchedulePipe } from './pipes/class-to-schedule.pipe';
import { ClassDayToStringPipe } from './pipes/class-day-to-string.pipe';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { UpdateCourseComponent } from './components/update-course/update-course.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleAssignmentComponent,
    ScheduleComponent,
    ClassListComponent,
    FormRoomComponent,
    FormTeacherComponent,
    FormCourseComponent,
    CourseListComponent,
    ClassToSchedulePipe,
    ClassDayToStringPipe,
    EnumToArrayPipe,
    UpdateCourseComponent,
    RoomListComponent,
    TeacherListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
