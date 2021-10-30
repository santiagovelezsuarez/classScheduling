import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Room } from '../../models/scheduler.models';
import { RoomInfoService } from '../../services/room-info.service';

@Component({
  selector: 'app-form-room',
  templateUrl: './form-room.component.html',
  styleUrls: ['./form-room.component.css']
})
export class FormRoomComponent implements OnInit {

  constructor(
    private roomInfoService: RoomInfoService
  ) { }

  msg: string = '';

  form = new FormGroup({
    building_id: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
    type: new FormControl('',[Validators.required]),
    capacity: new FormControl('',[Validators.min(1)])
  });

  ngOnInit(): void {
  }

  onSubmit(): void{
  }

}
