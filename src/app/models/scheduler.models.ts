export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
}

export interface Room {
  id?: number;
  building_id: number;
  building?: Building;
  name: string;
  type: string;
  capacity: number;
}

export interface Building {
  id?: number;
  name: string;
}

export interface Teacher {
  id?: number;
  name: string;
  department_id: number;
  department?: Department;
}

export interface Department {
  id?: number;
  name: string;
}

export interface Course {
  id?: number;
  name: string;
}

export interface Class {
  id?: number;
  teacher_id: number;
  teacer?: Teacher;
  room_id: number;
  room?: Room;
  course_id: number;
  course?: Course;
  start_date: Date;
  end_date: Date;
  class_days: ClassDay[];
}

export interface ClassDay{
  class_id?: number;
  day: number;
  times: number[];
}
/* ******** */
export interface Session{
  day: number;
  times: number[];
}

export interface Schedule{
  sessions: Session[];
  description?: string;
  color?: string;
}

export enum Days {
  Lun,
  Mar,
  Mie,
  Jue,
  Vie,
  Sab,
  Dom
}

export const DAY: string[] = ["LUN","MAR","MIE","JUE","VIE","SAB","DOM"];

export enum Cell {
  FREE,
  FULL,
  BUSY
}
