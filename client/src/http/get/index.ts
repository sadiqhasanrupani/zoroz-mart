import { getAuthToken } from "@/lib/is-auth";
import { GetProductCategoriesRes } from "./types";

export async function verifyToken({ signal }: { signal: AbortSignal }) {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/verify-user`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
    signal,
  });

  if (!response.ok) {
    const errorData = await response.json();

    const error: any = new Error("An Error occurred while verifying the user.");

    error.code = response.status;
    error.info = errorData;

    throw error;
  }

  const resData = await response.json();
  return resData;
}

//^ product http request ==========================================

export async function getAllProductsHandler({
  signal,
  prodCategoryId,
}: {
  signal: AbortSignal;
  prodCategoryId?: number;
}) {
  let endpoint = "api/product/get-all";

  if (prodCategoryId) {
    endpoint = `api/product/get-all?categoryId=${prodCategoryId}`;
  }

  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
    signal,
  });

  if (!response.ok) {
    const errorData = await response.json();

    const error: any = new Error("An Error occurred while getting all the products.");

    error.code = response.status;
    error.info = errorData;

    throw error;
  }

  const resData = await response.json();
  return resData;
}
export async function getProductHandler({ signal, productId }: { signal: AbortSignal; productId: string }) {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/product/get-product/${productId}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
    signal,
  });

  if (!response.ok) {
    const errorData = await response.json();

    const error: any = new Error("An Error occurred while getting product details.");

    error.code = response.status;
    error.info = errorData;

    throw error;
  }

  const resData = await response.json();
  return resData;
}
export async function getProductCategoriesHandler({
  signal,
}: {
  signal: AbortSignal;
}): Promise<GetProductCategoriesRes> {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/product/get-product-categories`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
    signal,
  });

  if (!response.ok) {
    const errorData = await response.json();

    const error: any = new Error("An Error occurred while getting product categories.");

    error.code = response.status;
    error.info = errorData;

    throw error;
  }

  const resData = await response.json();
  return resData;
}

//^ product http request ==========================================

//^ user http request =============================================

export async function getUserHandler({ signal }: { signal: AbortSignal }) {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/get-user`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
    signal,
  });

  if (!response.ok) {
    const errorData = await response.json();

    const error: any = new Error("An Error occurred while getting user data.");

    error.code = response.status;
    error.info = errorData;

    throw error;
  }

  const resData = await response.json();
  return resData;
}

//^ user http request =============================================

//^ cart http request =============================================

export async function getProductCartDetailHandler(data: { signal: AbortSignal; productId: string }) {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/cart/get-prod-cart-detail/${data.productId}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
    signal: data.signal,
  });

  if (!response.ok) {
    const errorData = await response.json();

    const error: any = new Error("An Error occurred while getting the product's cart detail.");

    error.code = response.status;
    error.info = errorData;

    throw error;
  }

  const resData = await response.json();
  return resData;
}
export async function getCartCountHandler({ signal }: { signal: AbortSignal }) {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/cart/get-cart-counts`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
    signal,
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error: any = new Error("An Error occurred while getting the cart's count");
    error.code = response.status;
    error.info = errorData;
    throw error;
  }

  const resData = await response.json();
  return resData;
}
export async function getAllCartsHandler({ signal }: { signal: AbortSignal }) {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/cart/get-all-carts`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
    signal,
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error: any = new Error("An Error occurred while getting all of the shopping carts.");
    error.code = response.status;
    error.info = errorData;

    throw error;
  }

  const resData = await response.json();
  return resData;
}

//^ cart http request =============================================
