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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventrepository = void 0;
const customError_1 = require("../../utils/customError");
const event_model_1 = require("../models/event.model");
const mongoose_1 = __importDefault(require("mongoose"));
const consts_1 = require("../../utils/consts");
class eventrepository {
    GetAllEvent(queryparam) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { date, isSpecial } = queryparam;
                const match = { isdeleted: false };
                if (date) {
                    // Format the date to YYYY-MM-DD
                    const formattedDate = new Date(date).toISOString().split("T")[0];
                    match.date = formattedDate;
                }
                if (isSpecial !== undefined) {
                    match['event_info.isSpecial'] = isSpecial;
                }
                const pipeline = [
                    { $match: match },
                    { $unwind: '$event_info' }
                ];
                if (isSpecial !== undefined) {
                    pipeline.push({ $match: { 'event_info.isSpecial': isSpecial } });
                }
                pipeline.push({
                    $group: {
                        _id: '$_id',
                        date: { $first: '$date' },
                        isdeleted: { $first: '$isdeleted' },
                        event_info: { $push: '$event_info' }
                    }
                });
                return event_model_1.EventModel.aggregate(pipeline);
            }
            catch (error) {
                throw error;
            }
        });
    }
    CreateEvent(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Format the date to YYYY-MM-DD
                const formattedDate = new Date(data.date).toISOString().split('T')[0];
                const existingEvent = yield event_model_1.EventModel.findOne({ date: formattedDate, isdeleted: false });
                if (existingEvent) {
                    // If an event with the same date exists, update the event_info array
                    existingEvent.event_info.push(...data.event_info);
                    return yield existingEvent.save();
                }
                else {
                    // If no event with the same date exists, create a new document
                    return yield event_model_1.EventModel.create(data);
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    GetEventById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    throw new customError_1.BaseCustomError("Invalid Mongo Id Format", consts_1.StatusCode.NotFound);
                }
                return event_model_1.EventModel.findOne({ _id: id, isdeleted: false });
            }
            catch (error) {
                throw error;
            }
        });
    }
    UpdateEvent(id, date, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    throw new customError_1.BaseCustomError("Invalid Mongo Id Format", consts_1.StatusCode.NotFound);
                }
                const day = yield event_model_1.EventModel.findOne({ date: date, isdeleted: false });
                if (!day) {
                    throw new customError_1.BaseCustomError("No event today", consts_1.StatusCode.NotFound);
                }
                // return EventModel.findByIdAndUpdate(id, data, { new: true });
                return day;
            }
            catch (error) {
                throw error;
            }
        });
    }
    DeleteEvent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    throw new customError_1.BaseCustomError("Invalid Mongo Id Format", consts_1.StatusCode.NotFound);
                }
                const event = yield event_model_1.EventModel.findOne({ _id: id, isdeleted: false });
                if (!event) {
                    throw new customError_1.BaseCustomError("Event not found", consts_1.StatusCode.NotFound);
                }
                return event_model_1.EventModel.findByIdAndUpdate(id, { isdeleted: true }, { new: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.eventrepository = eventrepository;
