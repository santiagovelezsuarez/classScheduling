import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { ClassDay, Schedule, Session } from '../../models/scheduler.models';
import { ClassService } from '../../services/class.service';
import { Class } from 'src/app/models/scheduler.models';

@Component({
  selector: 'app-schedule-assignment',
  templateUrl: './schedule-assignment.component.html',
  styleUrls: ['./schedule-assignment.component.css']
})
export class ScheduleAssignmentComponent implements OnInit {

  constructor(
    private classService: ClassService
  ) { }


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
    this.getClasses();
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
        sessions.push({day: y.day, start_time: y.start_time, end_time: y.end_time});
      });

      schedules.push({sessions, description: x.course?.name, color: 'Coral'});

      sessions = [];
    });
    console.log(schedules);
    return schedules;
  }

  onSubmit(): void{
    console.log("Form sche-assig: ");
    let cl = this.form.value;
    cl.sessions = this.sessions;
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
