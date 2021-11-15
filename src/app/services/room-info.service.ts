import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Room } from '../models/scheduler.models';

@Injectable({
  providedIn: 'root'
})
export class RoomInfoService {

  endpoint:string = 'https://api';

  rooms: Room[] = [
    {
      id: 1,
      building_id: 1,
      name: "A-201",
      type: "SM",
      capacity: 18
    },
    {
      id: 2,
      building_id: 1,
      name: "A-403",
      type: "XL",
      capacity: 34
    },
    {
      id: 3,
      building_id: 2,
      name: "B-107",
      type: "MD",
      capacity: 24
    }
  ];

  constructor(private httpClient: HttpClient) { }

  generateId(): number
  {
    let current = this.rooms.length;
    return ++current;
  }

  createRoom(room: Room):Observable<Number>
  {
    room.id = this.generateId();
    return of(this.rooms.push(room));
  }

  getRooms():Observable<Room[]>
  {
    return of(this.rooms);
  }

  getRoom(id:number):Observable<Room>
  {
    return of(this.rooms[id-1]);
  }
}
