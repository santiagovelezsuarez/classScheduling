import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TeacherService } from 'src/app/services/teacher.service';

import { TeacherListComponent } from './teacher-list.component';

describe('TeacherListComponent', () => {
  let component: TeacherListComponent;
  let fixture: ComponentFixture<TeacherListComponent>;
  const teachers = [
    {
      id: 1,
      name: "Julia",
      department_id: 1
    },
    {
      id: 2,
      name: "Jaime",
      department_id: 1
    }
  ];

  beforeEach(() => {
    let teacherServiceStub : Partial<TeacherService>;
    teacherServiceStub = {
      getTeachers: () => of(teachers)
    };
    TestBed.configureTestingModule({
      declarations: [ TeacherListComponent ],
      imports: [HttpClientTestingModule],
      providers: [{provide: TeacherService, useValue: teacherServiceStub}]
    });

    fixture = TestBed.createComponent(TeacherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get teachers', () => {    
    component.ngOnInit();
    expect(component.teachers).toEqual(teachers);
  });


  it('search a teacher', () => {    
    component.ngOnInit();
    let res = component.filter;
    expect(res.length).toEqual(2);
    component.text = "jul";
    component.search();
    res = component.filter;
    expect(res.length).toEqual(1);
    component.text = "jai";
    component.search();
    res = component.filter;
    expect(res.length).toEqual(1);
  });
});
