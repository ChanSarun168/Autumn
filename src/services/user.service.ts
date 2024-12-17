import { UserRepository } from "../databases/repositories/user.repository";
import { IUser } from "../databases/@types/user.type";
import { BaseCustomError } from "../utils/customError";
import { StatusCode } from "../utils/consts";


export class userService{
    private userRepo:UserRepository;

    constructor(){
        this.userRepo = new UserRepository();
    }

    async CreateUser(data:IUser){
        try{
            return await this.userRepo.CreateUser(data);
        }catch(error:unknown | any){
            throw error;
        }
    }

    async GetAlluser(){
        try{
            const data = await this.userRepo.GetAllUser();
            if(data.length <= 0){
                throw new BaseCustomError("no user" , StatusCode.NoContent);
            }
            return data;
        }catch(error:unknown | any){
            throw error;
        }
    }

    async GetUserbyId(id:string){
        try{
            return await this.userRepo.GetUserbyId(id);
        }catch(error:unknown | any){
            throw error;
        }
    }

    async UpdateUser(id:string , data:IUser){
        try{
            return await this.userRepo.UpdateUser(id , data);
        }catch(error:unknown | any){
            throw error;
        }
    }
}