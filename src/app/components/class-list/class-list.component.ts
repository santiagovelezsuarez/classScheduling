import { Component, OnInit } from '@angular/core';
import { Class, DAY } from 'src/app/models/scheduler.models';
import { ClassService } from 'src/app/services/class.service';
import { CourseService } from '../../services/course.service';
import { TeacherService } from '../../services/teacher.service';
import { RoomInfoService } from '../../services/room-info.service';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})

export class ClassListComponent implements OnInit
{

  classes: Class[] = [];
  filter: Class[] = [];
  text: string = "";
  Day = DAY;
  Math = Math;

  constructor
  (
    private classService: ClassService,
    private courseService: CourseService,
    private teacherService: TeacherService,
    private roomInfoService: RoomInfoService
  )
  { }

  ngOnInit(): void
  {
    this.getClasses();
  }

  getClasses()
  {
    this.classService.getClasses().subscribe(rs => {
        this.classes = rs
        for(let classs of this.classes)
        {
          this.courseService.getCourse(classs.course_id).subscribe(rs => classs.course = rs);
          this.teacherService.getTeacher(classs.teacher_id).subscribe(rs => classs.teacer = rs);
          this.roomInfoService.getRoom(classs.room_id).subscribe(rs => classs.room = rs);
        }
        this.filter = this.classes;
    });
  }

  search()
  {
    this.filter = this.classes.filter(x => x.course.name.toLowerCase().includes(this.text.toLowerCase() ));
  }

}
