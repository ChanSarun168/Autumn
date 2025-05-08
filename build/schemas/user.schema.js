"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userSchema = zod_1.default.object({
    name: zod_1.default.string().min(3).max(255),
    email: zod_1.default.string().email(),
    phonenumber: zod_1.default.string().min(7).max(15),
    password: zod_1.default.string().min(8)
});
