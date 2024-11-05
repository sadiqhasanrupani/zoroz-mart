import { Request, Response } from "express";
import { eq } from "drizzle-orm";

//^ middleware
import { User } from "../middleware/is-user";

//^ db and schemas
import { db } from "../config/db.config";
import { user } from "../schema/schema";

export async function getUser(req: Request, res: Response) {
  try {
    const userMiddleware = (req as User).user;

    const getUsers = await db
      .select({
        id: user.id,
        name: user.userName,
        image: user.img,
        email: user.email,
        address: user.address,
        phone: user.phoneNumber,
      })
      .from(user)
      .where(eq(user.id, userMiddleware.id as number));

    if (!getUsers[0]) {
      return res.status(401).json({ message: "User ID is invalid." });
    }

    return res.status(200).json({ message: "Successfully got the user", userData: getUsers[0] });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}
