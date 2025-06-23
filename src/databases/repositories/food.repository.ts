import { Ifood } from "../@types/food.type";
import { FoodModel } from "../models/food.model";
import { IQueryFood } from "../../controllers/food.controller";

export class foodRepository {

    async CreateFood(data: Ifood) {
        try {
            return await FoodModel.create(data);
        } catch (error: unknown | any) {
            throw error;
        }
    }

    async GetAllFoods(queryparam: IQueryFood) {
        try {
            const { name, type } = queryparam;
            const filter: any = { isdeleted: false };
            if (name) {
                filter.name = { $regex: name, $options: 'i' }; // Case-insensitive regex search
            }

            if (type) {
                filter.type = type;
            }
            return await FoodModel.find(filter);
        } catch (error: unknown | any) {
            throw error;
        }
    }

    async GetAllFood(query: IQueryFood) {
    try {
      const filter: any       = { isdeleted: false };
      const orConditions: any[] = [];

      // — name
      if (query.name) {
        orConditions.push({
          name: { $regex: query.name, $options: "i" }
        });
      }

      // — type
      if (query.type) {
        orConditions.push({ type: query.type });
      }

      // — ingredients (string → [string])
      if (query.ingredients) {
        const list = Array.isArray(query.ingredients)
          ? query.ingredients
          : [query.ingredients];
        orConditions.push({ ingredients: { $in: list } });
      }

      // — cuisine
      if (query.cuisine) {
        orConditions.push({ cuisine: query.cuisine });
      }

      // — spiciness
      if (query.spiciness) {
        orConditions.push({ spiciness: query.spiciness });
      }

      // — price (ensure number)
      if (query.price) {
        let { op, value } = query.price;
        value = typeof value === "string" ? Number(value) : value;
        if (isNaN(value)) throw new Error("price.value is not a number");
        switch (op) {
          case "lt": orConditions.push({ price: { $lte: value } }); break;
          case "gt": orConditions.push({ price: { $gte: value } }); break;
          case "eq": orConditions.push({ price: value        }); break;
        }
      }

      // — preparationTime (ensure number)
      if (query.preparationTime) {
        let { op, value } = query.preparationTime;
        value = typeof value === "string" ? Number(value) : value;
        if (isNaN(value)) throw new Error("preparationTime.value is not a number");
        switch (op) {
          case "lt": orConditions.push({ preparationTime: { $lte: value } }); break;
          case "gt": orConditions.push({ preparationTime: { $gte: value } }); break;
          case "eq": orConditions.push({ preparationTime: value        }); break;
        }
      }

      if (orConditions.length) {
        filter.$and = orConditions;
        }

      // *** DEBUG LOG ***
      console.log("→ final Mongo filter:", JSON.stringify(filter, null, 2));
      

      return await FoodModel.find(filter);
    } catch (err: any) {
      console.error("GetAllFood ERROR:", err.message || err);
      throw err;
    }
  }
}