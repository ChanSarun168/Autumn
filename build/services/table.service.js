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
exports.tableService = void 0;
const customError_1 = require("../utils/customError");
const table_repository_1 = require("../databases/repositories/table.repository");
const consts_1 = require("../utils/consts");
class tableService {
    constructor() {
        this.tableRepo = new table_repository_1.tableRepository();
    }
    createTable(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const table = yield this.tableRepo.createTable(data);
                return table;
            }
            catch (error) {
                throw error;
            }
        });
    }
    GetAllTable() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.tableRepo.GetAllTable();
                if (data.length <= 0) {
                    throw new customError_1.BaseCustomError("no table", consts_1.StatusCode.NoContent);
                }
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    GetTable(tableId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.tableRepo.GetTable(tableId);
                if (!data) {
                    throw new customError_1.BaseCustomError("no table", consts_1.StatusCode.NoContent);
                }
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    UpdateTable(tableId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedTable = yield this.tableRepo.updateTable(tableId, data);
                return updatedTable;
            }
            catch (error) {
                throw error;
            }
        });
    }
    DeleteTable(tableId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedTable = yield this.tableRepo.deleteTable(tableId);
                return deletedTable;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.tableService = tableService;
