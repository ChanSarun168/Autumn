import { userService } from "../services/user.service";
import { IUser } from "../databases/@types/user.type";
import { StatusCode } from "../utils/consts/status-code";
import { Body, Get, Header, Middlewares, Path, Post, Query, Route, SuccessResponse } from "tsoa";

@Route("/user")
export class userController{
    
    private userservice:userService;

    constructor(){
        this.userservice = new userService();
    }

    @SuccessResponse(StatusCode.Created, "Create Success")
    @Post("/")
    public async UserSignup(@Body() requestBody:IUser):Promise<any>{
        try{
            const data = await this.userservice.CreateUser(requestBody);

            return {
                message : "user create successfully",
                data : data
            }

        }catch(error:unknown | any){
            throw error;
        }
    }
}