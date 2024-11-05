import { getAuthToken } from "@/lib/is-auth";

import { UpdateAddToCartContext } from "./types";

//^ cart http request ====================================

export async function updateAddToCartHandler(body: UpdateAddToCartContext) {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/cart/update-add-to-cart`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json();

    const error: any = new Error("An Error occurred while updating the add to cart of certain product.");

    error.code = response.status;
    error.info = errorData;

    throw error;
  }

  const resData = await response.json();
  return resData;
}

//^ cart http request ====================================
