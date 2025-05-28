export interface IBookingHistory {
  date: string;        // formatted "YYYY-MM-DD"
  tables: string[];
}

export interface IUser{
    name:string;
    email:string;
    phonenumber:string;
    password:string;
    profile?:string;
    isdeleted?:boolean;
    role?:string;
    booking_history?: IBookingHistory[];
}