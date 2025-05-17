"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const adminSchema = new mongoose_1.default.Schema({
    email: { type: String, require: true },
    password: { type: String, require: true }
}, {
    toJSON: {
        transform(_doc, ret) {
            delete ret._id;
            delete ret.__v;
        },
    },
});
exports.AdminModel = mongoose_1.default.model("Admin", adminSchema);
