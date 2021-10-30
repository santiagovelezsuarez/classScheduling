import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Teacher } from '../models/scheduler.models';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  endpoint:string = 'https://api';

  teachers: Teacher[] = [
    {
      id: 1,
      name: "Julia",
      department_id: 1
    },
    {
      id: 2,
      name: "Jaime",
      department_id: 1
    },
    {
      id: 3,
      name: "Paco",
      department_id: 2
    }
  ];

  constructor(private httpClient: HttpClient) { }

  createTeacher(teacher: Teacher):Observable<Number>
  {
    return of(this.teachers.push(teacher));
  }

  getTeachers():Observable<Teacher[]>
  {
    return of(this.teachers);
  }

  getTeacher(id:number):Observable<Teacher>
  {
    return of(this.teachers[id]);
  }
}
