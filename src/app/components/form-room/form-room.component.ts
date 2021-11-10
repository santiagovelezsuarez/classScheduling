import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Room, Building, RoomType } from '../../models/scheduler.models';
import { RoomInfoService } from '../../services/room-info.service';
import { BuildingService } from '../../services/building.service';

@Component({
  selector: 'app-form-room',
  templateUrl: './form-room.component.html',
  styleUrls: ['./form-room.component.css']
})
export class FormRoomComponent implements OnInit {

  RoomType = RoomType;

  buildings: Building[] = [];

  constructor(
    private roomInfoService: RoomInfoService,
    private buildingService: BuildingService
  ) { }

  msg: string = '';

  formRoom = new FormGroup({
    building_id: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
    type: new FormControl('',[Validators.required]),
    capacity: new FormControl('',[Validators.min(1)])
  });

  ngOnInit(): void
  {
    this.getBuildings();
  }

  getBuildings()
  {
    this.buildingService.getBuildings().subscribe(rs => this.buildings = rs)
  }

  onSubmit(): void
  {

  }

}
