import { Request, Response } from "express";
import crypto from "crypto";
import Razorpay from "razorpay";

//^ middleware
import { User } from "../middleware/is-user";

//^ db and schemas
import { db } from "../config/db.config";
import { cart, order, orderItem } from "../schema/schema";

//^ types
import { PlaceOrderBody } from "../types/controller/payment";
import moment from "moment";
import { eq } from "drizzle-orm";

export async function postPlaceOrderHandler(req: Request, res: Response) {
  try {
    const user = (req as User).user;
    const body: PlaceOrderBody = req.body;
    const orderId = crypto.randomUUID().split("-")[0];
    const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");

    //^ first creating a order
    const insertOrder = await db.insert(order).values({
      orderId: orderId as string,
      userId: user.id as number,
      orderDate: moment(body.orderDate).format("YYYY-MM-DD"),
      amountDue: body.amount.toString(),
      totalAmount: body.amount.toString(),
      currency: body.currency,
      createdAt: currentDate,
      updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    });

    if (insertOrder.rowCount === 0) {
      return res.status(400).json({ message: "Unable to insert the order" });
    }

    //^ now getting the recently created order
    const getOrders = await db.select({ id: order.id }).from(order).where(eq(order.createdAt, currentDate));

    if (!getOrders) {
      return res.status(400).json({ message: "Their is no order data based on the current date." });
    }

    //^ now will insert the order items
    const insertOrderItems = await db.insert(orderItem).values(
      body.products.map((product) => {
        return {
          orderId: getOrders[0]?.id as number,
          price: product.price.toString(),
          productId: product.id,
          quantity: product.qty.toString(),
          createdAt: currentDate,
          updatedAt: currentDate,
        };
      }),
    );

    if (insertOrderItems.rowCount === 0) {
      return res.status(400).json({ message: "Unable to insert the order items" });
    }

    //^ now will empty the cart
    const removeCarts = await db.delete(cart).where(eq(cart.userId, user.id as number));

    if (removeCarts.rowCount === 0) {
      return res.status(400).json({ message: "Unable to remove the cart." });
    }

    return res.status(200).json({ message: "Order placed successfully. Your order is on its way to your home." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}

export async function getCardDetailsHandler(req: Request, res: Response) {
  try {
    const param = req.params as { razorId: string };

    const instance = new Razorpay({
      key_id: process.env.KEY_ID as string,
      key_secret: process.env.KEY_SECRET,
    });

    const order = await instance.payments.fetch(param.razorId);

    if (!order) {
      return res.status(500).json({ message: "Internal server error" });
    }

    return res.status(200).json({ message: "Success", data: order });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}
