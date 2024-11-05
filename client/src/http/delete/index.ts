import { getAuthToken } from "@/lib/is-auth";
import { DeleteCartContext } from "./types";

//^ cart http request ====================================

export async function deleteCartHandler(body: DeleteCartContext) {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/cart/delete-cart/${body.cartId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();

    const error: any = new Error("An Error occurred while deleting a cart detail.");

    error.code = response.status;
    error.info = errorData;

    throw error;
  }

  const resData = await response.json();
  return resData;
}

//^ cart http request ====================================
