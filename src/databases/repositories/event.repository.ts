import { BaseCustomError } from "../../utils/customError";
import { Ievent } from "../@types/event.type";
import { EventModel } from "../models/event.model";
import mongoose from "mongoose";
import { StatusCode } from "../../utils/consts";

export class eventrepository {
  async GetAllEvent() {
    try {
      return EventModel.find({ isdeleted: false });
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async CreateEvent(data: Ievent) {
    try {
       // Format the date to YYYY-MM-DD
       const formattedDate = new Date(data.date).toISOString().split('T')[0];
      const existingEvent = await EventModel.findOne({ date: formattedDate, isdeleted: false });
      if (existingEvent) {
        // If an event with the same date exists, update the event_info array
        existingEvent.event_info.push(...data.event_info);
        return await existingEvent.save();
      } else {
        // If no event with the same date exists, create a new document
        return await EventModel.create(data);
      }
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async GetEventById(id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BaseCustomError(
          "Invalid Mongo Id Format",
          StatusCode.NotFound
        );
      }
      return EventModel.findOne({ _id: id, isdeleted: false });
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async UpdateEvent(id: string, data: Ievent) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BaseCustomError(
          "Invalid Mongo Id Format",
          StatusCode.NotFound
        );
      }
      const event = await EventModel.findOne({ _id: id, isdeleted: false });
      if(!event){
        throw new BaseCustomError("Event not found", StatusCode.NotFound);
      }
      return EventModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async DeleteEvent(id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BaseCustomError(
          "Invalid Mongo Id Format",
          StatusCode.NotFound
        );
      }
      const event = await EventModel.findOne({ _id: id, isdeleted: false });
      if (!event) {
        throw new BaseCustomError("Event not found", StatusCode.NotFound);
      }
      return EventModel.findByIdAndUpdate(id, { isdeleted: true }, { new: true });
    } catch (error: unknown | any) {
      throw error;
    }
  }
}
