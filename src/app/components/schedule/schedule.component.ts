import { Component, OnInit, Output,  EventEmitter, Input} from '@angular/core';
import { Class, ClassDay, Days } from '../../models/scheduler.models';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  days = [Days.Lun, Days.Mar, Days.Mie, Days.Jue, Days.Vie, Days.Sab];
  times = ["07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22"];
  sched = [];

  reservations: ClassDay[]=[];

  @Input() classes: Class[];

  @Output() notify = new EventEmitter<ClassDay[]>();

  constructor() {
    for(let i in this.times)
    {
      this.sched[i] = new Array(this.days.length);
    }
  }

  ngOnInit(): void { }

  timeToSched(day,time)
  {
    if(this.sched[time][day]==1 && this.sched[time-1][day])
    {
      this.sched[time][day]=0.5;
    }
    else if(this.sched[time][day]==1 && !this.sched[time-1][day])
    {
      this.sched[time][day]=0.55;
    }
    else if(this.sched[time][day]==0.5)
    {
      this.sched[time][day]="";
    }
    else if(!this.sched[time][day])
    {
      this.sched[time][day]=1;
    }
    else if(this.sched[time][day] = 0.55)
    {
      this.sched[time][day]=0.5;
    }
    this.complete(day);
  }

  private complete(day)
  {
    let cont=0;
    for(let i=0; i<this.sched.length; i++)
    {
      console.log(this.sched[i][day]);
      if(this.sched[i][day])
        cont++;
    }
    if(cont>=2)
    {
      let first = this.getFirst(day);
      let last = this.getLast(day);
      for(let i=first+1; i<last; i++)
      {
          this.sched[i][day] = 1;
      }
      if(this.sched[first][day]==0.5)
        this.sched[first][day] = 1;
      if(this.sched[last][day]==0.55)
        this.sched[last][day] = 1;

    }
  }

  private getFirst(day): number
  {
    for(let i=0; i<this.sched.length; i++)
    {
      if(this.sched[i][day])
        return i;
    }
    return -1;
  }

  private getTime(i, day, isI)
  {
    let min = "00";
    if((this.sched[i][day] == 0.5 && !isI)|| (this.sched[i][day] == 0.55 && isI))
      min = "30";
    let hora = this.times[i];
    return hora+":"+min;
  }

  private getLast(day): number
  {
    let last = -1;
    for(let i=0; i<this.sched.length; i++)
    {
      if(this.sched[i][day]>0)
      {
        last = this.sched[i][day]>.5?i+1:i;
      }
    }
    return last;
  }

  addTimes(day, from)
  {
    this.timeToSched(day, from);
    this.buildReservationsSchedule();
    this.notify.emit(this.reservations);
  }

  buildReservationsSchedule()
  {
    let days =["Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
    this.reservations = [];
    for(let day in this.days)
    {
      let first = this.getFirst(day);
      let last = this.getLast(day);
      console.log("First: "+first);
      if(first >= 0)
      {
        let to = this.times[last]?this.getTime(last,day, false):"23:00";
        this.reservations.push({day: days[day], class_id: 1, start_time: this.getTime(first,day, true), end_time: to});
      }
    }
  }

  buildSchedule()
  {

  }
}
