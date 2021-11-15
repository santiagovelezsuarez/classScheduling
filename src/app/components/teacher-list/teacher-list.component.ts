import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/models/scheduler.models';
import { TeacherService } from '../../services/teacher.service';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit
{
  teachers: Teacher[] = [];
  filter: Teacher[] = [];
  text: string = "";

  constructor
  (
    private teacherService: TeacherService,
    private departmentService: DepartmentService
  )
  { }

  ngOnInit(): void
  {
    this.getTeachers();
  }

  getTeachers()
  {
    this.teacherService.getTeachers().subscribe(rs => {
        this.teachers = rs
        for(let teacher of this.teachers)
        {
          this.departmentService.getDepartment(teacher.department_id).subscribe(rs => teacher.department = rs);
        }
        this.filter = this.teachers;
    });
  }

  search()
  {
    this.filter = this.teachers.filter(x => x.name.toLowerCase().includes(this.text.toLowerCase() ));
  }

}
