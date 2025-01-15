import { BookingService } from "../services/booking.service";
import {Route , Tags , Get , SuccessResponse , Queries, Post , Middlewares , Request , Body} from "tsoa";
import { StatusCode } from "../utils/consts";
import { verifyToken } from "../middlewares/tokenValidation";
import {IBooking} from "../databases/@types/booking.type";
import { BaseCustomError } from "../utils/customError";

@Route('/booking')
@Tags('Booking')

export class BookingController{

    private bookingService: BookingService;
    constructor(){

        this.bookingService = new BookingService();
    }

    @SuccessResponse(StatusCode.OK, "Success")
    @Get("/")
    public async GetAllBooking(): Promise<any> {
        try{
            const data = await this.bookingService.GetAllBooking();
            return {
                message : "Booking found!!",
                data : data
            }
        }catch(error:unknown | any){
            throw error;
        }
    }

    @SuccessResponse(StatusCode.Created, "Booking Success")
    @Post("/")
    @Middlewares(verifyToken)
    public async CreateBooking(@Body() requestBody:IBooking ,@Request() request: any):Promise<any>{
        try{
            if(!request.id){
                throw new BaseCustomError("Unauthorized", StatusCode.Unauthorized);
            }
            const Bookingdata = {
                ...requestBody,
                booking_info: requestBody.booking_info.map(info => ({
                  ...info,
                  customer_id: request.id
                }))
              };
            const booking = await this.bookingService.CreateBooking(Bookingdata);
            return {
                message : "Booking created successfully!!",
                data : Bookingdata
            }
        }catch(error:unknown | any){
            throw error;
        }
    }
}