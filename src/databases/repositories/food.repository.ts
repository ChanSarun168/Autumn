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
    const filter: any         = { isdeleted: false };
    const andConditions: any[] = [];

    // — name (case-insensitive substring)
    if (query.name) {
      andConditions.push({
        name: { $regex: query.name, $options: "i" }
      });
    }

    // — type (case-insensitive exact)
    if (query.type) {
      andConditions.push({
        type: { $regex: `^${query.type}$`, $options: "i" }
      });
    }

    // — ingredients (case-insensitive match on any array element)
    if (query.ingredients) {
      const list = Array.isArray(query.ingredients)
        ? query.ingredients
        : [query.ingredients];
      // build an array of regexes
      const regexList = list.map(item => new RegExp(item, "i"));
      andConditions.push({
        ingredients: { $in: regexList }
      });
    }

    // — cuisine
    if (query.cuisine) {
      andConditions.push({
        cuisine: { $regex: `^${query.cuisine}$`, $options: "i" }
      });
    }

    // — spiciness
    if (query.spiciness) {
      andConditions.push({
        spiciness: { $regex: `^${query.spiciness}$`, $options: "i" }
      });
    }

    // — price
    if (query.price) {
      let { op, value } = query.price;
      value = typeof value === "string" ? Number(value) : value;
      if (isNaN(value)) throw new Error("price.value is not a number");
      switch (op) {
        case "lt": andConditions.push({ price: { $lte: value } }); break;
        case "gt": andConditions.push({ price: { $gte: value } }); break;
        case "eq": andConditions.push({ price: value });           break;
      }
    }

    // — preparationTime
    if (query.preparationTime) {
      let { op, value } = query.preparationTime;
      value = typeof value === "string" ? Number(value) : value;
      if (isNaN(value)) throw new Error("preparationTime.value is not a number");
      switch (op) {
        case "lt": andConditions.push({ preparationTime: { $lte: value } }); break;
        case "gt": andConditions.push({ preparationTime: { $gte: value } }); break;
        case "eq": andConditions.push({ preparationTime: value });           break;
      }
    }

    if (andConditions.length) {
      filter.$and = andConditions;
    }

    console.log("→ final Mongo filter:", JSON.stringify(filter, null, 2));
    return await FoodModel.find(filter);
  } catch (err: any) {
    console.error("GetAllFood ERROR:", err.message || err);
    throw err;
  }
}

}