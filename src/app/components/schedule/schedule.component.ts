import { Component, OnInit, Output,  EventEmitter, Input} from '@angular/core';
import { Session, Days, Schedule, Cell, DAY, SCell, timeInterval } from '../../models/scheduler.models';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {


  @Input() readonly: boolean = false;

  @Input() horizontal: boolean = true;

  @Input() iTime: number = 8;

  @Input() fTime: number = 20;

  @Input() cellsPerHour = 2;

  @Input() iDay: Days = Days.Lun;

  @Input() fDay: Days = Days.Vie;

  // @Input() schedules: Schedule[] = [];
  private _schedules: Schedule[] = [];
  @Input() set schedules(value: Schedule[]){
    this._schedules = value;
    this.drawSessions();
  };

  @Output() notify = new EventEmitter<Session[]>();

  sessions: Session[] = [];

  Cell = Cell;

  cells: SCell[][] = [];

  tHead: string[] = ["Hora"];

  constructor()
  {
    for(let day = 0; day<= (this.fDay-this.iDay); day++)
    {
      this.tHead.push(DAY[day+this.iDay]);
      this.cells[day] = [];
      for(let time = 0; time< ((this.fTime-this.iTime)+1)*this.cellsPerHour; time++)
      {
        //console.log(time);
        this.cells[day][time] = {value: Cell.FREE, description: ".", color: ""};
      }
    }
  }

  ngOnInit(): void {
    this.drawSessions();
  }

  nTime(i:number)
  {
    let t = i/this.cellsPerHour+this.iTime;
    let ft = t>12?(t-12)+" PM":t+" AM";
    ft = t==12?t+" PM":ft;
    ft = t==24?"12 AM":ft;
    ft = t<10||(t>12&&t<22)?"0"+ft:ft;
    return ft;
  }

  onCellClick(i,j)
  {
    if(this.cells[i][j].value!=Cell.BUSY)
    {
      this.cells[i][j].value = this.changeCellValue(this.cells[i][j].value);
      //this.changeCellValue2(i,j);
      this.notifySessions();
    }
  }

  private changeCellValue(cell)
  {
    let values = [Cell.FREE, Cell.FULL];
    let val = cell + 1;
    return val>=values.length?values[0]:values[val];
  }

  private notifySessions()
  {
    this.sessions = [];
    for(let day=0; day<this.cells.length; day++)
    {
      let times: timeInterval[] = [];
      let itime = -1;
      let ftime = -1;
      for(let time=0; time<this.cells[day].length; time++)
      {
        if(this.cells[day][time].value==Cell.FULL && itime==-1)
        {
            itime = time + this.iTime;
        }
        if(this.cells[day][time].value!=Cell.FULL)
        {
            if(itime!=-1)
            {
                ftime = time + this.iTime;
                itime = (itime + this.iTime) / this.cellsPerHour ;
                ftime = (ftime + this.iTime) / this.cellsPerHour ;
                times.push({itime,ftime});
            }
            itime = -1;
            ftime = -1;
        }
        if(time==(this.cells[day].length-1) && this.cells[day][time].value==Cell.FULL)
        {
            ftime= time + 1 + this.iTime;
            times.push({itime,ftime});
        }
      }
      if(times.length>0)
        this.sessions.push({day, times});
    }
    this.notify.emit(this.sessions);
  }

  drawSessions()
  {
    this.cleanCells();
    //console.log("Sessions: ");
    for(let schedule of this._schedules)
    {
      let desc = schedule.description;
      let color = schedule.color;
      for(let session of schedule.sessions)
      {
        //console.log("session: ",session);
        for(let time of session.times)
        {
          //console.log("time:", time);
          for(let t = ((time.itime - this.iTime) * this.cellsPerHour); t< ((time.ftime - this.iTime) * this.cellsPerHour); t++)
          {
            this.cells[session.day][t].value = Cell.BUSY;
            this.cells[session.day][t].description = desc;
            this.cells[session.day][t].color = color;
          }
        }
      }
    }
  }

  cleanCells() {
    this.cells = this.cells.map(
      cell => cell.map(x => x.value!=Cell.FREE?{value: Cell.FREE, description: ".", color: ""}:x)
    );
    this.notifySessions();
  }
}


/*
*** Build session times Algorith
let lunes = [0,1,1,0,0,0,0,0,0,1,1,0,0,1,1,0]; //8-10,16-18,20-23
let iTime = 7;
let times = [];
let itime = -1;
let ftime = -1;
for(let i=0; i<lunes.length; i++)
{
    if(lunes[i]==1 && itime==-1)
    {
        itime = i + iTime;
    }
    if(lunes[i]==0)
    {
        if(itime!=-1)
        {
            ftime= i + iTime;
            times.push({itime,ftime});
        }
        itime = -1;
        ftime = -1;
    }
    if(i==(lunes.length-1) && lunes[i]==1)
    {
        ftime= i + 1 + iTime;
        times.push({itime,ftime});
    }
}
console.log(times);
*/
