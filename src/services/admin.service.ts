import { IAdmin } from "../databases/@types/admin.type";
import { AdminRepository } from "../databases/repositories/admin.repository";
import { StatusCode } from "../utils/consts";
import { BaseCustomError } from "../utils/customError";
import { hashPassword, verifyPassword } from "../utils/password";

export class AdminService {
  private AdminRepo: AdminRepository;
  constructor() {
    this.AdminRepo = new AdminRepository();
  }

  // Admin Signup
  async AdminSignup(data: IAdmin) {
    try {
      //hashing password
      const hasdPassword = data.password && (await hashPassword(data.password));
      //check if the email already signup
      const existedUser =
        data.email && (await this.AdminRepo.FindAdminEmail(data.email));
      if (existedUser) {
        throw new BaseCustomError(
          "Email already used.Please use another email!",
          StatusCode.Conflict
        );
      }
      let newData = { ...data, password: hasdPassword };
      return await this.AdminRepo.CreateAdmin(newData);
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async Login(data: IAdmin) {
    try {
      const existedUser = await this.AdminRepo.FindAdminEmail(data.email);

      if (!existedUser) {
        throw new BaseCustomError("Email not Found", StatusCode.NotFound);
      }

      const isPassword =
        existedUser.password &&
        (await verifyPassword({
          password: data.password,
          hashPassword: existedUser.password,
        }));

        if(!isPassword){
            throw new BaseCustomError(
                "The email or password you entered is incorrect. Please double-check and try again." , StatusCode.NotFound
              );
        }
        return existedUser;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async FindAdminById(id:string){
    try{
        return await this.AdminRepo.FindAdminById(id);
    }catch(error:unknown | any){
        throw error;
    }
  }
}
