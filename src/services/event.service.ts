import { BaseCustomError } from "../utils/customError";
import { eventrepository } from "../databases/repositories/event.repository";
import { StatusCode } from "../utils/consts";
import { Ievent } from "src/databases/@types/event.type";

export class eventservice{

    private eventRepo:eventrepository;

    constructor(){
        this.eventRepo = new eventrepository();
    }

    async GetAllEvent(){
        try{
            const data = await this.eventRepo.GetAllEvent();
            if (data.length <= 0) {
                    throw new BaseCustomError("no user", StatusCode.NoContent);
                  }
            return data;
        }catch(error:unknown | any){
            throw error;
        }
    }

    async CreateEvent(data:Ievent){
        try{
            return await this.eventRepo.CreateEvent(data);
        }catch(error:unknown | any){
            throw error;
        }
    }
}