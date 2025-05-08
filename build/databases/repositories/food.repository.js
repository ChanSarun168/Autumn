"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodRepository = void 0;
const food_model_1 = require("../models/food.model");
class foodRepository {
    CreateFood(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield food_model_1.FoodModel.create(data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    GetAllFood(queryparam) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, type } = queryparam;
                const filter = { isdeleted: false };
                if (name) {
                    filter.name = { $regex: name, $options: 'i' }; // Case-insensitive regex search
                }
                if (type) {
                    filter.type = type;
                }
                return yield food_model_1.FoodModel.find(filter);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.foodRepository = foodRepository;
