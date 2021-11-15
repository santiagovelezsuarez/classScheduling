import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Teacher, Department } from '../../models/scheduler.models';
import { TeacherService } from '../../services/teacher.service';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-form-teacher',
  templateUrl: './form-teacher.component.html',
  styleUrls: ['./form-teacher.component.css']
})
export class FormTeacherComponent implements OnInit
{
  departments: Department[] = [];

  constructor
  (
    private teacherService: TeacherService,
    private departmentService: DepartmentService
  )
  { }

  msg: string = '';

  formTeacher = new FormGroup({
    name: new FormControl('',[Validators.required]),
    department_id: new FormControl('',[Validators.required])
  });

  ngOnInit(): void
  {
    this.getDepartments();
  }

  onSubmit(): void
  {
    this.teacherService.createTeacher(this.formTeacher.value).subscribe(
      ok => {
        this.formTeacher.reset();
        this.msg = "Docente Registrado Correctamente!";
      },
      error => {
        this.msg = "Error: "+error;
      }
    );
  }

  getDepartments()
  {
    this.departmentService.getDepartments().subscribe(rs => this.departments = rs);
  }

  onClose()
  {
    this.msg = '';
  }

}
