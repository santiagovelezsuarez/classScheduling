import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCourseComponent } from './form-course.component';

xdescribe('FormCourseComponent', () => {
  let component: FormCourseComponent;
  let fixture: ComponentFixture<FormCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
