import { userService } from "../services/user.service";
import { IUser } from "../databases/@types/user.type";
import { StatusCode } from "../utils/consts/status-code";
import {
  Body,
  Delete,
  Get,
  Header,
  Middlewares,
  Path,
  Post,
  Put,
  Query,
  Route,
  SuccessResponse,
  Request,
  Tags
} from "tsoa";
import { BaseCustomError } from "../utils/customError";
import { generateToken } from "../utils/generate";
import { verifyToken } from "../middlewares/tokenValidation";


interface IuserLogin{
    email: string;
    password: string;
}

@Route("/user")
@Tags("User")
export class userController {
  private userservice: userService;

  constructor() {
    this.userservice = new userService();
  }

  @SuccessResponse(StatusCode.OK, "Success")
  @Post("/info")
  @Middlewares(verifyToken)
  public async UserInfo(@Request() request: any):Promise<any>{
    try{
      const data = await this.GetUserById(request.id);
      return {
        data : data
      }
    }catch(error:unknown | any){
      throw error;
    }
  }

  @SuccessResponse(StatusCode.Created, "Create Success")
  @Post("/")
  public async UserSignup(@Body() requestBody: IUser): Promise<any> {
    try {
      const data = await this.userservice.CreateUser(requestBody);
      
      if(data.role == "Customer"){
        const jwtToken = await generateToken(data.id , data.role);
        return {
          message: "user create successfully",
          data: data,
          token: jwtToken
        };
      }
      return {
        message: "user create successfully",
        data: data
      };
    } catch (error: unknown | any) {
      throw error;
    }
  }

  // Get All user
  @SuccessResponse(StatusCode.OK, "Success")
  @Get("/")
  public async GetAlluser(): Promise<any> {
    try {
      const data = await this.userservice.GetAlluser();
      return {
        message: "user found",
        data: data,
      };
    } catch (error: unknown | any) {
      throw error;
    }
  }

  // Get user by id
  @SuccessResponse(StatusCode.OK, "Success")
  @Get("/{id}")
  public async GetUserById(@Path() id: string): Promise<any> {
    try {
      const data = await this.userservice.GetUserbyId(id);
      if (!data) {
        throw new BaseCustomError(
          "User not found. Please check the provided ID.",
          StatusCode.NotFound
        );
      }
      return {
        message: "User found!",
        data: data,
      };
    } catch (error: unknown | any) {
      throw error;
    }
  }

  // Update User
  @SuccessResponse(StatusCode.Created, "Update Success")
  @Put("/{id}")
  public async UpdateUser(
    @Path() id: string,
    @Body() requestBody: IUser
  ): Promise<any> {
    try {
      const userId = await this.userservice.GetUserbyId(id);
      if (!userId) {
        throw new BaseCustomError(
          "User not found. Please check the provided ID.",
          StatusCode.NotFound
        );
      }

      const updatedata = await this.userservice.UpdateUser(id, requestBody);
      return {
        message: "Update success",
        data: updatedata,
      };
    } catch (error: unknown | any) {
      throw error;
    }
  }

  // Delete User
  @SuccessResponse(StatusCode.OK, "Success")
  @Delete("/{id}")
  public async DeleteUser(@Path() id: string) {
    try {
      await this.userservice.DeleteUser(id);
      return {
        message: "user has been delete",
      };
    } catch (error: unknown | any) {
      throw error;
    }
  }

    //   User login
    @SuccessResponse(StatusCode.OK, "Success")
    @Post("/login")
    public async UserLogin(@Body() requestBody:IuserLogin):Promise<any>{
        try{
            const data = await this.userservice.Login(requestBody);
            const userdata = await this.GetUserById(data.id);
            const jwtToken = await generateToken(
                userdata.data._id,
                userdata.data.role
            );
            return { message: "Login successful.", token:jwtToken , role:data.role};
        }catch(error:unknown | any){
            throw error;
        }
    }

}
