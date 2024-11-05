import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

//^ db config
import { db } from "../config/db.config";

// model
import { user } from "../schema/schema";

// types
import { IsAuth } from "./is-auth";
import { sql } from "drizzle-orm";
export type User = {
  user: {
    id?: number;
    employee_id?: number;
    name?: string;
    email?: string;
  };
} & Request;

const isUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const userId = (req as IsAuth).userId;

    // check if the current user id is existed inside the users table or not.
    const allUser = await db
      .select({
        id: user.id,
        name: user.userName,
        email: user.email,
      })
      .from(user)
      .where(sql`id = ${userId}`);

    const getUser = allUser[0];

    if (!getUser) {
      return res.status(401).json({ message: "Unauthorized User, user is invalid." });
    }

    (req as User).user = {
      id: getUser.id,
      email: getUser.email as string,
      name: getUser.name,
    };

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export default isUser;
