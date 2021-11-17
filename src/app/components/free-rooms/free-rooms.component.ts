import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-free-rooms',
  templateUrl: './free-rooms.component.html',
  styleUrls: ['./free-rooms.component.css']
})
export class FreeRoomsComponent implements OnInit {

  constructor() { }

  form = new FormGroup({
    start_date: new FormControl('',[Validators.required]),
    end_date:  new FormControl('',[Validators.required]),
    capacity:  new FormControl('',[Validators.required])
  });

  ngOnInit(): void
  {
  }

  onSubmit(): void
  {
    console.log("Form Free-Rooms: ");
    let cl = this.form.value;
    console.log(this.form.value);
  }

}
