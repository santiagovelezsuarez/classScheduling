import { Component, OnInit, Output,  EventEmitter} from '@angular/core';
import { Time, Days } from '../../models/scheduler.models';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  days = [Days.Lun, Days.Mar, Days.Mie, Days.Jue, Days.Vie, Days.Sab];
  times = ["07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22"];
  sched = [];

  reservations: Time[]=[];

  @Output() notify = new EventEmitter<Time[]>();

  constructor() {
    for(let i in this.times)
    {
      this.sched[i] = new Array(this.days.length);
    }
  }

  ngOnInit(): void { }

  timeToSched(day,time)
  {
    if(this.sched[time][day]==1)
    {
      this.sched[time][day]=0.5;
    }
    else if(this.sched[time][day]==0.5)
    {
      this.sched[time][day]=0.55;
    }
    else if(this.sched[time][day]==0.55)
    {
      this.sched[time][day]="";
    }
    else
    {
      this.sched[time][day]=1;
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
      for(let i=first; i<last; i++)
      {
          this.sched[i][day] = 1;
      }
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

  private getLast(day): number
  {
    let last = -1;
    for(let i=0; i<this.sched.length; i++)
    {
      if(this.sched[i][day])
        last = i;
    }
    return last;
  }

  addTimes(day, time)
  {
    //this.reservations.push({day, time});
    this.timeToSched(day, time);
    this.notify.emit(this.reservations);
  }

}
