export interface Ievent{
    name:string;
    date:Date;
    isSpecial ?: boolean;
    isFull ?: boolean;
    description:string;
    thumbail:string;
    booking_table?:string[];
    isdeleted?:boolean
}