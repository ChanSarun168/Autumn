import bcrypt from "bcrypt";
import { BaseCustomError } from "./customError";
import { StatusCode } from "./consts";

export const hashPassword = async (password: string) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    throw new BaseCustomError("Unable to generate password", StatusCode.NotFound);
  }
};

export const verifyPassword = async ({
  password,
  hashPassword,
}: {
  password: string;
  hashPassword: string;
}) => {
  try {
    return await bcrypt.compare(password, hashPassword);
  } catch (error: unknown) {
    throw new BaseCustomError(
      "Unable to compare passwords!",
      StatusCode.NotFound
    );
  }
};