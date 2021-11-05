import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Course } from '../models/scheduler.models';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  endpoint:string = 'https://api';

  courses: Course[] = [
    {
      id: 1,
      name: "Ingles"
    },
    {
      id: 2,
      name: "Matematicas"
    }
  ];

  constructor(private httpClient: HttpClient) { }

  createCourse(course: Course):Observable<Number>
  {
    return of(this.courses.push(course));
  }

  getCourses():Observable<Course[]>
  {
    return of(this.courses);
  }

  getCourse(id:number):Observable<Course>
  {
    return of(this.courses[id-1]);
  }
}
