import { Request, Response } from "express";
import { asc, eq } from "drizzle-orm";

//^ db and schemas
import { db } from "../config/db.config";
import { product, productCategory } from "../schema/schema";

export async function getAllProductsHandler(req: Request, res: Response) {
  try {
    const query = req.query as { categoryId?: string };

    if (query.categoryId) {
      const categoryId = parseInt(query.categoryId);

      const getProducts = await db
        .select({
          id: product.id,
          categoryId: product.categoryId,
          categoryNm: productCategory.name,
          name: product.name,
          price: product.price,
          description: product.description,
          prodImages: product.image,
        })
        .from(product)
        .innerJoin(productCategory, eq(productCategory.id, product.categoryId))
        .where(eq(productCategory.id, categoryId));

      return res.status(200).json({ message: "Successfully able to get the products", products: getProducts });
    }

    const getProducts = await db
      .select({
        id: product.id,
        categoryId: product.categoryId,
        categoryNm: productCategory.name,
        name: product.name,
        price: product.price,
        description: product.description,
        prodImages: product.image,
      })
      .from(product)
      .innerJoin(productCategory, eq(productCategory.id, product.categoryId));

    return res.status(200).json({ message: "Successfully able to get the products", products: getProducts });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}
export async function getProductHandler(req: Request, res: Response) {
  try {
    const params = req.params as { productId: string };
    const productId = parseInt(params.productId);

    const getProductDetails = await db
      .select({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        images: product.image,
        categoryNm: productCategory.name,
      })
      .from(product)
      .innerJoin(productCategory, eq(productCategory.id, product.categoryId))
      .where(eq(product.id, productId))
      .orderBy(asc(productCategory.name));

    if (!getProductDetails[0]) {
      return res.status(400).json({ message: "Invalid product ID." });
    }

    return res.status(200).json({ productDetail: getProductDetails[0] });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}
export async function getProductCategoriesHandler(_req: Request, res: Response) {
  try {
    //^ get all product categories
    const getProductCategories = await db
      .select({ id: productCategory.id, name: productCategory.name })
      .from(productCategory)
      .orderBy(asc(productCategory.createdAt));

    return res
      .status(200)
      .json({ message: "Successfully able to get product categories", productCategories: getProductCategories });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}
