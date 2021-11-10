import { Pipe, PipeTransform } from '@angular/core';
import { Class, Schedule, Session } from '../models/scheduler.models';
import { ClassService } from 'src/app/services/class.service';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'classToSchedule'
})
export class ClassToSchedulePipe implements PipeTransform {

  constructor(
    private classService: ClassService
  )
  {  }

  transform(classes: Class[]): Observable<Schedule[]> {
    // let schedules: Schedule[] = [];
    // if(classes.length > 0)
    //   this.classService.classToSchedule(classes[0]).subscribe(x => schedules.push(x));
    // return of(schedules);

    let schedules: Schedule[] = [];
    for(let i=0; i<classes.length; i++)
      this.classService.classToSchedule(classes[i]).subscribe(x => schedules.push(x));
    return of(schedules);
  }

}
