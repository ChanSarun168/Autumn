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
exports.RegisterRoutes = RegisterRoutes;
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const admin_controller_1 = require("./../controllers/admin.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const event_controller_1 = require("./../controllers/event.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const table_controller_1 = require("./../controllers/table.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const food_controller_1 = require("./../controllers/food.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const booking_controller_1 = require("./../controllers/booking.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const user_controller_1 = require("./../controllers/user.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "IAdmin": {
        "dataType": "refObject",
        "properties": {
            "email": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IQueryParam": {
        "dataType": "refObject",
        "properties": {
            "date": { "dataType": "datetime" },
            "isSpecial": { "dataType": "boolean" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IEventInfo": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "time": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "isSpecial": { "dataType": "boolean" },
            "thumbnail": { "dataType": "string", "required": true },
            "admin_id": { "dataType": "string" },
            "isdeleted": { "dataType": "boolean" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Ievent": {
        "dataType": "refObject",
        "properties": {
            "date": { "dataType": "datetime", "required": true },
            "isdeleted": { "dataType": "boolean" },
            "event_info": { "dataType": "array", "array": { "dataType": "refObject", "ref": "IEventInfo" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITable": {
        "dataType": "refObject",
        "properties": {
            "table_no": { "dataType": "string", "required": true },
            "capacity": { "dataType": "double", "required": true },
            "isdeleted": { "dataType": "boolean" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Ifood": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "price": { "dataType": "double", "required": true },
            "type": { "dataType": "string", "required": true },
            "thumbnail": { "dataType": "string", "required": true },
            "isdeleted": { "dataType": "boolean" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IQueryFood": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string" },
            "type": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IQueryBooking": {
        "dataType": "refObject",
        "properties": {
            "date": { "dataType": "datetime" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBookingInfo": {
        "dataType": "refObject",
        "properties": {
            "tables": { "dataType": "array", "array": { "dataType": "string" }, "required": true },
            "customer_id": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBooking": {
        "dataType": "refObject",
        "properties": {
            "date": { "dataType": "datetime", "required": true },
            "booking_info": { "dataType": "array", "array": { "dataType": "refObject", "ref": "IBookingInfo" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUser": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "phonenumber": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
            "profile": { "dataType": "string" },
            "isdeleted": { "dataType": "boolean" },
            "role": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IuserLogin": {
        "dataType": "refObject",
        "properties": {
            "email": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new runtime_1.ExpressTemplateService(models, { "noImplicitAdditionalProperties": "throw-on-extras", "bodyCoercion": true });
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    app.post('/auth/admin', ...((0, runtime_1.fetchMiddlewares)(admin_controller_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(admin_controller_1.AdminController.prototype.AdminSignup)), function AdminController_AdminSignup(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "IAdmin" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new admin_controller_1.AdminController();
                yield templateService.apiHandler({
                    methodName: 'AdminSignup',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 201,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/auth/admin-login', ...((0, runtime_1.fetchMiddlewares)(admin_controller_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(admin_controller_1.AdminController.prototype.AdminLogin)), function AdminController_AdminLogin(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "IAdmin" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new admin_controller_1.AdminController();
                yield templateService.apiHandler({
                    methodName: 'AdminLogin',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 200,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/auth/admin/:id', ...((0, runtime_1.fetchMiddlewares)(admin_controller_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(admin_controller_1.AdminController.prototype.GetAdminInfo)), function AdminController_GetAdminInfo(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new admin_controller_1.AdminController();
                yield templateService.apiHandler({
                    methodName: 'GetAdminInfo',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 200,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/event', ...((0, runtime_1.fetchMiddlewares)(event_controller_1.EventController)), ...((0, runtime_1.fetchMiddlewares)(event_controller_1.EventController.prototype.GetAllEvent)), function EventController_GetAllEvent(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                queryparam: { "in": "queries", "name": "queryparam", "required": true, "ref": "IQueryParam" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new event_controller_1.EventController();
                yield templateService.apiHandler({
                    methodName: 'GetAllEvent',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 200,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/event', ...((0, runtime_1.fetchMiddlewares)(event_controller_1.EventController)), ...((0, runtime_1.fetchMiddlewares)(event_controller_1.EventController.prototype.CreateEvent)), function EventController_CreateEvent(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "Ievent" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new event_controller_1.EventController();
                yield templateService.apiHandler({
                    methodName: 'CreateEvent',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 201,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/event/:id', ...((0, runtime_1.fetchMiddlewares)(event_controller_1.EventController)), ...((0, runtime_1.fetchMiddlewares)(event_controller_1.EventController.prototype.GetEventById)), function EventController_GetEventById(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new event_controller_1.EventController();
                yield templateService.apiHandler({
                    methodName: 'GetEventById',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 200,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/event/:date/:id', ...((0, runtime_1.fetchMiddlewares)(event_controller_1.EventController)), ...((0, runtime_1.fetchMiddlewares)(event_controller_1.EventController.prototype.UpdateEvent)), function EventController_UpdateEvent(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                date: { "in": "path", "name": "date", "required": true, "dataType": "string" },
                requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "Ievent" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new event_controller_1.EventController();
                yield templateService.apiHandler({
                    methodName: 'UpdateEvent',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 200,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/event/:id', ...((0, runtime_1.fetchMiddlewares)(event_controller_1.EventController)), ...((0, runtime_1.fetchMiddlewares)(event_controller_1.EventController.prototype.DeleteEvent)), function EventController_DeleteEvent(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new event_controller_1.EventController();
                yield templateService.apiHandler({
                    methodName: 'DeleteEvent',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 200,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/table', ...((0, runtime_1.fetchMiddlewares)(table_controller_1.TableController)), ...((0, runtime_1.fetchMiddlewares)(table_controller_1.TableController.prototype.createTable)), function TableController_createTable(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "ITable" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new table_controller_1.TableController();
                yield templateService.apiHandler({
                    methodName: 'createTable',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 201,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/table', ...((0, runtime_1.fetchMiddlewares)(table_controller_1.TableController)), ...((0, runtime_1.fetchMiddlewares)(table_controller_1.TableController.prototype.GetAllTable)), function TableController_GetAllTable(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {};
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new table_controller_1.TableController();
                yield templateService.apiHandler({
                    methodName: 'GetAllTable',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 200,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/table/:tableId', ...((0, runtime_1.fetchMiddlewares)(table_controller_1.TableController)), ...((0, runtime_1.fetchMiddlewares)(table_controller_1.TableController.prototype.GetTable)), function TableController_GetTable(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                tableId: { "in": "path", "name": "tableId", "required": true, "dataType": "string" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new table_controller_1.TableController();
                yield templateService.apiHandler({
                    methodName: 'GetTable',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 200,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/table/:tableId', ...((0, runtime_1.fetchMiddlewares)(table_controller_1.TableController)), ...((0, runtime_1.fetchMiddlewares)(table_controller_1.TableController.prototype.UpdateTable)), function TableController_UpdateTable(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                tableId: { "in": "path", "name": "tableId", "required": true, "dataType": "string" },
                requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "ITable" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new table_controller_1.TableController();
                yield templateService.apiHandler({
                    methodName: 'UpdateTable',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 200,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/table/:tableId', ...((0, runtime_1.fetchMiddlewares)(table_controller_1.TableController)), ...((0, runtime_1.fetchMiddlewares)(table_controller_1.TableController.prototype.DeleteTable)), function TableController_DeleteTable(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                tableId: { "in": "path", "name": "tableId", "required": true, "dataType": "string" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new table_controller_1.TableController();
                yield templateService.apiHandler({
                    methodName: 'DeleteTable',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 200,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/food', ...((0, runtime_1.fetchMiddlewares)(food_controller_1.FoodController)), ...((0, runtime_1.fetchMiddlewares)(food_controller_1.FoodController.prototype.CreateFood)), function FoodController_CreateFood(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
                requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "Ifood" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new food_controller_1.FoodController();
                yield templateService.apiHandler({
                    methodName: 'CreateFood',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 201,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/food', ...((0, runtime_1.fetchMiddlewares)(food_controller_1.FoodController)), ...((0, runtime_1.fetchMiddlewares)(food_controller_1.FoodController.prototype.GetAllFood)), function FoodController_GetAllFood(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                queryparam: { "in": "queries", "name": "queryparam", "required": true, "ref": "IQueryFood" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new food_controller_1.FoodController();
                yield templateService.apiHandler({
                    methodName: 'GetAllFood',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 200,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/booking', ...((0, runtime_1.fetchMiddlewares)(booking_controller_1.BookingController)), ...((0, runtime_1.fetchMiddlewares)(booking_controller_1.BookingController.prototype.GetAllBooking)), function BookingController_GetAllBooking(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                queryparam: { "in": "queries", "name": "queryparam", "required": true, "ref": "IQueryBooking" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new booking_controller_1.BookingController();
                yield templateService.apiHandler({
                    methodName: 'GetAllBooking',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 200,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/booking', ...((0, runtime_1.fetchMiddlewares)(booking_controller_1.BookingController)), ...((0, runtime_1.fetchMiddlewares)(booking_controller_1.BookingController.prototype.CreateBooking)), function BookingController_CreateBooking(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "IBooking" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new booking_controller_1.BookingController();
                yield templateService.apiHandler({
                    methodName: 'CreateBooking',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 201,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/user/info', ...((0, runtime_1.fetchMiddlewares)(user_controller_1.userController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.userController.prototype.UserInfo)), function userController_UserInfo(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new user_controller_1.userController();
                yield templateService.apiHandler({
                    methodName: 'UserInfo',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 200,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/user', ...((0, runtime_1.fetchMiddlewares)(user_controller_1.userController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.userController.prototype.UserSignup)), function userController_UserSignup(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "IUser" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new user_controller_1.userController();
                yield templateService.apiHandler({
                    methodName: 'UserSignup',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 201,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/user', ...((0, runtime_1.fetchMiddlewares)(user_controller_1.userController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.userController.prototype.GetAlluser)), function userController_GetAlluser(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {};
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new user_controller_1.userController();
                yield templateService.apiHandler({
                    methodName: 'GetAlluser',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 200,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/user/:id', ...((0, runtime_1.fetchMiddlewares)(user_controller_1.userController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.userController.prototype.GetUserById)), function userController_GetUserById(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new user_controller_1.userController();
                yield templateService.apiHandler({
                    methodName: 'GetUserById',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 200,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/user/:id', ...((0, runtime_1.fetchMiddlewares)(user_controller_1.userController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.userController.prototype.UpdateUser)), function userController_UpdateUser(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "IUser" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new user_controller_1.userController();
                yield templateService.apiHandler({
                    methodName: 'UpdateUser',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 201,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/user/:id', ...((0, runtime_1.fetchMiddlewares)(user_controller_1.userController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.userController.prototype.DeleteUser)), function userController_DeleteUser(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new user_controller_1.userController();
                yield templateService.apiHandler({
                    methodName: 'DeleteUser',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 200,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/user/login', ...((0, runtime_1.fetchMiddlewares)(user_controller_1.userController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.userController.prototype.UserLogin)), function userController_UserLogin(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "IuserLogin" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new user_controller_1.userController();
                yield templateService.apiHandler({
                    methodName: 'UserLogin',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 200,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
