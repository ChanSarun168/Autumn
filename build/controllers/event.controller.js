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
exports.EventController = void 0;
const customError_1 = require("../utils/customError");
const tokenValidation_1 = require("../middlewares/tokenValidation");
const event_service_1 = require("../services/event.service");
const consts_1 = require("../utils/consts");
const tsoa_1 = require("tsoa");
let EventController = class EventController {
    constructor() {
        this.eventService = new event_service_1.eventservice();
    }
    GetAllEvent(queryparam) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.eventService.GetAllEvent(queryparam);
                return {
                    message: "Event found!!",
                    data: data
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    CreateEvent(requestBody, request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (request.role == "Customer") {
                    throw new customError_1.BaseCustomError("You do not have permission to access this resource", consts_1.StatusCode.Forbidden);
                }
                const Eventdata = Object.assign(Object.assign({}, requestBody), { admin_id: request.id });
                const event = yield this.eventService.CreateEvent(Eventdata);
                return {
                    message: "Event has create successfully",
                    data: event
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    GetEventById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.eventService.GetEventById(id);
                return {
                    message: "Event found!!",
                    data: data
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    UpdateEvent(id, date, requestBody, request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (request.role == "Customer") {
                    throw new customError_1.BaseCustomError("You do not have permission to access this resource", consts_1.StatusCode.Forbidden);
                }
                const Eventdata = Object.assign(Object.assign({}, requestBody), { admin_id: request.id });
                const data = yield this.eventService.UpdateEvent(id, date, Eventdata);
                return {
                    message: "Event updated successfully",
                    data: data
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    DeleteEvent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.eventService.DeleteEvent(id);
                return {
                    message: "Event deleted successfully",
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.EventController = EventController;
__decorate([
    (0, tsoa_1.SuccessResponse)(consts_1.StatusCode.OK, "Success"),
    (0, tsoa_1.Get)("/"),
    __param(0, (0, tsoa_1.Queries)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "GetAllEvent", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(consts_1.StatusCode.Created, "Created Success"),
    (0, tsoa_1.Post)("/"),
    (0, tsoa_1.Middlewares)(tokenValidation_1.verifyToken),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "CreateEvent", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(consts_1.StatusCode.OK, "Success"),
    (0, tsoa_1.Get)("/{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "GetEventById", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(consts_1.StatusCode.OK, "Success"),
    (0, tsoa_1.Put)("{date}/{id}"),
    (0, tsoa_1.Middlewares)(tokenValidation_1.verifyToken),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.Body)()),
    __param(3, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "UpdateEvent", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(consts_1.StatusCode.OK, "Success"),
    (0, tsoa_1.Delete)("/{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "DeleteEvent", null);
exports.EventController = EventController = __decorate([
    (0, tsoa_1.Route)("/event"),
    (0, tsoa_1.Tags)("Event"),
    __metadata("design:paramtypes", [])
], EventController);
