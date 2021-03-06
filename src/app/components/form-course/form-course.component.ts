import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Course } from '../../models/scheduler.models';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-form-course',
  templateUrl: './form-course.component.html',
  styleUrls: ['./form-course.component.css']
})
export class FormCourseComponent implements OnInit
{

  constructor
  (
    private courseService: CourseService
  )
  { }

  msg: string = '';

  formCourse = new FormGroup({
    name: new FormControl('',[Validators.required])
  });

  ngOnInit(): void
  {
  }

  onSubmit(): void
  {
    this.courseService.createCourse(this.formCourse.value).subscribe(
      ok => {
        this.formCourse.reset();
        this.msg = "Curso Registrado Correctamente!";
      },
      error => {
        this.msg = "Error: "+error;
      }
    );
  }

  onClose()
  {
    this.msg = '';
  }

}
