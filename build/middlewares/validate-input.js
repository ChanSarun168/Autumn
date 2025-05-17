"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInput = void 0;
const zod_1 = require("zod");
const consts_1 = require("../utils/consts");
const customError_1 = require("../utils/customError");
const validateInput = (schema) => {
    return (_req, _res, _next) => {
        try {
            schema.parse(_req.body);
            _next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const formattedErrors = error.issues.reduce((acc, issue) => {
                    acc[issue.path[0]] = issue.message;
                    return acc;
                }, {});
                const formattedErrorString = JSON.stringify(formattedErrors);
                const inputError = new customError_1.BaseCustomError(formattedErrorString, consts_1.StatusCode.NotFound);
                _next(inputError);
            }
            else {
                _next(new customError_1.BaseCustomError("Internal Server Error!!", consts_1.StatusCode.BadRequest));
            }
        }
    };
};
exports.validateInput = validateInput;
