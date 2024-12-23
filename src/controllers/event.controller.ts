import { eventservice } from "../services/event.service";
import { StatusCode } from "../utils/consts";
import { Body, Get, Header, Middlewares, Path, Post, Query, Route, SuccessResponse } from "tsoa";

@Route("/event")
export class EventController{

    private eventService:eventservice;

    constructor(){
        this.eventService = new eventservice();
    }


    @SuccessResponse(StatusCode.OK, "Success")
    @Get("/")
    public async GetAllEvent():Promise<any>{
        try{
            const data = await this.eventService.GetAllEvent();
            return {
                message : "Event found!!",
                data : data
            }
        }catch(error:unknown | any){
            throw error;
        }
    }

}