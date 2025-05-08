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
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
const status_code_1 = require("../utils/consts/status-code");
const tsoa_1 = require("tsoa");
const customError_1 = require("../utils/customError");
const generate_1 = require("../utils/generate");
const tokenValidation_1 = require("../middlewares/tokenValidation");
let userController = class userController {
    constructor() {
        this.userservice = new user_service_1.userService();
    }
    UserInfo(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.GetUserById(request.id);
                return {
                    data: data
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    UserSignup(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.userservice.CreateUser(requestBody);
                if (data.role == "Customer") {
                    const jwtToken = yield (0, generate_1.generateToken)(data.id, data.role);
                    return {
                        message: "user create successfully",
                        data: data,
                        token: jwtToken
                    };
                }
                return {
                    message: "user create successfully",
                    data: data
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Get All user
    GetAlluser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.userservice.GetAlluser();
                return {
                    message: "user found",
                    data: data,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Get user by id
    GetUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.userservice.GetUserbyId(id);
                if (!data) {
                    throw new customError_1.BaseCustomError("User not found. Please check the provided ID.", status_code_1.StatusCode.NotFound);
                }
                return {
                    message: "User found!",
                    data: data,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Update User
    UpdateUser(id, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = yield this.userservice.GetUserbyId(id);
                if (!userId) {
                    throw new customError_1.BaseCustomError("User not found. Please check the provided ID.", status_code_1.StatusCode.NotFound);
                }
                const updatedata = yield this.userservice.UpdateUser(id, requestBody);
                return {
                    message: "Update success",
                    data: updatedata,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Delete User
    DeleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userservice.DeleteUser(id);
                return {
                    message: "user has been delete",
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    //   User login
    UserLogin(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.userservice.Login(requestBody);
                const userdata = yield this.GetUserById(data.id);
                const jwtToken = yield (0, generate_1.generateToken)(userdata.data._id, userdata.data.role);
                return { message: "Login successful.", token: jwtToken, role: data.role };
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.userController = userController;
__decorate([
    (0, tsoa_1.SuccessResponse)(status_code_1.StatusCode.OK, "Success"),
    (0, tsoa_1.Post)("/info"),
    (0, tsoa_1.Middlewares)(tokenValidation_1.verifyToken),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], userController.prototype, "UserInfo", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(status_code_1.StatusCode.Created, "Create Success"),
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], userController.prototype, "UserSignup", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(status_code_1.StatusCode.OK, "Success"),
    (0, tsoa_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], userController.prototype, "GetAlluser", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(status_code_1.StatusCode.OK, "Success"),
    (0, tsoa_1.Get)("/{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], userController.prototype, "GetUserById", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(status_code_1.StatusCode.Created, "Update Success"),
    (0, tsoa_1.Put)("/{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], userController.prototype, "UpdateUser", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(status_code_1.StatusCode.OK, "Success"),
    (0, tsoa_1.Delete)("/{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], userController.prototype, "DeleteUser", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(status_code_1.StatusCode.OK, "Success"),
    (0, tsoa_1.Post)("/login"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], userController.prototype, "UserLogin", null);
exports.userController = userController = __decorate([
    (0, tsoa_1.Route)("/user"),
    (0, tsoa_1.Tags)("User"),
    __metadata("design:paramtypes", [])
], userController);
