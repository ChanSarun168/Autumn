import { BaseCustomError } from '../utils/customError';
import { BookingRepository } from '../databases/repositories/booking.repository';
import { StatusCode } from '../utils/consts';
import { IBooking } from '../databases/@types/booking.type';

export class BookingService {
    private bookingRepository: BookingRepository
    constructor() {
        this.bookingRepository = new BookingRepository();
    }

    async GetAllBooking() {
        try {
            const data = await this.bookingRepository.GetAllBooking();
            if(data.length === 0){
                throw new BaseCustomError("Booking not found", StatusCode.NotFound);
            }
            return data;
        } catch (error: unknown | any) {
            throw error;
        }
    }

    async CreateBooking(data: IBooking) {
        try {
            const booking = await this.bookingRepository.CreateBooking(data);
            return booking;
        } catch (error: unknown | any) {
            throw error;
        }
    }
}