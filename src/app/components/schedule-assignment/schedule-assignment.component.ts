import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-schedule-assignment',
  templateUrl: './schedule-assignment.component.html',
  styleUrls: ['./schedule-assignment.component.css']
})
export class ScheduleAssignmentComponent implements OnInit {

  constructor() { }

  form = new FormGroup({
    room_id: new FormControl(''),
    from: new FormControl(''),
    to:  new FormControl(''),
  });

  ngOnInit(): void
  { }

  onSubmit(): void{

  }

}
