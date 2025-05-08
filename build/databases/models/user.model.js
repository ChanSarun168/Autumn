"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    phonenumber: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    profile: { type: String },
    isdeleted: { type: Boolean, default: false },
    role: {
        type: String,
        enum: ["Admin", "Customer"],
        default: "Customer"
    },
}, {
    toJSON: {
        transform(_doc, ret) {
            delete ret.__v;
        },
    },
});
exports.UserModel = mongoose_1.default.model("User", userSchema);
