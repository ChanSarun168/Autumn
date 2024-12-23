import { BaseCustomError } from "../utils/customError";
import { Ievent } from "../databases/@types/event.type";
import { verifyToken } from "../middlewares/tokenValidation";
import { eventservice } from "../services/event.service";
import { StatusCode } from "../utils/consts";
import { Body, Get, Header, Middlewares, Path, Post, Query, Route, SuccessResponse , Request } from "tsoa";

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

    @SuccessResponse(StatusCode.Created, "Created Success")
    @Post("/")
    @Middlewares(verifyToken)
    public async CreateEvent(@Body() requestBody:Ievent ,@Request() request: any):Promise<any>{
        try{
            if (request.role == "Customer") {
                throw new BaseCustomError(
                  "You do not have permission to access this resource",
                  StatusCode.Forbidden
                );
            }
            const event = await this.eventService.CreateEvent(requestBody);
            return {
                message : "Event has create successfully",
                data : event
            }
        }catch(error:unknown | any){
            throw error;
        }
    }
}