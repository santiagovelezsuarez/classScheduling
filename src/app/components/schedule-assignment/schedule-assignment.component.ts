import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Time } from '../../models/scheduler.models';

@Component({
  selector: 'app-schedule-assignment',
  templateUrl: './schedule-assignment.component.html',
  styleUrls: ['./schedule-assignment.component.css']
})
export class ScheduleAssignmentComponent implements OnInit {

  constructor() { }

  times:Time[] = [];

  form = new FormGroup({
    room_id: new FormControl(''),
    from: new FormControl(''),
    to:  new FormControl(''),
  });

  setTimes(times: Time[]){
    this.times = times;
  }

  ngOnInit(): void
  { }

  onSubmit(): void{

  }

}
