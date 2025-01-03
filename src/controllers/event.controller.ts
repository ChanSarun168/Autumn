import { BaseCustomError } from "../utils/customError";
import { Ievent } from "../databases/@types/event.type";
import { verifyToken } from "../middlewares/tokenValidation";
import { eventservice } from "../services/event.service";
import { StatusCode } from "../utils/consts";
import { Body, Get, Header, Middlewares, Path, Post, Query, Route, SuccessResponse , Request, Put, Delete , Tags, Queries} from "tsoa";

export interface IeventInfo{
    name:string;
    date:Date;
    time:string;
    description:string;
    thumbnail:string;
    isSpecial?:boolean;
}

export interface IQueryParam{
    date? : Date;
    isSpecial?:boolean;
}

@Route("/event")
@Tags("Event")
export class EventController{

    private eventService:eventservice;

    constructor(){
        this.eventService = new eventservice();
    }


    @SuccessResponse(StatusCode.OK, "Success")
    @Get("/")
    public async GetAllEvent(@Queries() queryparam:IQueryParam):Promise<any>{
        try{
            const data = await this.eventService.GetAllEvent(queryparam);
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
            const Eventdata = {...requestBody	, admin_id : request.id};
            const event = await this.eventService.CreateEvent(Eventdata);
            return {
                message : "Event has create successfully",
                data : event
            }
        }catch(error:unknown | any){
            throw error;
        }
    }

    @SuccessResponse(StatusCode.OK, "Success")
    @Get("/{id}")
    public async GetEventById(@Path() id:string):Promise<any>{
        try{
            const data = await this.eventService.GetEventById(id);
            return {
                message : "Event found!!",
                data : data
            }
        }catch(error:unknown | any){
            throw error;
        }
    }

    @SuccessResponse(StatusCode.OK, "Success")
    @Put("/{id}")
    @Middlewares(verifyToken)
    public async UpdateEvent(@Path() id:string , @Body() requestBody:Ievent , @Request() request: any):Promise<any>{
        try{
            if (request.role == "Customer") {
                throw new BaseCustomError(
                  "You do not have permission to access this resource",
                  StatusCode.Forbidden
                );
            }
            const Eventdata = {...requestBody	, admin_id : request.id};
            const data = await this.eventService.UpdateEvent(id,Eventdata);
            return {
                message : "Event updated successfully",
                data : data
            }
        }catch(error:unknown | any){
            throw error;
        }
    }

    @SuccessResponse(StatusCode.OK, "Success")
    @Delete("/{id}")
    public async DeleteEvent(@Path() id:string):Promise<any>{
        try{
            const data = await this.eventService.DeleteEvent(id);
            return {
                message : "Event deleted successfully",
            }
        }catch(error:unknown | any){
            throw error;
        }
    }
}