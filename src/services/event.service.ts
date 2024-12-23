import { BaseCustomError } from "../utils/customError";
import { eventrepository } from "../databases/repositories/event.repository";
import { StatusCode } from "../utils/consts";

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
}