import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Class, Schedule, Session } from '../models/scheduler.models';
import { RoomInfoService } from './room-info.service';
import { CourseService } from './course.service';

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
          day: 0,
          times: [8,8.5,9,9.5] // Lun 8 - 10
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
          day: 2,
          times: [9,9.5,10] // Mie 9 - 10.30
        }
      ]
    },
    {
      id: 3,
      teacher_id: 2,
      room_id: 1,
      course_id: 1,
      start_date: new Date("2019-01-16"),
      end_date: new Date("2019-05-16"),
      class_days: [
        {
          day: 1,
          times: [10,10.5,11,11.5] // Mar 10 - 12
        },
        {
          day: 3,
          times: [10,10.5,11,11.5] // Jue 10 - 12
        }
      ]
    },
    {
      id: 4,
      teacher_id: 2,
      room_id: 3,
      course_id: 1,
      start_date: new Date("2019-01-16"),
      end_date: new Date("2019-05-16"),
      class_days: [
        {
          day: 1,
          times: [18.5,19,19.5,20] // Mar 18.5 - 20.5
        },
        {
          day: 4,
          times: [18.5,19,19.5,20] // Vie 18.5 - 20.5
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
    private httpClient: HttpClient,
    private courseService: CourseService
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

  overlapDates(ia, fa, ib, fb)
  {
    /*console.log("ia: ",ia);
    console.log("ib: ",ib);
    console.log("fa: ",fa);
    console.log("fb: ",fb);
    console.log("ia<=fb: ",ia<=fb);
    console.log("ia>=fb: ",ia>=fb);*/
    return ((ia<=fb) && (fa >= ib));
  }

  getClassesByRoomInDate(room_id:number, idate:Date, fdate:Date):Observable<Class[]>
  {
    return of(this.classes.filter(x => (x.room_id == room_id) && !this.overlapDates(idate,fdate,x.start_date,x.end_date)));
  }

  // class to sch ()

  classToSchedule(classs: Class): Observable<Schedule>
  {
    let schedule: Schedule = {sessions: classs.class_days, description: "desc", color: "Coral"};
    this.courseService.getCourse(classs.course_id).subscribe(rs => schedule.description = rs.name);
    return of(schedule);
  }

  getClass(id:number):Observable<Class>
  {
    return of(this.classes[id-1]);
  }

}
