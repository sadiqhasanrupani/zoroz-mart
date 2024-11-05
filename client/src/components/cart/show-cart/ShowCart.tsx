import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";
import { AppUseSelector } from "@/store";
import { useDispatch } from "react-redux";

//^ http request
import { getCartCountHandler } from "@/http/get";
import { GetCartCountRes } from "@/http/get/types";

//^ redux action
import { productActions } from "@/store/slice/product-slice";

//^ shadcn-ui
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ErrorAlert from "@/components/error-message";

export default function ShowCart() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cartCount = AppUseSelector((state) => state.product.cartCount);

  const {
    data: cartCountData,
    isLoading: cartCountIsLoading,
    isRefetching: cartCountIsRefetching,
    isError: cartCountIsError,
    error: cartCountError,
    refetch: cartCountRefetch,
  } = useQuery<GetCartCountRes, any>({
    queryKey: ["get-cart-count"],
    queryFn: ({ signal }) => getCartCountHandler({ signal }),
    gcTime: 0,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!cartCountIsLoading || !cartCountIsRefetching) {
      dispatch(productActions.addToCart(cartCountData?.cartCount ? cartCountData?.cartCount : 0));
    }
  }, [cartCountData, cartCountIsLoading, cartCountIsRefetching]);

  return (
    <>
      {cartCountIsError && (
        <ErrorAlert
          title={`Error code: ${cartCountError?.code || 500}`}
          subTitle={`Message: ${
            cartCountError?.info?.error?.message
              ? cartCountError?.info?.error?.message
              : (cartCountError?.info && cartCountError?.info?.message) || "Something went wrong"
          }`}
          onConformed={() => {
            cartCountRefetch();
          }}
          clg={cartCountError?.info}
        />
      )}
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>
            <Button
              size={"icon"}
              variant={"outline"}
              className="relative"
              type="button"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart />
              <Badge
                className="absolute right-[-0.5rem] top-[-0.5rem] py-0 rounded-full w-auto h-auto px-[0.28rem] block"
                variant={"destructive"}
              >
                {cartCount}
              </Badge>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Cart</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
