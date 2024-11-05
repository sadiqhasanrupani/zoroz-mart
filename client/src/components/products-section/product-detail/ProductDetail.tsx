import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

//^ http request
import { getProductCartDetailHandler, getProductHandler } from "@/http/get";
import { GetCartProdDetailRes, GetProductDetailRes, ProductDetail as ProductDetailRes } from "@/http/get/types";

//^ shadcn-ui
import { Card } from "@/components/ui/card";

//^ ui-component
import ErrorAlert from "@/components/error-message";
import Spinner from "@/components/ui-component/spinner/Spinner";
import Product from "./product/Product";
import { Cross2Icon } from "@radix-ui/react-icons";

export default function ProductDetail() {
  const params = useParams() as { productId: string };
  const navigate = useNavigate();

  const {
    data: productDetailData,
    isLoading: productDetailIsLoading,
    isRefetching: productDetailIsRefetching,
    isError: productDetailIsError,
    error: productDetailError,
    refetch: productDetailRefetch,
  } = useQuery<GetProductDetailRes, any>({
    queryKey: ["get-product-detail", params.productId],
    queryFn: ({ signal }) => getProductHandler({ signal, productId: params.productId }),
    staleTime: Infinity,
    gcTime: 0,
    enabled: typeof params.productId !== "undefined",
  });

  //^ query to get the product cart details
  const {
    data: cartProdDetailData,
    isLoading: cartProdDetailIsLoading,
    isError: cartProdDetailIsError,
    error: cartProdDetailError,
    refetch: cartProdDetailRefetch,
  } = useQuery<GetCartProdDetailRes, any>({
    queryKey: ["get-prod-cart-details", params.productId],
    queryFn: ({ signal }) => getProductCartDetailHandler({ signal, productId: params.productId }),
    gcTime: 0,
    staleTime: Infinity,
    enabled: typeof params.productId !== "undefined",
  });

  return (
    <>
      {productDetailIsError && (
        <ErrorAlert
          title={`Error code: ${productDetailError?.code || 500}`}
          subTitle={`Message: ${
            productDetailError?.info?.error?.message
              ? productDetailError?.info?.error?.message
              : (productDetailError?.info && productDetailError?.info?.message) || "Something went wrong"
          }`}
          onConformed={() => {
            productDetailRefetch();
          }}
          clg={productDetailError?.info}
        />
      )}
      {cartProdDetailIsError && (
        <>
          <ErrorAlert
            title={`Error code: ${cartProdDetailError?.code || 500}`}
            subTitle={`Message: ${
              cartProdDetailError?.info?.error?.message
                ? cartProdDetailError?.info?.error?.message
                : (cartProdDetailError?.info && cartProdDetailError?.info?.message) || "Something went wrong"
            }`}
            onConformed={() => {
              cartProdDetailRefetch();
            }}
            clg={cartProdDetailError?.info}
          />
        </>
      )}
      {productDetailIsLoading || productDetailIsRefetching || cartProdDetailIsLoading ? (
        <Spinner />
      ) : (
        <Card className="rounded-md p-4 shadow-none h-full relative">
          <div>
            <Product
              cartProdDetailRefetch={cartProdDetailRefetch}
              productRefetch={productDetailRefetch}
              cartProdDetailData={cartProdDetailData as GetCartProdDetailRes}
              product={productDetailData?.productDetail as ProductDetailRes}
            />
          </div>
          <div
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Cross2Icon className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </div>
        </Card>
      )}
    </>
  );
}
