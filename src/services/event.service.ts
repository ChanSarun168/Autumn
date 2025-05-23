import { BaseCustomError } from "../utils/customError";
import { eventrepository } from "../databases/repositories/event.repository";
import { StatusCode } from "../utils/consts";
import { Ievent } from "../databases/@types/event.type";
import { IQueryParam } from "../controllers/event.controller";

export class eventservice{

    private eventRepo:eventrepository;

    constructor(){
        this.eventRepo = new eventrepository();
    }

    async GetAllEvent(queryparam:IQueryParam){
        try{
            const data = await this.eventRepo.GetAllEvent(queryparam);
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

    async GetEventById(id:string){
        try{
            const data = await this.eventRepo.GetEventById(id);
            if (!data) {
                throw new BaseCustomError("Event not found", StatusCode.NotFound);
              }
            return data;
        }catch(error:unknown | any){
            throw error;
        }
    }

    async UpdateEvent(id:string,date:string,data:Ievent){
        try{
            return await this.eventRepo.UpdateEvent(id,date,data);
        }catch(error:unknown | any){
            throw error;
        }
    }

    async DeleteEvent(id:string){
        try{
            return await this.eventRepo.DeleteEvent(id);
        }catch(error:unknown | any){
            throw error;
        }
    }
}