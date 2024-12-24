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
      return await EventModel.create(data);
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
      return EventModel.findByIdAndUpdate(id, { isdeleted: true }, { new: true });
    } catch (error: unknown | any) {
      throw error;
    }
  }
}
