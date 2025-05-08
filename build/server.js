"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateKey = void 0;
const path_1 = __importDefault(require("path"));
const app_1 = require("./app");
const config_1 = __importDefault(require("./utils/config"));
const dbconnection_1 = __importDefault(require("./utils/dbconnection"));
const fs_1 = __importDefault(require("fs"));
const port = (0, config_1.default)().port;
// READ FILE JWT PUBLIC KEY FIRST!
exports.privateKey = fs_1.default.readFileSync(path_1.default.join(__dirname, "../private_key.pem"), "utf-8");
(0, dbconnection_1.default)().then(() => {
    app_1.app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});
