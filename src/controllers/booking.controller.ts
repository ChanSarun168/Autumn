import { BookingService } from "../services/booking.service";
import {
    Route, Tags, Get, SuccessResponse,
    Queries, Post, Middlewares,
    Request, Body
} from "tsoa";
import { StatusCode } from "../utils/consts";
import { verifyToken } from "../middlewares/tokenValidation";
import { IBooking } from "../databases/@types/booking.type";
import { BaseCustomError } from "../utils/customError";
import { UserModel } from "../databases/models/user.model";  // ← new import

export interface IQueryBooking {
    date?: Date;
}

@Route("/booking")
@Tags("Booking")
export class BookingController {
    private bookingService: BookingService;

    constructor() {
        this.bookingService = new BookingService();
    }

    @SuccessResponse(StatusCode.OK, "Success")
    @Get("/")
    public async GetAllBooking(
        @Queries() queryparam: IQueryBooking
    ): Promise<any> {
        try {
            const data = await this.bookingService.GetAllBooking(queryparam);
            return { message: "Booking found!!", data };
        } catch (error: unknown | any) {
            throw error;
        }
    }

    @SuccessResponse(StatusCode.Created, "Booking Success")
@Post("/")
@Middlewares(verifyToken)
public async CreateBooking(
  @Body() requestBody: IBooking,
  @Request() request: any
): Promise<any> {
  // 1) auth check
  if (!request.id) {
    throw new BaseCustomError("Unauthorized", StatusCode.Unauthorized);
  }

  try {
    // 2) prepare payload (attach customer_id)
    const Bookingdata = {
      ...requestBody,
      booking_info: requestBody.booking_info.map(info => ({
        ...info,
        customer_id: request.id
      }))
    };

    // 3) create booking record
    const bookingDoc = await this.bookingService.CreateBooking(Bookingdata);

    // 4) flatten tables and grab the normalized date string
    const tables = Bookingdata.booking_info.flatMap(info => info.tables);
    const bookingDate = bookingDoc.date; // e.g. "2025-05-28"

    // 5) try to add these tables into an existing entry for that date
    const updateResult = await UserModel.updateOne(
      { _id: request.id, "booking_history.date": bookingDate },
      { $addToSet: { "booking_history.$.tables": { $each: tables } } }
    );

    // 6) if no existing date entry, push a new one
    if (updateResult.matchedCount === 0) {
      await UserModel.findByIdAndUpdate(request.id, {
        $push: {
          booking_history: {
            date: bookingDate,
            tables: tables
          }
        }
      });
    }

    // 7) return response
    return {
      message: "Booking created successfully!!",
      data: Bookingdata
    };
  } catch (error: unknown | any) {
    throw error;
  }
}

}
