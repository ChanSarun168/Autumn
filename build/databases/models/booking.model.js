"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bookingInfoSchema = new mongoose_1.default.Schema({
    tables: [{ type: String, required: true }],
    customer_id: { type: String },
});
const bookingSchema = new mongoose_1.default.Schema({
    date: { type: String, required: true },
    booking_info: [bookingInfoSchema]
}, {
    toJSON: {
        transform(_doc, ret) {
            delete ret.__v;
        },
    },
});
bookingSchema.pre('save', function (next) {
    if (this.isModified('date')) {
        const date = new Date(this.date);
        this.date = date.toISOString().split('T')[0]; // Format to YYYY-MM-DD
    }
    next();
});
exports.BookingModel = mongoose_1.default.model("Booking", bookingSchema);
