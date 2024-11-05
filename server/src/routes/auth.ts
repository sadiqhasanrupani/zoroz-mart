import { Router } from "express";

//^ middleware
import isAuth from "../middleware/is-auth";
import isUser from "../middleware/is-user";

//^ controllers
import { verifyUserHandler, postLoginHandler } from "../controller/auth";

const router = Router();

//^ ==> get routes
router.get("/verify-user", [isAuth, isUser], verifyUserHandler);

//^ ==> post routes
router.post("/login", postLoginHandler);

const authRouter = router;
export default authRouter;
