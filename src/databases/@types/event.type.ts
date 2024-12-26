export interface IEventInfo {
    name: string;
    time: string;
    description: string;
    isSpecial?: boolean;
    thumbnail: string;
    admin_id?: string;
}

export interface Ievent {
    date: Date;
    isFull?: boolean;
    booking_info?: string[];
    isdeleted?: boolean;
    event_info: IEventInfo[];
}