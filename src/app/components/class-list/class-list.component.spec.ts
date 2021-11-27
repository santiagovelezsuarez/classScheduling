import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ClassService } from 'src/app/services/class.service';

import { ClassListComponent } from './class-list.component';

describe('ClassListComponent', () => {
  let component: ClassListComponent;
  let fixture: ComponentFixture<ClassListComponent>;
  const classes = [
    {
      id: 1,
      teacher_id: 3,
      room_id: 2,
      course_id: 1,
      start_date: new Date("2019-01-16"),
      end_date: new Date("2019-05-16"),
      class_days: [
        {
          day: 0,
          times: [{itime: 8, ftime:10},{itime: 17.5, ftime: 19.5}] // Lun 8 - 10 , 17 - 19:30
        }
      ]
    },
    {
      id: 2,
      teacher_id: 1,
      room_id: 2,
      course_id: 2,
      start_date: new Date("2019-01-16"),
      end_date: new Date("2019-05-16"),
      class_days: [
        {
          day: 2,
          times: [{itime: 9, ftime: 10.5}] // Mie 9 - 10:30
        }
      ]
    }
  ];
  

  beforeEach( () => {
    let classServiceStub : Partial<ClassService>;
    classServiceStub = {
      getClasses: () => of(classes)
    };
    
    TestBed.configureTestingModule({
      declarations: [ ClassListComponent ],
      imports: [HttpClientTestingModule],
      providers: [{provide: ClassService, useValue: classServiceStub}]
    });

    fixture = TestBed.createComponent(ClassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get classes', () => {    
    component.ngOnInit();
    expect(component.classes).toEqual(classes);
  });


  it('search a class', () => {    
    component.ngOnInit();
    let res = component.filter;
    expect(res.length).toEqual(2);
    component.text = "ingl";
    component.search();
    res = component.filter;
    expect(res.length).toEqual(1);
    component.text = "mate";
    component.search();
    res = component.filter;
    expect(res.length).toEqual(1);
    component.text = "";
    component.search();
    res = component.filter;
    expect(res.length).toEqual(2);
  });
});
