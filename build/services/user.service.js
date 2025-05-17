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
exports.userService = void 0;
const user_repository_1 = require("../databases/repositories/user.repository");
const customError_1 = require("../utils/customError");
const consts_1 = require("../utils/consts");
const password_1 = require("../utils/password");
class userService {
    constructor() {
        this.userRepo = new user_repository_1.UserRepository();
    }
    CreateUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hasdPassword = data.password && (yield (0, password_1.hashPassword)(data.password));
                const existedUser = data.email && (yield this.userRepo.FindUserByEmail(data.email));
                if (existedUser) {
                    throw new customError_1.BaseCustomError("Email already used.Please use another email!", consts_1.StatusCode.Conflict);
                }
                let newData = Object.assign(Object.assign({}, data), { password: hasdPassword });
                return yield this.userRepo.CreateUser(newData);
            }
            catch (error) {
                throw error;
            }
        });
    }
    GetAlluser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.userRepo.GetAllUser();
                if (data.length <= 0) {
                    throw new customError_1.BaseCustomError("no user", consts_1.StatusCode.NoContent);
                }
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    GetUserbyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepo.GetUserbyId(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    UpdateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hasdPassword = data.password && (yield (0, password_1.hashPassword)(data.password));
                let newData = Object.assign(Object.assign({}, data), { password: hasdPassword });
                return yield this.userRepo.UpdateUser(id, newData);
            }
            catch (error) {
                throw error;
            }
        });
    }
    DeleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepo.DeleteUser(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    Login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existedUser = yield this.userRepo.FindUserByEmail(data.email);
                if (!existedUser) {
                    throw new customError_1.BaseCustomError("Email not Found", consts_1.StatusCode.NotFound);
                }
                const isPassword = existedUser.password &&
                    (yield (0, password_1.verifyPassword)({
                        password: data.password,
                        hashPassword: existedUser.password,
                    }));
                if (!isPassword) {
                    throw new customError_1.BaseCustomError("The email or password you entered is incorrect. Please double-check and try again.", consts_1.StatusCode.NotFound);
                }
                return existedUser;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.userService = userService;
