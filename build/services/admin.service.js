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
exports.AdminService = void 0;
const admin_repository_1 = require("../databases/repositories/admin.repository");
const consts_1 = require("../utils/consts");
const customError_1 = require("../utils/customError");
const password_1 = require("../utils/password");
class AdminService {
    constructor() {
        this.AdminRepo = new admin_repository_1.AdminRepository();
    }
    // Admin Signup
    AdminSignup(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //hashing password
                const hasdPassword = data.password && (yield (0, password_1.hashPassword)(data.password));
                //check if the email already signup
                const existedUser = data.email && (yield this.AdminRepo.FindAdminEmail(data.email));
                if (existedUser) {
                    throw new customError_1.BaseCustomError("Email already used.Please use another email!", consts_1.StatusCode.Conflict);
                }
                let newData = Object.assign(Object.assign({}, data), { password: hasdPassword });
                return yield this.AdminRepo.CreateAdmin(newData);
            }
            catch (error) {
                throw error;
            }
        });
    }
    Login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existedUser = yield this.AdminRepo.FindAdminEmail(data.email);
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
    FindAdminById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.AdminRepo.FindAdminById(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.AdminService = AdminService;
