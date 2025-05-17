"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.FoodController = void 0;
const consts_1 = require("../utils/consts");
const food_service_1 = require("../services/food.service");
const tsoa_1 = require("tsoa");
const tokenValidation_1 = require("../middlewares/tokenValidation");
const customError_1 = require("../utils/customError");
let FoodController = class FoodController {
    constructor() {
        this.foodservice = new food_service_1.foodService();
    }
    CreateFood(request, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (request.role == "Customer") {
                    throw new customError_1.BaseCustomError("You do not have permission to access this resource", consts_1.StatusCode.Forbidden);
                }
                const food = yield this.foodservice.CreateFood(requestBody);
                return {
                    message: "Food created successfully",
                    data: food,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    GetAllFood(queryparam) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.foodservice.GetAllFood(queryparam);
                return {
                    message: "Food found!!",
                    data: data,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.FoodController = FoodController;
__decorate([
    (0, tsoa_1.SuccessResponse)(consts_1.StatusCode.Created, "Created Success"),
    (0, tsoa_1.Post)("/"),
    (0, tsoa_1.Middlewares)(tokenValidation_1.verifyToken),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "CreateFood", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(consts_1.StatusCode.OK, "Success"),
    (0, tsoa_1.Get)("/"),
    __param(0, (0, tsoa_1.Queries)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "GetAllFood", null);
exports.FoodController = FoodController = __decorate([
    (0, tsoa_1.Route)("/food"),
    (0, tsoa_1.Tags)("Food"),
    __metadata("design:paramtypes", [])
], FoodController);
