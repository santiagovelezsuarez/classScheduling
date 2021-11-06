import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Teacher, Building } from '../models/scheduler.models';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  endpoint:string = 'https://api';

  buildings: Building[] = [
    {
      id: 1,
      name: "A"
    },
    {
      id: 2,
      name: "B"
    }
  ];

  constructor(private httpClient: HttpClient) { }

  createBuilding(building: Building):Observable<Number>
  {
    return of(this.buildings.push(building));
  }

  getBuildings():Observable<Building[]>
  {
    return of(this.buildings);
  }

  getBuilding(id:number):Observable<Building>
  {
    return of(this.buildings[id-1]);
  }


}
