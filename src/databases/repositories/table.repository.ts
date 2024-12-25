import mongoose from "mongoose";
import { ITable } from "../@types/table.type";
import { TableModel } from "../models/table.model";
import { BaseCustomError } from "../../utils/customError";
import { StatusCode } from "../../utils/consts";

export class tableRepository {
  async createTable(data: ITable) {
    try {
      return await TableModel.create(data);
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async GetAllTable() {
    try {
      return await TableModel.find({ isdeleted: false });
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async GetTable(tableId: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(tableId)) {
        throw new BaseCustomError(
          "Invalid Mongo Id Format",
          StatusCode.NotFound
        );
      }
      return await TableModel.findOne({ _id: tableId, isdeleted: false });
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async updateTable(id: string, data: ITable) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BaseCustomError(
          "Invalid Mongo Id Format",
          StatusCode.NotFound
        );
      }
      const table = await TableModel.findOne({ _id: id, isdeleted: false });
      if (!table) {
        throw new BaseCustomError("Event not found", StatusCode.NotFound);
      }
      return TableModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async deleteTable(id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BaseCustomError(
          "Invalid Mongo Id Format",
          StatusCode.NotFound
        );
      }
      const table = await TableModel.findOne({ _id: id, isdeleted: false });
      if (!table) {
        throw new BaseCustomError("Event not found", StatusCode.NotFound);
      }
      return TableModel.findByIdAndUpdate(
        id,
        { isdeleted: true },
        { new: true }
      );
    } catch (error: unknown | any) {
      throw error;
    }
  }
}
