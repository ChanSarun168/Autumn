import { NextFunction, Request, Response } from "express";
import { ZodSchema, ZodError } from "zod";
import { StatusCode } from "../utils/consts";
import { BaseCustomError } from "../utils/customError";

export const validateInput = (schema: ZodSchema) => {
  return (_req: Request, _res: Response, _next: NextFunction) => {
    try {
      schema.parse(_req.body);
      _next();
    } catch (error: any | unknown) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.reduce(
          (acc: { [key: string | number]: string }, issue) => {
            acc[issue.path[0]] = issue.message;
            return acc;
          },
          {}
        );

        const formattedErrorString = JSON.stringify(formattedErrors);

        const inputError = new BaseCustomError(
          formattedErrorString,
          StatusCode.NotFound
        );
        _next(inputError);
      } else {
        _next(new BaseCustomError("Internal Server Error!!", StatusCode.BadRequest));
      }
    }
  };
};
