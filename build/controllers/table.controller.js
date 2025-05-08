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
exports.TableController = void 0;
const consts_1 = require("../utils/consts");
const table_service_1 = require("../services/table.service");
const tsoa_1 = require("tsoa");
let TableController = class TableController {
    constructor() {
        this.tableservice = new table_service_1.tableService();
    }
    createTable(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.tableservice.createTable(requestBody);
                return {
                    message: "Table created successfully",
                    data: data,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    GetAllTable() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.tableservice.GetAllTable();
                return {
                    message: "Table found!!",
                    data: data,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    GetTable(tableId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.tableservice.GetTable(tableId);
                return {
                    message: "Table found!!",
                    data: data,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    UpdateTable(tableId, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.tableservice.UpdateTable(tableId, requestBody);
                return {
                    message: "Table updated successfully",
                    data: data,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    DeleteTable(tableId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.tableservice.DeleteTable(tableId);
                return {
                    message: "Table deleted successfully",
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.TableController = TableController;
__decorate([
    (0, tsoa_1.SuccessResponse)(consts_1.StatusCode.Created, "Created Success"),
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TableController.prototype, "createTable", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(consts_1.StatusCode.OK, "Success"),
    (0, tsoa_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TableController.prototype, "GetAllTable", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(consts_1.StatusCode.OK, "Success"),
    (0, tsoa_1.Get)("/{tableId}"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TableController.prototype, "GetTable", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(consts_1.StatusCode.OK, "Success"),
    (0, tsoa_1.Put)("/{tableId}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TableController.prototype, "UpdateTable", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(consts_1.StatusCode.OK, "Success"),
    (0, tsoa_1.Delete)("/{tableId}"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TableController.prototype, "DeleteTable", null);
exports.TableController = TableController = __decorate([
    (0, tsoa_1.Route)("/table"),
    (0, tsoa_1.Tags)("Table"),
    __metadata("design:paramtypes", [])
], TableController);
