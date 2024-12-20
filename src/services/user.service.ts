import { UserRepository } from "../databases/repositories/user.repository";
import { IUser } from "../databases/@types/user.type";
import { BaseCustomError } from "../utils/customError";
import { StatusCode } from "../utils/consts";
import { hashPassword, verifyPassword } from "../utils/password";
import { IAdmin } from "../databases/@types/admin.type";

export class userService {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  async CreateUser(data: IUser) {
    try {
      const hasdPassword = data.password && (await hashPassword(data.password));
      const existedUser =
        data.email && (await this.userRepo.FindUserByEmail(data.email));
      if (existedUser) {
        throw new BaseCustomError(
          "Email already used.Please use another email!",
          StatusCode.Conflict
        );
      }
      let newData = { ...data, password: hasdPassword };
      return await this.userRepo.CreateUser(newData);
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async GetAlluser() {
    try {
      const data = await this.userRepo.GetAllUser();
      if (data.length <= 0) {
        throw new BaseCustomError("no user", StatusCode.NoContent);
      }
      return data;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async GetUserbyId(id: string) {
    try {
      return await this.userRepo.GetUserbyId(id);
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async UpdateUser(id: string, data: IUser) {
    try {
      const hasdPassword = data.password && (await hashPassword(data.password));
      let newData = { ...data, password: hasdPassword };
      return await this.userRepo.UpdateUser(id, newData);
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async DeleteUser(id: string) {
    try {
      return await this.userRepo.DeleteUser(id);
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async Login(data: IAdmin) {
    try {
      const existedUser = await this.userRepo.FindUserByEmail(data.email);
      if (!existedUser) {
        throw new BaseCustomError("Email not Found", StatusCode.NotFound);
      }
      const isPassword =
        existedUser.password &&
        (await verifyPassword({
          password: data.password,
          hashPassword: existedUser.password,
        }));
      if (!isPassword) {
        throw new BaseCustomError(
          "The email or password you entered is incorrect. Please double-check and try again.",
          StatusCode.NotFound
        );
      }
      return existedUser;
    } catch (error: unknown | any) {
        throw error;
    }
  }
}
