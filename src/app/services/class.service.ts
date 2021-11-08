import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Class } from '../models/scheduler.models';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  endpoint:string = 'https://api';

  classes: Class[] = [
    {
      id: 1,
      teacher_id: 3,
      room_id: 2,
      course_id: 1,
      start_date: new Date("2019-01-16"),
      end_date: new Date("2019-05-16"),
      class_days: [
        {
          day: 1,
          times: [8,8.5,9,9.5]
        }
      ]
    },
    {
      id: 2,
      teacher_id: 1,
      room_id: 2,
      course_id: 2,
      start_date: new Date("2019-01-16"),
      end_date: new Date("2019-05-16"),
      class_days: [
        {
          day: 3,
          times: [9,9.5,10]
        }
      ]
    }
  ];

  /*{
    "teacher_id": "1",
    "room_id": "1",
    "course_id": "1",
    "start_date": "2021-11-02",
    "end_date": "2021-11-17",
    "sessions": [
      {
        "day": 0,
        "times": [
          8
        ]
      }
    ],
    "id": 3
  }*/

  constructor(
    private httpClient: HttpClient
  ) { }

  generateId(): number
  {
    let current = this.classes.length;
    return ++current;
  }

  createClass(_class: Class):Observable<Number>
  {
    _class.id = this.generateId();
    console.log("Class Service: ",_class);
    return of(this.classes.push(_class));
  }

  getClasses():Observable<Class[]>
  {
    console.log("getClasses: ",this.classes);
    return of(this.classes);
  }

  getClassesByRoom(room_id:number):Observable<Class[]>
  {
    return of(this.classes.filter(x => x.room_id == room_id));
  }

  getClass(id:number):Observable<Class>
  {
    return of(this.classes[id-1]);
  }

}
