import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/models/scheduler.models';
import { RoomInfoService } from 'src/app/services/room-info.service';
import { BuildingService } from '../../services/building.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})

export class RoomListComponent implements OnInit
{

  rooms: Room[] = [];
  filter: Room[] = [];
  text: string = "";

  constructor
  (
    private roomInfoService: RoomInfoService,
    private buildingService: BuildingService
  )
  { }

  ngOnInit(): void
  {
    this.getRooms();
  }

  getRooms()
  {
    this.roomInfoService.getRooms().subscribe(rs => {
        this.rooms = rs
        for(let room of this.rooms)
        {
          this.buildingService.getBuilding(room.building_id).subscribe(rs => room.building = rs);
        }
        this.filter = this.rooms;
    });
  }

  search()
  {
    this.filter = this.rooms.filter(x => x.name.toLowerCase().includes(this.text.toLowerCase() ));
  }

}
