import { UserRepository } from "../databases/repositories/user.repository";
import { IUser } from "../databases/@types/user.type";


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
}