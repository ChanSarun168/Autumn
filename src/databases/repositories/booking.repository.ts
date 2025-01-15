import e from "express";
import { IBooking } from "../@types/booking.type";
import { BookingModel } from "../models/booking.model";

export class BookingRepository {
  async GetAllBooking() {
    try {
      return await BookingModel.find();
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async CreateBooking(data: IBooking) {
    try {
      const formattedDate = new Date(data.date).toISOString().split("T")[0];
      const existingBooking = await BookingModel.findOne({
        date: formattedDate,
      });

      if (existingBooking) {
        // Check if the customer_id already exists in the booking_info array
        const existingBookingInfo = existingBooking.booking_info.find(
          (info) => info.customer_id === data.booking_info[0].customer_id
        );

        if (existingBookingInfo) {
          // If the customer_id exists, update the tables for that customer
          existingBookingInfo.tables = data.booking_info[0].tables;
        } else {
          // If the customer_id does not exist, add a new entry to the booking_info array
          existingBooking.booking_info.push(data.booking_info[0]);
        }

        return await existingBooking.save();
      } else {
        return await BookingModel.create(data);
      }
    } catch (error: unknown | any) {
      throw error;
    }
  }
}
