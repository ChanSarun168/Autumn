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
exports.eventservice = void 0;
const customError_1 = require("../utils/customError");
const event_repository_1 = require("../databases/repositories/event.repository");
const consts_1 = require("../utils/consts");
class eventservice {
    constructor() {
        this.eventRepo = new event_repository_1.eventrepository();
    }
    GetAllEvent(queryparam) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.eventRepo.GetAllEvent(queryparam);
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
    CreateEvent(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.eventRepo.CreateEvent(data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    GetEventById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.eventRepo.GetEventById(id);
                if (!data) {
                    throw new customError_1.BaseCustomError("Event not found", consts_1.StatusCode.NotFound);
                }
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    UpdateEvent(id, date, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.eventRepo.UpdateEvent(id, date, data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    DeleteEvent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.eventRepo.DeleteEvent(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.eventservice = eventservice;
