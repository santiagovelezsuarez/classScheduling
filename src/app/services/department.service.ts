import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Department } from '../models/scheduler.models';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  endpoint:string = 'https://uam.jdcorrea.me/movies/web/scheduler/';

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

  private generateId(): number
  {
    let current = this.departments.length;
    return ++current;
  }

  // createDepartment(department: Department):Observable<Number>
  // {
  //   department.id = this.generateId();
  //   return of(this.departments.push(department));
  // }

  createDepartment(department: Department):Observable<Department>
  {
    return this.httpClient.post<Department>(this.endpoint+"departments", department);
  }

  getDepartments():Observable<Department[]>
  {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.httpClient.get<Department[]>(this.endpoint+"department",{ headers });
  }

  getDepartment(id:number):Observable<Department>
  {
    return of(this.departments[id-1]);
  }
}
