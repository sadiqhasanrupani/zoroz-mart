import { Router } from "express";

//^ middleware
import isAuth from "../middleware/is-auth";
import isUser from "../middleware/is-user";

//^ controller
import { getUser } from "../controller/user";

const router = Router();

router.get("/get-user", [isAuth, isUser], getUser);

const userRouter = router;
export default userRouter;
