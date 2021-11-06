import { Component, OnInit, Output,  EventEmitter, Input} from '@angular/core';
import { Session, Days, Schedule } from '../../models/scheduler.models';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  days = [Days.Lun, Days.Mar, Days.Mie, Days.Jue, Days.Vie, Days.Sab];
  times = ["07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22"];
  sched = [];
  //reservations: ClassDay[]=[];

  /* **** */

  private sessions: Session[] = [];

  @Input() readonly: boolean = false;

  @Input() schedules: Schedule[];

  @Output() notify = new EventEmitter<Session[]>();

  constructor() {
    for(let i in this.times)
    {
      this.sched[i] = new Array(this.days.length);
    }
  }

  ngOnInit(): void {
    this.setUpSchedule();
  }

  timeToSched(day,time)
  {
    let atime = time -1;
    if(atime<0)
    {
      atime = 0;
    }
    if(this.sched[time][day]==1 && this.sched[atime][day])
    {
      this.sched[time][day]=0.5;
    }
    else if(this.sched[time][day]==1 && !this.sched[atime][day])
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
    this.setUpSessions();
    this.notify.emit(this.sessions);
  }

  setUpSessions()
  {
    //let days =["Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
    this.sessions = [];
    for(let day in this.days)
    {
      let first = this.getFirst(day);
      let last = this.getLast(day);
      console.log("First: "+first);
      if(first >= 0)
      {
        let end_time = this.times[last]?this.getTime(last,day, false):"23:00";
        this.sessions.push({day, start_time: this.getTime(first,day, true), end_time});
      }
    }
  }

  dayToEnum(day: string)
  {
    switch(day){
      case "Lun":
        return Days.Lun;
        break;
      case "Mar":
        return Days.Mar;
        break;
      case "Mie":
        return Days.Mie;
        break;
      case "Jue":
        return Days.Jue;
        break;
      case "Vie":
        return Days.Vie;
        break;
      case "Sab":
        return Days.Sab;
        break;
      default:
        return -1;
    }
  }

  sessionDurationToTimes(start, end) {
    let itimes = [];
    let i = this.times.indexOf(start.substr(0,start.indexOf(":")));
    let f = this.times.indexOf(end.substr(0,end.indexOf(":")));
    let h = end.substr(end.indexOf(":")+1) === "30" ? true : false;
    for(i;i<f;i++)
      itimes.push(i);
    if(h)
      itimes.push(f);
    return itimes;
  }

  setUpSchedule()
  {
    for(let schedule of this.schedules)
    {
      for(let session of schedule.sessions)
      {
      /*
        *TODO*
        * day: string -> enum Days
        * start,end time: string -> 0.5 | 0.55 | 1 && Complete()
       */

        let times = this.sessionDurationToTimes(session.start_time, session.end_time);
        for (let time of times)
        {
          this.sched[time][this.dayToEnum(session.day)] = 1;// jue to 3
        }

        let h = session.start_time.substr(session.start_time.indexOf(":")+1) === "30" ? true : false;
        if(h)
          this.sched[times[0]][this.dayToEnum(session.day)] = 0.55;
        h = session.end_time.substr(session.end_time.indexOf(":")+1) === "30" ? true : false;
        if(h)
          this.sched[times[times.length-1]][this.dayToEnum(session.day)] = 0.5;




      // session.day;
      // session.start_time;
      // session.end_time;

      // this.sched[][];
      }
    }
  }
}
