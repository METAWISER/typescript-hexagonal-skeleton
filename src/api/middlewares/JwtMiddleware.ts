import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import HttpResponse from "../../shared/infrastructure/response/HttpResponse";

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

export function validateJWT(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void {
  const httpResponse = new HttpResponse();
  // Obtain the token from the request header
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    httpResponse.Unauthorized(res, "Unauthorized");

    return;
  }
  // Verify the token
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET ?? "",
  ) as jwt.JwtPayload;
  req.user = { id: decoded.id };
  next();
}
