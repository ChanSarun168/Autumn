export interface IBookingInfo{
    tables : string[];
    customer_id ?: string;
}

export interface IBooking{
    date : Date;
    booking_info : IBookingInfo[];
}