import { Router } from "express";

//^ middleware
import isAuth from "../middleware/is-auth";
import isUser from "../middleware/is-user";

//^ controller
import {
  addToCartHandler,
  getCartDetailsHandler,
  updateAddToCartHandler,
  getCartCountsHandler,
  getAllCartHandler,
  deleteCartHandler
} from "../controller/cart";

const router = Router();

//^ ==> get routes
router.get("/get-prod-cart-detail/:productId", [isAuth, isUser], getCartDetailsHandler);
router.get("/get-cart-counts", [isAuth, isUser], getCartCountsHandler);
router.get("/get-all-carts", [isAuth, isUser], getAllCartHandler)

//^ ==> post routes
router.post("/add-to-cart", [isAuth, isUser], addToCartHandler);

//^ ==> put routes
router.put("/update-add-to-cart", [isAuth, isUser], updateAddToCartHandler);

//^ ==> DELETE routes
router.delete("/delete-cart/:cartId", [isAuth, isUser], deleteCartHandler)

const cartRouter = router;
export default cartRouter;
