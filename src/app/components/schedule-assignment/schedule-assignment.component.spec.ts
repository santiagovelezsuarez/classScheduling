import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleAssignmentComponent } from './schedule-assignment.component';

xdescribe('ScheduleAssignmentComponent', () => {
  let component: ScheduleAssignmentComponent;
  let fixture: ComponentFixture<ScheduleAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
