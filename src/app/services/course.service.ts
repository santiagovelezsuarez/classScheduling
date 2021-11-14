import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Course } from '../models/scheduler.models';

@Injectable({
  providedIn: 'root'
})

export class CourseService
{

  endpoint:string = 'https://api';

  courses: Course[] = [
    {
      id: 1,
      name: "Ingles"
    },
    {
      id: 2,
      name: "Matematicas"
    },
    {
      id: 3,
      name: "Fisica"
    }
  ];

  constructor(private httpClient: HttpClient)
  { }

  createCourse(course: Course):Observable<Number>
  {
    course.id = this.generateId();
    return of(this.courses.push(course));
  }

  updateCourse(course: Course):Observable<string>
  {
    return of(this.courses[course.id-1].name = course.name);
  }

  getCourses():Observable<Course[]>
  {
    return of(this.courses);
  }

  getCourse(id:number):Observable<Course>
  {
    return of(this.courses[id-1]);
  }

  private generateId(): number
  {
    let current = this.courses.length;
    return ++current;
  }
}
