import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { ClassDay, Course, Room, Schedule, Session, Teacher } from '../../models/scheduler.models';
import { ClassService } from '../../services/class.service';
import { Class } from 'src/app/models/scheduler.models';
import { TeacherService } from '../../services/teacher.service';
import { RoomInfoService } from '../../services/room-info.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-schedule-assignment',
  templateUrl: './schedule-assignment.component.html',
  styleUrls: ['./schedule-assignment.component.css']
})
export class ScheduleAssignmentComponent implements OnInit {

  constructor(
    private classService: ClassService,
    private teacherService: TeacherService,
    private roomInfoService: RoomInfoService,
    private courseService: CourseService
  ) { }

  teachers: Teacher[] = [];

  rooms: Room[] = [];

  courses: Course[] = [];

  schedules: Schedule[] = [];

  sessions: Session[] = [];

  msg: string = '';

  form = new FormGroup({
    teacher_id: new FormControl('',[Validators.required]),
    room_id: new FormControl('',[Validators.required]),
    course_id: new FormControl('',[Validators.required]),
    start_date: new FormControl('',[Validators.required]),
    end_date:  new FormControl('',[Validators.required])
  });

  setSessions(sessions: Session[]){
    this.sessions = sessions;
  }

  ngOnInit(): void
  {
    //this.getClasses();

    this.getOptions();
  }

  onRoomChange(room)
  {
    console.log("room");
    console.log(room.target.value);
    this.classService.getClassesByRoom(room.target.value).subscribe(
      x => {
        console.log(x);
        this.schedules = this.classToSchedule(x);
      }
    );
  }


  getOptions(){
    this.teacherService.getTeachers().subscribe(rs => this.teachers = rs);
    this.roomInfoService.getRooms().subscribe(rs => this.rooms = rs);
    this.courseService.getCourses().subscribe(rs => this.courses = rs);
  }

  getClasses(): void {
    this.classService.getClasses().subscribe(rs => {
      this.schedules = this.classToSchedule(rs);
    });
  }

  classToSchedule(cls: Class[]): Schedule[] {
    let schedules: Schedule[] = [];
    let sessions: Session[] = [];
    cls.map(x => {
      x.class_days.map(y => {
        sessions.push({day: y.day, times: y.times});
      });

      schedules.push({sessions, description: x.course?.name, color: 'Coral'});

      sessions = [];
    });
    console.log("schedules");
    console.log(schedules);
    return schedules;
  }

  onSubmit(): void{
    console.log("Form sche-assig: ");
    let cl = this.form.value;
    cl.class_days = this.sessions;
    console.log(this.form.value);

    this.classService.createClass(cl).subscribe(
      ok => {
        this.form.reset();
        this.msg = "Horario Registrado Correctamente!";
      },
      error => {
        this.msg = "Error: "+error;
      }
    );
  }

}
