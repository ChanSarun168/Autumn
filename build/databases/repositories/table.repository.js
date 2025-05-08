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
exports.tableRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const table_model_1 = require("../models/table.model");
const customError_1 = require("../../utils/customError");
const consts_1 = require("../../utils/consts");
class tableRepository {
    createTable(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield table_model_1.TableModel.create(data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    GetAllTable() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield table_model_1.TableModel.find({ isdeleted: false });
            }
            catch (error) {
                throw error;
            }
        });
    }
    GetTable(tableId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.default.Types.ObjectId.isValid(tableId)) {
                    throw new customError_1.BaseCustomError("Invalid Mongo Id Format", consts_1.StatusCode.NotFound);
                }
                return yield table_model_1.TableModel.findOne({ _id: tableId, isdeleted: false });
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateTable(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    throw new customError_1.BaseCustomError("Invalid Mongo Id Format", consts_1.StatusCode.NotFound);
                }
                const table = yield table_model_1.TableModel.findOne({ _id: id, isdeleted: false });
                if (!table) {
                    throw new customError_1.BaseCustomError("Event not found", consts_1.StatusCode.NotFound);
                }
                return table_model_1.TableModel.findByIdAndUpdate(id, data, { new: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteTable(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    throw new customError_1.BaseCustomError("Invalid Mongo Id Format", consts_1.StatusCode.NotFound);
                }
                const table = yield table_model_1.TableModel.findOne({ _id: id, isdeleted: false });
                if (!table) {
                    throw new customError_1.BaseCustomError("Event not found", consts_1.StatusCode.NotFound);
                }
                return table_model_1.TableModel.findByIdAndUpdate(id, { isdeleted: true }, { new: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.tableRepository = tableRepository;
