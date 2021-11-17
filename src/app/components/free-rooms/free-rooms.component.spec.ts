import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeRoomsComponent } from './free-rooms.component';

describe('FreeRoomsComponent', () => {
  let component: FreeRoomsComponent;
  let fixture: ComponentFixture<FreeRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeRoomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
