import { userService } from "../services/user.service";
import { IUser } from "../databases/@types/user.type";
import { StatusCode } from "../utils/consts/status-code";
import { Body, Get, Header, Middlewares, Path, Post, Put, Query, Route, SuccessResponse } from "tsoa";
import { BaseCustomError } from "../utils/customError";

@Route("/user")
export class userController{
    
    private userservice:userService;

    constructor(){
        this.userservice = new userService();
    }

    @SuccessResponse(StatusCode.Created, "Create Success")
    @Post("/")
    public async UserSignup(@Body() requestBody:any):Promise<any>{
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

    // Get All user
    @SuccessResponse(StatusCode.OK,"Success")
    @Get("/")
    public async GetAlluser():Promise<any>{
        try{
            const data = await this.userservice.GetAlluser();
            return {
                message : "user found",
                data : data
            }
        }catch(error:unknown | any){
            throw error;
        }
    }

    // Get user by id
    @SuccessResponse(StatusCode.OK,"Success")
    @Get("/{id}")
    public async GetUserById(@Path() id:string):Promise<any>{
        try{
            const data = await this.userservice.GetUserbyId(id);
            if (!data) {
                throw new BaseCustomError(
                  "User not found. Please check the provided ID.",
                  StatusCode.NotFound
                );
              }
            return {
                message : "User found!",
                data : data
            }
        }catch(error:unknown | any){
            throw error;
        }
    }

    // Update User
    @SuccessResponse(StatusCode.Created,"Update Success")
    @Put("/{id}")
    public async UpdateUser(@Path() id:string , @Body() requestBody:IUser):Promise<any>{
        try{
            const userId = await this.userservice.GetUserbyId(id);
            if (!userId) {
                throw new BaseCustomError(
                  "User not found. Please check the provided ID.",
                  StatusCode.NotFound
                );
            }

            const updatedata = await this.userservice.UpdateUser(id , requestBody);
            return {
                message : "Update success",
                data : updatedata
            }
        }catch(error:unknown | any){
            throw error;
        }
    }
}