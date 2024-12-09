import { IUser } from "../@types/user.type";
import { UserModel } from "../models/user.model";


export class UserRepository{

    async CreateUser(data:IUser){
        try{
            return await UserModel.create(data);
        }catch(error:unknown | any){
            throw error;
        }
    }
}