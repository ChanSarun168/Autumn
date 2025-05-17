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
exports.verifyPassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const customError_1 = require("./customError");
const consts_1 = require("./consts");
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield bcrypt_1.default.hash(password, 10);
    }
    catch (error) {
        throw new customError_1.BaseCustomError("Unable to generate password", consts_1.StatusCode.NotFound);
    }
});
exports.hashPassword = hashPassword;
const verifyPassword = (_a) => __awaiter(void 0, [_a], void 0, function* ({ password, hashPassword, }) {
    try {
        return yield bcrypt_1.default.compare(password, hashPassword);
    }
    catch (error) {
        throw new customError_1.BaseCustomError("Unable to compare passwords!", consts_1.StatusCode.NotFound);
    }
});
exports.verifyPassword = verifyPassword;
