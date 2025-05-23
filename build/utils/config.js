"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
function createConfig(configPath) {
    dotenv_1.default.config({ path: configPath });
    // Validate essential configuration
    const requiredConfig = ["NODE_ENV", "PORT", "MONGODB_URL", "LOG_LEVEL"];
    const missingConfig = requiredConfig.filter((key) => !process.env[key]);
    if (missingConfig.length > 0) {
        throw new Error(`Missing required environment variables: ${missingConfig.join(", ")}`);
    }
    // Return configuration object
    return {
        env: process.env.NODE_ENV,
        port: process.env.PORT,
        logLevel: process.env.LOG_LEVEL,
        mongoUrl: process.env.MONGODB_URL,
    };
}
const getConfig = (currentEnv = "development") => {
    const configPath = currentEnv === "development"
        ? path_1.default.join(__dirname, `../../config/.env`)
        : path_1.default.join(__dirname, `../../config/.env.${currentEnv}`);
    return createConfig(configPath);
};
exports.default = getConfig;
