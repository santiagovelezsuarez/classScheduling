import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/models/scheduler.models';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})

export class CourseListComponent implements OnInit
{
  courses: Course[] = [];
  filter: Course[] = [];
  text: string = "";

  constructor
  (
    private courseService: CourseService
  )
  { }

  ngOnInit(): void
  {
    this.getCourses();
  }

  getCourses()
  {
    this.courseService.getCourses().subscribe(rs => {
      this.courses = rs;
      this.filter = this.courses;
    });
  }

  search()
  {
    this.filter = this.courses.filter(x => x.name.toLowerCase().includes(this.text.toLowerCase()));
  }

}
