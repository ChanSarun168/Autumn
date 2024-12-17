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
      return await UserModel.find();
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
      const data = await UserModel.findById(id);
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
      return await UserModel.findByIdAndUpdate(id , data , { new: true });
    } catch (error: unknown | any) {
      throw error;
    }
  }
}
