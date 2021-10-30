import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { ClassDay } from '../../models/scheduler.models';
import { ClassService } from '../../services/class.service';

@Component({
  selector: 'app-schedule-assignment',
  templateUrl: './schedule-assignment.component.html',
  styleUrls: ['./schedule-assignment.component.css']
})
export class ScheduleAssignmentComponent implements OnInit {

  constructor(
    private classService: ClassService
  ) { }

  class_days:ClassDay[] = [];

  msg: string = '';

  form = new FormGroup({
    teacher_id: new FormControl('',[Validators.required]),
    room_id: new FormControl('',[Validators.required]),
    course_id: new FormControl('',[Validators.required]),
    start_date: new FormControl('',[Validators.required]),
    end_date:  new FormControl('',[Validators.required])
  });

  setTimes(class_days: ClassDay[]){
    this.class_days = class_days;
  }

  ngOnInit(): void
  { }

  onSubmit(): void{
    console.log("Form sche-assig: ");
    let cl = this.form.value;
    cl.class_days = this.class_days;
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
