import { Request as Req, Response as Res, NextFunction as Next } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export type IsAuth = {
  token: string | JwtPayload;
  userId: number | JwtPayload;
} & Req;

export type DecodeToken = {
  id: number;
  exp: number;
  iat: number;
};

const isAuth = (req: Req | IsAuth, res: Res, next: Next): any => {
  try {
    const authHeader = req.get("Authorization");

    if (!authHeader) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const token = authHeader?.toString().split(" ")[1];

    // Check if SECRET_TOKEN is defined
    if (!process.env.SECRET_KEY) {
      return res
        .status(500)
        .json({ message: "Internal server error: Secret key not provided" });
    }

    let decodedToken: DecodeToken | unknown;
    try {
      decodedToken = jwt.verify(
        token as string,
        process.env.SECRET_KEY as string
      );

      const isTokenExpired =
        (decodedToken as DecodeToken).exp < Date.now() / 1000;

      if (isTokenExpired) {
        return res.status(401).json({ message: "Token has expired" });
      }
    } catch (err) {
      if ((err as any)?.message === "jwt expired") {
        return res
          .status(500)
          .json({ message: "jwt expired", isExpired: true });
      }

      if ((err as any)?.message === "invalid token") {
        return res
          .status(500)
          .json({ message: "token is invalid", isInvalid: true });
      }

      if ((err as any)?.message === "invalid signature") {
        return res.status(500).json({
          message: "token's signature is invalid",
          isSignatureInvalid: true,
        });
      }

      return res.status(500).json({
        message: "Internal server error",
        error: err,
      });
    }

    if (!decodedToken) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    (req as IsAuth).userId = (decodedToken as DecodeToken).id;

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export default isAuth;
