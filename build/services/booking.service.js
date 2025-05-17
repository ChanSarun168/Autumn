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
exports.BookingService = void 0;
const customError_1 = require("../utils/customError");
const booking_repository_1 = require("../databases/repositories/booking.repository");
const consts_1 = require("../utils/consts");
class BookingService {
    constructor() {
        this.bookingRepository = new booking_repository_1.BookingRepository();
    }
    GetAllBooking(queryparam) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.bookingRepository.GetAllBooking(queryparam);
                if (data.length === 0) {
                    throw new customError_1.BaseCustomError("Booking not found", consts_1.StatusCode.NotFound);
                }
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    CreateBooking(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const booking = yield this.bookingRepository.CreateBooking(data);
                return booking;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.BookingService = BookingService;
