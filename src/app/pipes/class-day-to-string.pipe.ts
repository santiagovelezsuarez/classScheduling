import { Pipe, PipeTransform } from '@angular/core';
import { ClassDay, DAY } from '../models/scheduler.models';

@Pipe({
  name: 'classDayToString'
})
export class ClassDayToStringPipe implements PipeTransform {

  transform(classDay: ClassDay): string {
    let line: string = "";
    line = DAY[classDay.day];
    line+= " :"+classDay.times[0]+" - "+classDay.times[classDay.times.length-1];
    return line;
  }

}
