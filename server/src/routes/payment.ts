import { Router } from "express";

//^ middlewares
import isAuth from "../middleware/is-auth";
import isUser from "../middleware/is-user";

import { postPlaceOrderHandler } from "../controller/payment";

const router = Router();

// router.get("/get-card-details/:razorId", [isAuth, isUser], getCardDetailsHandler);

router.post("/place-order", [isAuth, isUser], postPlaceOrderHandler);

const paymentRouter = router;
export default paymentRouter;
