import jwt from "jsonwebtoken";
import { logger } from "./logger";
import { privateKey } from "../server";
import { BaseCustomError } from "./customError";
import { StatusCode } from "./consts";

export const decodedToken = async (token: string) => {
  try {
    const decodedPayload = jwt.verify(token, privateKey, {
      algorithms: ["RS256"],
    }) as {
      id: string;
      role: string;
    };

    const datapayload = {
      role: decodedPayload.role,
      id: decodedPayload.id,
    };

    console.log("datapayload : ", datapayload);

    return datapayload;
  } catch (error: unknown) {
    logger.error("Unable to decode in decodeToken() method !", error);
    throw new BaseCustomError("Can't Decode token!" , StatusCode.NotFound);
  }
};