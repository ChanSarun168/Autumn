import { StatusCode } from "../utils/consts";
import { foodService } from "../services/food.service";
import {
  Route,
  SuccessResponse,
  Tags,
  Post,
  Middlewares,
  Request,
  Body,
  Queries,
  Get,
} from "tsoa";
import { verifyToken } from "../middlewares/tokenValidation";
import { Ifood } from "../databases/@types/food.type";
import { BaseCustomError } from "../utils/customError";

export interface IQueryFood {
    name?: string;
    type?: string;
}

@Route("/food")
@Tags("Food")
export class FoodController {
  private foodservice: foodService;
  constructor() {
    this.foodservice = new foodService();
  }

  @SuccessResponse(StatusCode.Created, "Created Success")
  @Post("/")
  @Middlewares(verifyToken)
  public async CreateFood(
    @Request() request: any,
    @Body() requestBody: Ifood
  ): Promise<any> {
    try {
      if (request.role == "Customer") {
        throw new BaseCustomError(
          "You do not have permission to access this resource",
          StatusCode.Forbidden
        );
      }
      const food = await this.foodservice.CreateFood(requestBody);
      return {
        message: "Food created successfully",
        data: food,
      };
    } catch (error: unknown | any) {
      throw error;
    }
  }

  @SuccessResponse(StatusCode.OK, "Success")
  @Get("/")
  public async GetAllFood(@Queries() queryparam:IQueryFood): Promise<any> {
    try{
        const data = await this.foodservice.GetAllFood(queryparam);
        return {
            message: "Food found!!",
            data: data,
        };
    }catch(error:unknown | any){
      throw error;
    }
  }
}
