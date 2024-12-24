import { BaseCustomError } from "../../utils/customError";
import { IUser } from "../@types/user.type";
import { UserModel } from "../models/user.model";
import { StatusCode } from "../../utils/consts";
import mongoose from "mongoose";

export class UserRepository {
  async CreateUser(data: IUser) {
    try {
      return await UserModel.create(data);
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async GetAllUser() {
    try {
      return await UserModel.find({ isdeleted: false });
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async GetUserbyId(id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BaseCustomError(
          "Invalid Mongo Id Format",
          StatusCode.NotFound
        );
      }
      const data = await UserModel.findOne({ _id: id, isdeleted: false });
      return data;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async UpdateUser(id: string, data: IUser) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BaseCustomError(
          "Invalid Mongo Id Format",
          StatusCode.NotFound
        );
      }
      return await UserModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async FindUserByEmail(email: string) {
    try {
      return await UserModel.findOne({ email: email , isdeleted:false});
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async DeleteUser(id: string) {
    try {
      // check if Id is invalid from mongodb
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BaseCustomError("Id is wrong format", StatusCode.BadRequest);
      }

      // check db to find student
      const student = await UserModel.findOne({ _id: id, isdeleted: false });
      if (!student) {
        const customError = new BaseCustomError(
          "Student not found. Please check the provided ID.",
          StatusCode.NoContent
        ); // Create custom error
        throw customError;
      }

      return await UserModel.findByIdAndUpdate(
        id,
        { isdeleted: true },
        { new: true }
      );
    } catch (error: unknown | any) {
      throw error;
    }
  }
}
