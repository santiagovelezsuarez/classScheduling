import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/scheduler.models';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})

export class UpdateCourseComponent implements OnInit
{
  course_id: number = 0;

  course: Course;

  msg: string = '';

  formCourse = new FormGroup({
    name: new FormControl('',[Validators.required])
  });

  constructor
  (
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  )
  { }

  ngOnInit(): void
  {
    this.route.params.subscribe(params => {
      this.course_id = params['id'];
      this.courseService.getCourse(this.course_id).subscribe(c => this.course = c);
    });
  }

  onSubmit(): void
  {
    this.courseService.updateCourse(this.course).subscribe(x => {
      console.log(x);
      this.msg = "se ha modificado el nombre del curso!";
      setTimeout(() => {
        this.router.navigate(['create-course']);
      }, 1100);

    });
  }

}
