"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.BookingController = void 0;
const booking_service_1 = require("../services/booking.service");
const tsoa_1 = require("tsoa");
const consts_1 = require("../utils/consts");
const tokenValidation_1 = require("../middlewares/tokenValidation");
const customError_1 = require("../utils/customError");
let BookingController = class BookingController {
    constructor() {
        this.bookingService = new booking_service_1.BookingService();
    }
    GetAllBooking(queryparam) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.bookingService.GetAllBooking(queryparam);
                return {
                    message: "Booking found!!",
                    data: data
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    CreateBooking(requestBody, request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!request.id) {
                    throw new customError_1.BaseCustomError("Unauthorized", consts_1.StatusCode.Unauthorized);
                }
                const Bookingdata = Object.assign(Object.assign({}, requestBody), { booking_info: requestBody.booking_info.map(info => (Object.assign(Object.assign({}, info), { customer_id: request.id }))) });
                const booking = yield this.bookingService.CreateBooking(Bookingdata);
                return {
                    message: "Booking created successfully!!",
                    data: Bookingdata
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.BookingController = BookingController;
__decorate([
    (0, tsoa_1.SuccessResponse)(consts_1.StatusCode.OK, "Success"),
    (0, tsoa_1.Get)("/"),
    __param(0, (0, tsoa_1.Queries)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "GetAllBooking", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(consts_1.StatusCode.Created, "Booking Success"),
    (0, tsoa_1.Post)("/"),
    (0, tsoa_1.Middlewares)(tokenValidation_1.verifyToken),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "CreateBooking", null);
exports.BookingController = BookingController = __decorate([
    (0, tsoa_1.Route)('/booking'),
    (0, tsoa_1.Tags)('Booking'),
    __metadata("design:paramtypes", [])
], BookingController);
