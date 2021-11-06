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
          day: "Lun",
          class_id: 1,
          start_time: "10:30",
          end_time: "12:30"
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
          day: "Jue",
          class_id: 2,
          start_time: "16:00",
          end_time: "18:00"
        }
      ]
    }
  ];

  constructor(private httpClient: HttpClient) { }

  createClass(_class: Class):Observable<Number>
  {
    return of(this.classes.push(_class));
  }

  getClasses():Observable<Class[]>
  {
    return of(this.classes);
  }

}
