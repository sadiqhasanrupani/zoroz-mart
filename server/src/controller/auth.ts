import { Request, Response } from "express";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//^ types
import { PostLoginBody } from "../types/controller/auth";

//^ db and schemas
import { db } from "../config/db.config";
import { user } from "../schema/schema";

export async function verifyUserHandler(_req: Request, res: Response) {
  try {
    return res.status(200).json({ message: "User verified successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}

export async function postLoginHandler(req: Request, res: Response) {
  try {
    const body: PostLoginBody = req.body;

    //^ checking that the currently email id is valid or invalid
    const userValid = await db
      .select({ email: user.email, id: user.id, password: user.password })
      .from(user)
      .where(eq(user.email, body.email));

    if (!userValid[0]) {
      return res.status(422).json({ message: "Invalid Email ID.", field: "emailId" });
    }

    const isCorrectPassword = await bcrypt.compare(body.password, userValid[0].password as string);

    if (!isCorrectPassword) {
      return res.status(422).json({ message: "Invalid Password", field: "password" });
    }

    //^ now creating a jwt token
    const token = jwt.sign({ id: userValid[0].id }, process.env.SECRET_KEY as string, {
      expiresIn: "24h",
    });

    return res.status(200).json({ message: "Successfully able to login.", token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}
