import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";

//^ Layout
import RootLayout from "@/layouts/root-layout/RootLayout";
import ProductLayout from "@/layouts/product-layout/ProductLayout";

//^ pages
import LoginPage, { loader as loginLoader } from "@/pages/auth/login";
import Products from "@/pages/products/Products";
import ProductDetailsPage from "@/pages/products/product-details-page/ProductDetailsPage";
import CartPage from "@/pages/cart/CartPage";
import CheckoutPage from "@/pages/checkout-page/CheckoutPage";

export default function Router() {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: <ProductLayout />,
          children: [
            { index: true, element: <Products /> },
            { path: "product-details/:productId", element: <ProductDetailsPage /> },
            { path: "cart", element: <CartPage /> },
            { path: "checkout", element: <CheckoutPage /> },
          ],
        },
        { path: "login", element: <LoginPage />, loader: loginLoader },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}
