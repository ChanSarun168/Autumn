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
exports.generateToken = exports.generateVerifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = require("crypto");
// import getConfig from "./createConfig";
const server_1 = require("../server");
const customError_1 = require("./customError");
const consts_1 = require("./consts");
const generateVerifyToken = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (0, crypto_1.randomBytes)(32).toString("hex");
    }
    catch (error) {
        throw error;
    }
});
exports.generateVerifyToken = generateVerifyToken;
const generateToken = (id, role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // JWT payload containing user information
        const payload = {
            id: id,
            role: role
        };
        // Generate and return the JWT
        const token = jsonwebtoken_1.default.sign(payload, server_1.privateKey, {
            expiresIn: "3d",
            algorithm: "RS256",
        });
        return token;
    }
    catch (error) {
        console.log(error);
        throw new customError_1.BaseCustomError("Unable to generate signature from jwt", consts_1.StatusCode.NotFound);
    }
});
exports.generateToken = generateToken;
