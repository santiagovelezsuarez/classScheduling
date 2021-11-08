import { Component, OnInit, Output,  EventEmitter, Input} from '@angular/core';
import { Session, Days, Schedule, Cell, DAY } from '../../models/scheduler.models';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {


  @Input() readonly: boolean = false;

  @Input() iTime: number = 7;

  @Input() fTime: number = 11;

  @Input() iDay: Days = Days.Lun;

  @Input() fDay: Days = Days.Mie;

  // @Input() schedules: Schedule[] = [];
  private _schedules: Schedule[] = [];
  @Input() set schedules(value: Schedule[]){
    this._schedules = value;
    this.drawSessions();
  };

  @Output() notify = new EventEmitter<Session[]>();

  sessions: Session[] = [];

  Cell = Cell;

  cells: number[][] = [];

  tHead: string[] = ["Hora"];

  constructor()
  {
    for(let day = 0; day<= (this.fDay-this.iDay); day++)
    {
      this.tHead.push(DAY[day+this.iDay]);
      this.cells[day] = [];
      for(let time = 0; time< ((this.fTime-this.iTime)+1)*2; time++)
      {
        //console.log(time);
        this.cells[day][time] = Cell.FREE;
      }
    }
  }

  ngOnInit(): void {this.drawSessions();
  }

  nTime(i:number)
  {
    let t = i/2+this.iTime;
    let ft = t>12?(t-12)+" PM":t+" AM";
    ft = t==12?t+" PM":ft;
    ft = t==24?"12 AM":ft;
    ft = t<10||(t>12&&t<22)?"0"+ft:ft;
    return ft;
  }

  onCellClick(i,j)
  {
    this.cells[i][j] = this.changeCellValue(this.cells[i][j]);
    //this.changeCellValue2(i,j);
    this.notifySessions();
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
      console.log(DAY[day]);
      let times: number[] = [];
      for(let time=0; time<this.cells[0].length; time++)
      {
        console.log(this.cells[day][time]);
        if(this.cells[day][time] === Cell.FULL)
        {
          times.push(time/2+this.iTime);
        }

      }
      if(times.length>0)
        this.sessions.push({day, times});
    }
    this.notify.emit(this.sessions);
  }

  drawSessions()
  {console.log("Sessions: ");
  this.cells[2][2] = Cell.FREE;
    for(let schedule of this._schedules)
    {
      for(let session of schedule.sessions)
      {
        console.log(session);
        this.cells[2][2] = Cell.BUSY;
      }
    }
  }



}
