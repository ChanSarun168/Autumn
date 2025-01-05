import { Ifood } from "../databases/@types/food.type";
import { foodRepository } from "../databases/repositories/food.repository";
import { IQueryFood } from "../controllers/food.controller";
import { BaseCustomError } from "../utils/customError";
import { StatusCode } from "../utils/consts";

export class foodService {
  private foodRepo: foodRepository;

  constructor() {
    this.foodRepo = new foodRepository();
  }

  async CreateFood(data: Ifood) {
    try {
      return await this.foodRepo.CreateFood(data);
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async GetAllFood(queryparam: IQueryFood) {
    try {
      const data = await this.foodRepo.GetAllFood(queryparam);
      if (data.length <= 0) {
        throw new BaseCustomError("no Food and drink", StatusCode.NoContent);
      }
      return data;
    } catch (error: unknown | any) {
      throw error;
    }
  }
}
