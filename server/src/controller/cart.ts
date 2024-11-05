import { Request, Response } from "express";
import { and, asc, count, eq } from "drizzle-orm";
import moment from "moment";

//^ middleware
import { User } from "../middleware/is-user";

//^ db and schemas
import { db } from "../config/db.config";
import { cart, product } from "../schema/schema";

//^ types
import { UpdateAddToCartBody } from "../types/controller/product";

//^ ==> GET controller
export async function getCartDetailsHandler(req: Request, res: Response) {
  try {
    const user = (req as User).user;
    const params = req.params as { productId: string };
    const productId = parseInt(params.productId);

    //^ checking if product id is valid or invalid
    const getProducts = await db.select({ id: product.id }).from(product).where(eq(product.id, productId));

    if (!getProducts[0]) {
      return res.status(400).json({ message: "Product ID is invalid." });
    }

    //^ now will get the product's data
    const cartData = await db
      .select({ id: cart.id, quantity: cart.quantity })
      .from(cart)
      .where(and(eq(cart.productId, productId), eq(cart.userId, user.id as number)));

    return res.status(200).json({ message: "Success", cartData: cartData[0] });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}
export async function getCartCountsHandler(req: Request, res: Response) {
  try {
    const user = (req as User).user;

    //^ getting cart counts
    const getUserCartCounts = await db
      .select({ count: count() })
      .from(cart)
      .where(eq(cart.userId, user.id as number));

    return res.status(200).json({ message: "Success", cartCount: getUserCartCounts[0]?.count });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}
export async function getAllCartHandler(req: Request, res: Response) {
  try {
    const user = (req as User).user;

    //^ getting all of the shopping carts based on the user's id.
    const getCarts = await db
      .select({
        id: cart.id,
        prodId: cart.productId,
        prodName: product.name,
        prodImg: product.image,
        prodQty: cart.quantity,
        prodPrice: product.price,
        isCheck: cart.isCheck,
        prodTotalPrice: cart.totalPrice,
      })
      .from(cart)
      .innerJoin(product, eq(product.id, cart.productId))
      .where(eq(cart.userId, user.id as number))
      .orderBy(asc(cart.createdAt));

    return res.status(200).json({ message: "success", carts: getCarts });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}

//^ ==> POST controller
export async function addToCartHandler(req: Request, res: Response) {
  try {
    const user = (req as User).user;
    const body = req.body as { qty: number; productId: number };

    //^ checking if the product id is valid or invalid
    const getProducts = await db
      .select({ id: product.id, price: product.price })
      .from(product)
      .where(eq(product.id, body.productId));

    if (!getProducts[0]) {
      return res.status(400).json({ message: "Product ID is invalid." });
    }

    // const indianPrice = Intl.NumberFormat("en-IN");
    const productPrice = parseInt(getProducts[0].price) * body.qty;

    //^ now will insert the cart data into the cart table.
    const insertCart = await db.insert(cart).values({
      userId: user.id as number,
      productId: body.productId,
      quantity: body.qty,
      totalPrice: productPrice.toFixed(2),
      isCheck: true,
      createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    });

    if (insertCart.rowCount === 0) {
      return res.status(400).json({ message: "Unable to insert the cart." });
    }

    return res.status(200).json({ message: "Successfully able to add to cart." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}

//^ ==> PUT controller
export async function updateAddToCartHandler(req: Request, res: Response) {
  try {
    const user = (req as User).user;
    const body: UpdateAddToCartBody = req.body;

    //^ check if the cart id is valid or invalid
    const getCarts = await db
      .select({ id: cart.id, price: product.price })
      .from(cart)
      .innerJoin(product, eq(product.id, cart.productId))
      .where(eq(cart.id, body.cartId));

    if (!getCarts[0]) {
      return res.status(400).json({ message: "Cart ID is invalid." });
    }

    //^ now will update the cart
    // const indianPrice = Intl.NumberFormat("en-IN");
    // const productPrice = indianPrice.format(parseInt(getCarts[0].price) * body.quantity);
    const productPrice = parseInt(getCarts[0].price) * body.quantity;

    const updateCart = await db
      .update(cart)
      .set({
        quantity: body.quantity,
        totalPrice: productPrice.toFixed(2),
        isCheck: true,
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      })
      .where(and(eq(cart.userId, user.id as number), eq(cart.id, body.cartId)));

    if (updateCart.rowCount === 0) {
      return res
        .status(400)
        .json({ message: "Unable to update the cart, This may due to invalid fields or invalid ids." });
    }

    return res.status(200).json({ message: "Successfully able to update the cart" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}

//^ ==> DELETE controller
export async function deleteCartHandler(req: Request, res: Response) {
  try {
    const params = req.params as { cartId: string };
    const cartId = parseInt(params.cartId);

    //^ check whether the cart id is valid or invalid
    const getCarts = await db.select({ id: cart.id }).from(cart).where(eq(cart.id, cartId));

    if (!getCarts[0]) {
      return res.status(400).json({ message: "Cart ID is invalid." });
    }

    //^ deleting the cart
    const deleteCart = await db.delete(cart).where(eq(cart.id, cartId));

    if (deleteCart.rowCount === 0) {
      return res.status(400).json({ message: "Unable to delete the cart." });
    }

    return res.status(200).json({ message: "Successfully able to delete the cart." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}
