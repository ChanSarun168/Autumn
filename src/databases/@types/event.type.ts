export interface IEventInfo {
    name: string;
    time: string;
    description: string;
    isSpecial?: boolean;
    thumbnail: string;
    admin_id?: string;
    isdeleted?: boolean;
}

export interface Ievent {
    date: Date;
    isdeleted?: boolean;
    event_info: IEventInfo[];
}