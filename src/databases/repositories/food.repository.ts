import { Ifood } from "../@types/food.type";
import { FoodModel } from "../models/food.model";
import { IQueryFood } from "../../controllers/food.controller";

export class foodRepository{

    async CreateFood(data: Ifood) {
        try{
            return await FoodModel.create(data);
        }catch(error:unknown | any){
            throw error;
        }
    }

    async GetAllFood(queryparam:IQueryFood) {
        try{
            const {name , type} = queryparam;
            const filter: any = {isdeleted: false};
            if (name) {
                filter.name = { $regex: name, $options: 'i' }; // Case-insensitive regex search
            }

            if (type) {
                filter.type = type;
            }
            return await FoodModel.find(filter);
        }catch(error:unknown | any){
            throw error;
        }
    }
}