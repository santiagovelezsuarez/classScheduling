import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Teacher } from '../../models/scheduler.models';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-form-teacher',
  templateUrl: './form-teacher.component.html',
  styleUrls: ['./form-teacher.component.css']
})
export class FormTeacherComponent implements OnInit {

  constructor(
    private teacherService: TeacherService
  ) { }

  msg: string = '';

  form = new FormGroup({
    name: new FormControl('',[Validators.required]),
    department_id: new FormControl('',[Validators.required])
  });

  ngOnInit(): void {
  }

  onSubmit(): void{
  }

}
