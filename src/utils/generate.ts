import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
// import getConfig from "./createConfig";
import { privateKey } from "../server";
import { BaseCustomError } from "./customError";
import { StatusCode } from "./consts";

export const generateVerifyToken = async () => {
  try {
    return randomBytes(32).toString("hex");
  } catch (error: unknown) {
    throw error;
  }
};

export const generateToken = async (id: string) => {
  try {
    // JWT payload containing user information
    const payload = {
      id: id,
    };

    // Generate and return the JWT
    const token = jwt.sign(payload, privateKey, {
      expiresIn: "3d",
      algorithm: "RS256",
    });

    return token;
  } catch (error: unknown) {
    console.log(error);
    throw new BaseCustomError("Unable to generate signature from jwt",StatusCode.NotFound);
  }
};