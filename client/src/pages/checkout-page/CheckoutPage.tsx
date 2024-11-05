import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Cross2Icon } from '@radix-ui/react-icons';
import { AppUseSelector } from '@/store';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { productActions } from '@/store/slice/product-slice';
import { getAllCartsHandler, getUserHandler } from '@/http/get';
import { GetCartDataRes, GetUserRes } from '@/http/get/types';
import { PlaceOrderContext, Product } from '@/http/post/types';
import { postCheckoutHandler } from '@/http/post';
import { queryClient } from '@/http';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import ErrorAlert from '@/components/error-message';
import Spinner from '@/components/ui-component/spinner/Spinner';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productTotalPrice = AppUseSelector((state) => state.product.productSubTotalPrice);

  const {
    data: cartsData,
    isLoading: cartsIsLoading,
    isError: cartsIsError,
    error: cartsError,
    refetch: cartsRefetch,
  } = useQuery<GetCartDataRes, any>({
    queryKey: ['get-all-shopping-carts'],
    queryFn: ({ signal }) => getAllCartsHandler({ signal }),
    gcTime: 0,
    staleTime: Infinity,
  });

  const {
    data: getUserData,
    isLoading: getUserIsLoading,
    isError: getUserIsError,
    error: getUserError,
    refetch: getUserRefetch,
  } = useQuery<GetUserRes, any>({
    queryKey: ['get-user'],
    queryFn: ({ signal }) => getUserHandler({ signal }),
    gcTime: 0,
    staleTime: Infinity,
  });

  const {
    isPending: checkoutIsPending,
    isError: checkoutIsError,
    error: checkoutError,
    mutate: checkoutMutate,
    reset: checkoutReset,
  } = useMutation<any, any, PlaceOrderContext>({
    mutationKey: ['checkout-order'],
    mutationFn: postCheckoutHandler,
    onSuccess: (data) => {
      Swal.fire({
        title: 'Order Placed Successfully',
        text: data.message,
        icon: 'success',
      });
      queryClient.invalidateQueries({
        queryKey: ['get-cart-count'],
        exact: true,
        type: 'active',
      });

      navigate('/');
    },
  });

  useEffect(() => {
    if (!cartsIsLoading) {
      let sumOfPrices = 0.0;
      cartsData?.carts.forEach((cart) => {
        const cartPrice = parseFloat(cart.prodPrice) * cart.prodQty;
        sumOfPrices += cartPrice;
      });
      dispatch(productActions.addProdSubTotalHandler(sumOfPrices));
    }
  }, [cartsData, cartsIsLoading, dispatch]);

  const checkoutOrderHandler = () => {
    const data: PlaceOrderContext = {
      amount: productTotalPrice,
      currency: 'INR',
      orderDate: new Date(),
      products: cartsData?.carts.map((cart) => ({
        id: cart.prodId,
        price: cart.prodPrice,
        qty: cart.prodQty,
      })) as unknown as Product[],
    };

    checkoutMutate(data);
  };

  return (
    <>
      {checkoutIsError && (
        <ErrorAlert
          title={`Error code: ${checkoutError?.code || 500}`}
          subTitle={`Message: ${checkoutError?.info?.error?.message
              ? checkoutError?.info?.error?.message
              : (checkoutError?.info && checkoutError?.info?.message) || 'Something went wrong'
            }`}
          onConformed={() => {
            checkoutReset();
          }}
          clg={checkoutError?.info}
        />
      )}
      {cartsIsError && (
        <ErrorAlert
          title={`Error code: ${cartsError?.code || 500}`}
          subTitle={`Message: ${cartsError?.info?.error?.message
              ? cartsError?.info?.error?.message
              : (cartsError?.info && cartsError?.info?.message) || 'Something went wrong'
            }`}
          onConformed={() => {
            getUserRefetch();
          }}
          clg={cartsError?.info}
        />
      )}
      {getUserIsError && (
        <ErrorAlert
          title={`Error code: ${getUserError?.code || 500}`}
          subTitle={`Message: ${getUserError?.info?.error?.message
              ? getUserError?.info?.error?.message
              : (getUserError?.info && getUserError?.info?.message) || 'Something went wrong'
            }`}
          onConformed={() => {
            cartsRefetch();
          }}
          clg={getUserError?.info}
        />
      )}
      <div className="flex flex-col gap-8">
        <Card className="relative">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-medium">Checkout</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-5">
            <CardDescription className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8 text-slate-600 text-base">
              {cartsIsLoading ? (
                <Spinner />
              ) : (
                <>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <p className="font-semibold text-lg">Delivery Address</p>
                      {getUserIsLoading ? (
                        <div className="flex flex-col gap-2">
                          <Skeleton className="h-5 w-32" />
                          <Skeleton className="h-5" />
                        </div>
                      ) : (
                        <div className="flex flex-col gap-4 border p-4 rounded-lg">
                          <p className="flex flex-col gap-4">
                            <span className="font-bold text-lg">{getUserData?.userData.name}</span>
                            <span>{getUserData?.userData.address}</span>
                          </p>
                          <div className="flex flex-col gap-1">
                            <p className="text-slate-400">Phone Number</p>
                            <p>{getUserData?.userData.phone}</p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <p className="text-slate-400">Email Address</p>
                            <p>{getUserData?.userData.email}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 flex flex-col gap-8">
                    <p className="font-semibold text-lg">Your Order</p>
                    <div>
                      <div className="flex justify-between items-center">
                        <p>Product</p>
                        <p>Total</p>
                      </div>
                      <Separator className="mt-2 mb-4" />
                      <div className="flex flex-col gap-2">
                        {cartsData?.carts.map((cart, index) => (
                          <div key={index} className="flex justify-between w-full">
                            <p>{`${cart.prodName} x ${cart.prodQty}`}</p>
                            <p>{`\u20B9 ${parseFloat(cart.prodPrice) * cart.prodQty}`}</p>
                          </div>
                        ))}
                      </div>
                      <Separator className="mt-2 mb-4" />
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                          <p className="font-extrabold">Subtotal</p>
                          <p>{`\u20B9${productTotalPrice}`}</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="font-extrabold">Shipping</p>
                          <p>{`\u20B9${0}`}</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="font-extrabold">Tax</p>
                          <p>{`\u20B9${0}`}</p>
                        </div>
                        <Separator className="mt-2 mb-4" />
                        <div className="flex justify-between">
                          <p className="font-extrabold">Payment Method</p>
                          <p className="text-sm font-bold">{`COD (Cash On Delivery)`}</p>
                        </div>
                        <Separator className="mt-2 mb-4" />
                        <div className="flex justify-between text-xl sm:text-2xl text-red-700">
                          <p className="font-extrabold">Total</p>
                          <p>{`\u20B9${productTotalPrice}`}</p>
                        </div>
                      </div>
                    </div>
                    <Button size={'lg'} type="button" onClick={checkoutOrderHandler} className="w-full">
                      <span>Checkout</span>
                      {checkoutIsPending ? <Spinner /> : ''}
                    </Button>
                  </div>
                </>
              )}
            </CardDescription>
          </CardContent>
          <div
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground cursor-pointer"
            onClick={() => navigate('/')}
          >
            <Cross2Icon className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </div>
        </Card>
      </div>
    </>
  );
}
