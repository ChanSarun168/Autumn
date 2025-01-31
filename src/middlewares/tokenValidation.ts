import { privateKey } from "../server";
import jwt from "jsonwebtoken";

export const verifyToken = (req: any, _res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header


  if (!token) {
    throw new Error("Token not provided");
  }
  try {
    const decodedToken = jwt.verify(token, privateKey, {
      algorithms: ["RS256"],
    }) as {
      id: string;
      role: string;
    };


    req.role = decodedToken.role;
    req.id = decodedToken.id; // Attach userId to the request object
    next(); // If token is valid, continue to the next middleware or route handler
  } catch (error: any) {
    throw new Error(error.message); // Throw error for invalid token
  }
};