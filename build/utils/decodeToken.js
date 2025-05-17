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
exports.decodedToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = require("./logger");
const server_1 = require("../server");
const customError_1 = require("./customError");
const consts_1 = require("./consts");
const decodedToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedPayload = jsonwebtoken_1.default.verify(token, server_1.privateKey, {
            algorithms: ["RS256"],
        });
        const datapayload = {
            role: decodedPayload.role,
            id: decodedPayload.id,
        };
        console.log("datapayload : ", datapayload);
        return datapayload;
    }
    catch (error) {
        logger_1.logger.error("Unable to decode in decodeToken() method !", error);
        throw new customError_1.BaseCustomError("Can't Decode token!", consts_1.StatusCode.NotFound);
    }
});
exports.decodedToken = decodedToken;
