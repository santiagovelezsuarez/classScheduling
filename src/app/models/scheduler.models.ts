export interface Reservation {
  id?: number;
  room_id: number;
  from: Date;
  to: Date;
  times: Time[];
}

export interface Time{
  day: string;
  from: Date;
  to: Date;
}

export enum Days{
  Lun,
  Mar,
  Mie,
  Jue,
  Vie,
  Sab,
  Dom
}
