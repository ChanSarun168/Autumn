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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const customError_1 = require("../../utils/customError");
const user_model_1 = require("../models/user.model");
const consts_1 = require("../../utils/consts");
const mongoose_1 = __importDefault(require("mongoose"));
class UserRepository {
    CreateUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.UserModel.create(data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    GetAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.UserModel.find({ isdeleted: false });
            }
            catch (error) {
                throw error;
            }
        });
    }
    GetUserbyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    throw new customError_1.BaseCustomError("Invalid Mongo Id Format", consts_1.StatusCode.NotFound);
                }
                const data = yield user_model_1.UserModel.findOne({ _id: id, isdeleted: false });
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    UpdateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    throw new customError_1.BaseCustomError("Invalid Mongo Id Format", consts_1.StatusCode.NotFound);
                }
                return yield user_model_1.UserModel.findByIdAndUpdate(id, data, { new: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    FindUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.UserModel.findOne({ email: email, isdeleted: false });
            }
            catch (error) {
                throw error;
            }
        });
    }
    DeleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // check if Id is invalid from mongodb
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    throw new customError_1.BaseCustomError("Id is wrong format", consts_1.StatusCode.BadRequest);
                }
                // check db to find student
                const student = yield user_model_1.UserModel.findOne({ _id: id, isdeleted: false });
                if (!student) {
                    const customError = new customError_1.BaseCustomError("Student not found. Please check the provided ID.", consts_1.StatusCode.NoContent); // Create custom error
                    throw customError;
                }
                return yield user_model_1.UserModel.findByIdAndUpdate(id, { isdeleted: true }, { new: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UserRepository = UserRepository;
