import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/models/scheduler.models';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {

  classes: Class[] = [];


  constructor(private classService: ClassService) { }

  ngOnInit(): void {
    this.getClasses();
  }

  getClasses()
  {
    this.classService.getClasses().subscribe(rs => this.classes = rs);
  }

}
