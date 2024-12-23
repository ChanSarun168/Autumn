import { Ievent } from "../@types/event.type";
import { EventModel } from "../models/event.model";

export class eventrepository{

    async GetAllEvent(){
        try{
            return EventModel.find({isdeleted:false});
        }catch(error:unknown | any){
            throw error;
        }
    }

    async CreateEvent(data:Ievent){
        try{
            return await EventModel.create(data);
        }catch(error:unknown | any){
            throw error;
        }
    }
}