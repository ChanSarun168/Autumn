export interface Ievent{
    name:string;
    date:Date;
    time:string;
    isSpecial ?: boolean;
    isFull ?: boolean;
    description:string;
    thumbnail:string;
    booking_table?:string[];
    isdeleted?:boolean;
    admin_id?:string;
}