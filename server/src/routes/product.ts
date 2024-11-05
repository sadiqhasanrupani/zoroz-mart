import { Router } from "express";

//^ middleware
import isAuth from "../middleware/is-auth";
import isUser from "../middleware/is-user";

//^ controller
import { getAllProductsHandler, getProductCategoriesHandler, getProductHandler } from "../controller/product";

const router = Router();

//^ ==> get routes
router.get("/get-all", [isAuth, isUser], getAllProductsHandler);
router.get("/get-product/:productId", [isAuth, isUser], getProductHandler);
router.get("/get-product-categories", [isAuth, isUser], getProductCategoriesHandler)

//^ ==> post routes

const productRouter = router;
export default productRouter;
