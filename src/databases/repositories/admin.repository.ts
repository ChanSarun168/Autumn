import { StatusCode } from "../../utils/consts";
import { BaseCustomError } from "../../utils/customError";
import { AdminModel } from "../models/admin.model";
import { IAdmin } from "../@types/admin.type";

export class AdminRepository{

    async FindAdminEmail(email:string){
        try{
            return await AdminModel.findOne({email:email});
        }catch(error:unknown | any){
            throw new BaseCustomError("Email Not Found" , StatusCode.NotFound)
        }
    }

    async CreateAdmin(data:IAdmin){
        try{
            return await AdminModel.create(data);
        }catch(error:unknown | any){
            throw error;
        }
    }

    async FindAdminById(id:string){
        try{
            return await AdminModel.findById(id);
        }catch(error:unknown | any){
            throw new BaseCustomError("id not found", StatusCode.NotFound);
        }
    }
}