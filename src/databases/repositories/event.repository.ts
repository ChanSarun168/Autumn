import { EventModel } from "../models/event.model";

export class eventrepository{

    async GetAllEvent(){
        try{
            return EventModel.find({isdeleted:false});
        }catch(error:unknown | any){
            throw error;
        }
    }
}