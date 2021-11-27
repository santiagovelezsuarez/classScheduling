import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Room } from '../models/scheduler.models';

import { RoomInfoService } from './room-info.service';

describe('RoomInfoService', () => {
  let service: RoomInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule],});
    service = TestBed.inject(RoomInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get one room info', () => {
    let teacher = service.getRoom(1);
    teacher.subscribe(result=>{expect(result.name).toBe("A-201")});
  });

  it('create new room', () => {
    let room:Room = ({
      building_id: 2,
      name: "Test room",
      type: "SM",
      capacity: 14
    });

    let result = service.createRoom(room);
    result.subscribe(result=>{
      expect(result).toBe(4);
      let createdRoom = service.getRoom(result as number);
      createdRoom.subscribe(res=>{
        expect(res.name).toBe("Test room");
        expect(res.building_id).toBe(2);
        expect(res.capacity).toBe(14);
      });
    });
  });
});
