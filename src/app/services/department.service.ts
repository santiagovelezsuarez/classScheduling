import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Department } from '../models/scheduler.models';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  endpoint:string = 'https://api';

  departments: Department[] = [
    {
      id: 1,
      name: "Idiomas"
    },
    {
      id: 2,
      name: "Matematicas"
    },
    {
      id: 1,
      name: "Computación"
    },
  ];

  constructor(
    private httpClient: HttpClient
  ) { }

  generateId(): number
  {
    let current = this.departments.length;
    return ++current;
  }

  createDepartment(department: Department):Observable<Number>
  {
    department.id = this.generateId();
    return of(this.departments.push(department));
  }

  getDepartments():Observable<Department[]>
  {
    return of(this.departments);
  }

  getDepartment(id:number):Observable<Department>
  {
    return of(this.departments[id-1]);
  }
}
