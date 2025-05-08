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
exports.foodService = void 0;
const food_repository_1 = require("../databases/repositories/food.repository");
const customError_1 = require("../utils/customError");
const consts_1 = require("../utils/consts");
class foodService {
    constructor() {
        this.foodRepo = new food_repository_1.foodRepository();
    }
    CreateFood(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.foodRepo.CreateFood(data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    GetAllFood(queryparam) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.foodRepo.GetAllFood(queryparam);
                if (data.length <= 0) {
                    throw new customError_1.BaseCustomError("no Food and drink", consts_1.StatusCode.NoContent);
                }
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.foodService = foodService;
