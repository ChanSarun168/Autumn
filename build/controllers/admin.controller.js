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
exports.AdminController = void 0;
const tsoa_1 = require("tsoa");
const status_code_1 = require("../utils/consts/status-code");
const admin_service_1 = require("../services/admin.service");
const generate_1 = require("../utils/generate");
const validate_input_1 = require("../middlewares/validate-input");
const admin_schema_1 = require("../schemas/admin.schema");
let AdminController = class AdminController {
    constructor() {
        this.adminService = new admin_service_1.AdminService();
    }
    AdminSignup(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = requestBody;
                const data = {
                    email: email,
                    password: password
                };
                const result = yield this.adminService.AdminSignup(data);
                return {
                    message: "Admin account created success",
                    data: result
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    AdminLogin(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = requestBody;
                const data = {
                    email: email,
                    password: password
                };
                const admin = yield this.adminService.Login(data);
                const respone = yield this.GetAdminInfo(admin.id);
                const jwtToken = yield (0, generate_1.generateToken)(respone.data._id, respone.data.role);
                return { message: "Login successful.", token: jwtToken };
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Get admin data by using ID
    GetAdminInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.adminService.FindAdminById(id);
                return {
                    message: "admin has been found",
                    data: data
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, tsoa_1.SuccessResponse)(status_code_1.StatusCode.Created, "Create Success"),
    (0, tsoa_1.Post)("/admin"),
    (0, tsoa_1.Middlewares)((0, validate_input_1.validateInput)(admin_schema_1.AdminSchema)),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "AdminSignup", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(status_code_1.StatusCode.OK, "Success"),
    (0, tsoa_1.Post)("/admin-login"),
    (0, tsoa_1.Middlewares)((0, validate_input_1.validateInput)(admin_schema_1.AdminSchema)),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "AdminLogin", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(status_code_1.StatusCode.OK, "Success"),
    (0, tsoa_1.Get)("/admin/{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "GetAdminInfo", null);
exports.AdminController = AdminController = __decorate([
    (0, tsoa_1.Route)("/auth"),
    (0, tsoa_1.Tags)("Admin"),
    __metadata("design:paramtypes", [])
], AdminController);
