
import { TestBed } from '@angular/core/testing';
import { TeacherService } from './teacher.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Teacher } from '../models/scheduler.models';

describe('TeacherService', () => {
  let service: TeacherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TeacherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get all the teachers', () => {
    let teachers = service.getTeachers();
    teachers.subscribe(result=>{expect(result.length).toBeGreaterThan(0)});
  });

  it('get one teacher', () => {
    let teacher = service.getTeacher(1);
    teacher.subscribe(result=>{expect(result.name).toBe("Julia")});
  });

  it('create new teacher', () => {
    let teacher:Teacher = ({
      name: "Test teacher",
      department_id: 1
    });

    let result = service.createTeacher(teacher);
    result.subscribe(result=>{
      expect(result).toBe(4);
      let createdTeacher = service.getTeacher(result as number);
      createdTeacher.subscribe(res=>{
        expect(res.name).toBe("Test teacher");
        expect(res.department_id).toBe(1)
      });
    });
  });
});
