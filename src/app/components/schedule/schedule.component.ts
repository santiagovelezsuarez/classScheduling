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

  @Input() fTime: number = 22;

  @Input() iDay: Days = Days.Lun;

  @Input() fDay: Days = Days.Sab;

  @Input() schedules: Schedule[] = [];

  cells: number[][] = [];

  tHead: string[] = ["Hora"];

  constructor()
  {
    for(let day = 0; day<= (this.fDay-this.iDay); day++)
    {
      this.tHead.push(DAY[day+this.iDay]);
      this.cells[day] = [];
      for(let time = 0; time<= (this.fTime-this.iTime); time++)
      {
        console.log(time);
        this.cells[day][time] = Cell.FREE;
      }
    }
  }

  ngOnInit(): void {
  }

  nTime(i:number)
  {
    let t = i + this.iTime;
    let ft = t>12?(t-12)+" PM":t+" AM";
    ft = t==12?t+" PM":ft;
    ft = t==24?"12 AM":ft;
    ft = t<10||(t>12&&t<22)?"0"+ft:ft;
    return ft;
  }

  onCellClick(i,j)
  {
    console.log(i,j);
    this.cells[i][j] = this.changeCellValue(this.cells[i][j]);
  }

  private changeCellValue(cell)
  {
    let values = [Cell.FREE, Cell.FULL, Cell.IHALF, Cell.FHALF];
    let val = cell + 1;
    return val>=values.length?values[0]:values[val];
  }

}
