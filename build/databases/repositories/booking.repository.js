"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRepository = void 0;
const booking_model_1 = require("../models/booking.model");
class BookingRepository {
    GetAllBooking(queryparam) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { date } = queryparam;
                if (date) {
                    const formattedDate = new Date(date).toISOString().split("T")[0];
                    return yield booking_model_1.BookingModel.find({ date: formattedDate });
                }
                return yield booking_model_1.BookingModel.find();
            }
            catch (error) {
                throw error;
            }
        });
    }
    CreateBooking(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const formattedDate = new Date(data.date).toISOString().split("T")[0];
                const existingBooking = yield booking_model_1.BookingModel.findOne({
                    date: formattedDate,
                });
                if (existingBooking) {
                    // Check if the customer_id already exists in the booking_info array
                    const existingBookingInfo = existingBooking.booking_info.find((info) => info.customer_id === data.booking_info[0].customer_id);
                    if (existingBookingInfo) {
                        // If the customer_id exists, add only new tables to the existing tables array
                        const newTables = data.booking_info[0].tables.filter((table) => !existingBookingInfo.tables.includes(table));
                        existingBookingInfo.tables.push(...newTables);
                    }
                    else {
                        // If the customer_id does not exist, add a new entry to the booking_info array
                        existingBooking.booking_info.push(data.booking_info[0]);
                    }
                    return yield existingBooking.save();
                }
                else {
                    return yield booking_model_1.BookingModel.create(data);
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.BookingRepository = BookingRepository;
