import { useMutation } from '@tanstack/react-query';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

//^ http request
import { GetCartProdDetailRes, ProductDetail } from '@/http/get/types';
import { queryClient } from '@/http';
import { AddToCartContext } from '@/http/post/types';
import { postAddToCartHandler } from '@/http/post';
import { updateAddToCartHandler } from '@/http/put';
import { UpdateAddToCartContext } from '@/http/put/types';

//^ shadcn-ui
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

//^ components
import ErrorAlert from '@/components/error-message';
import Spinner from '@/components/ui-component/spinner/Spinner';

type ProductProps = {
  product: ProductDetail;
  productRefetch: any;
  cartProdDetailData: GetCartProdDetailRes;
  cartProdDetailRefetch: any;
};

export default function Product(props: ProductProps) {
  // const params = useParams() as { productId: string };
  const navigate = useNavigate();

  //^ mutation query for to add to cart
  const {
    isPending: addToCartIsPending,
    isError: addToCartIsError,
    error: addToCartError,
    mutate: addToCartMutate,
    reset: addToCartReset,
  } = useMutation<any, any, AddToCartContext>({
    mutationKey: ['post-add-to-cart'],
    mutationFn: postAddToCartHandler,
    onSuccess: (data) => {
      toast.success(200, { description: data.message });
      navigate(`/`);
      queryClient.invalidateQueries({
        queryKey: ['get-cart-count'],
        exact: true,
        type: 'active',
      });

      addToCartReset();
      // props.productRefetch();
      // props.cartProdDetailRefetch();
      // navigate(`/product-details/${params.productId}`);
    },
  });

  //^ update mutation query for to add to cart
  const {
    isPending: updateAddCartIsPending,
    isError: updateAddCartIsError,
    error: updateAddCartError,
    mutate: updateAddCartMutate,
    reset: updateAddCartReset,
  } = useMutation<any, any, UpdateAddToCartContext>({
    mutationKey: ['update-add-to-cart'],
    mutationFn: updateAddToCartHandler,
    onSuccess: (data) => {
      toast.success(200, { description: data.message });
      queryClient.invalidateQueries({
        queryKey: ['get-cart-count'],
        exact: true,
        type: 'active',
      });

      navigate(`/`);
      updateAddCartReset();
      // props.productRefetch();
      // props.cartProdDetailRefetch();
      // navigate(`/product-details/${params.productId}`);
    },
  });

  const images = props.product.images || [];
  const price = parseInt(props.product.price);
  const indianPrice = Intl.NumberFormat('en-IN');

  const formik = useFormik({
    initialValues: {
      quantity: props.cartProdDetailData.cartData ? props.cartProdDetailData.cartData.quantity : 1,
    },
    onSubmit: (values) => {
      if (values.quantity !== 0) {
        if (props.cartProdDetailData.cartData !== undefined) {
          updateAddCartMutate({ cartId: props.cartProdDetailData.cartData.id, quantity: values.quantity });
        } else {
          addToCartMutate({ productId: props.product.id, qty: values.quantity });
        }
      }
    },
  });

  return (
    <>
      {addToCartIsError && (
        <>
          {() => addToCartReset()}
          <ErrorAlert
            title={`Error code: ${addToCartError?.code || 500}`}
            subTitle={`Message: ${
              addToCartError?.info?.error?.message
                ? addToCartError?.info?.error?.message
                : (addToCartError?.info && addToCartError?.info?.message) || 'Something went wrong'
            }`}
            onConformed={() => {
              addToCartReset();
            }}
            clg={addToCartError?.info}
          />
        </>
      )}
      {updateAddCartIsError && (
        <>
          {() => addToCartReset()}
          <ErrorAlert
            title={`Error code: ${updateAddCartError?.code || 500}`}
            subTitle={`Message: ${
              updateAddCartError?.info?.error?.message
                ? updateAddCartError?.info?.error?.message
                : (updateAddCartError?.info && updateAddCartError?.info?.message) || 'Something went wrong'
            }`}
            onConformed={() => {
              updateAddCartReset();
            }}
            clg={updateAddCartError?.info}
          />
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 py-5">
        <div>
          <Carousel className="mx-10 rounded-md">
            <CarouselContent>
              {images.map((image, index) => {
                return (
                  <CarouselItem key={index}>
                    <Avatar className="w-full h-full rounded-xl">
                      <AvatarImage
                        src={image}
                        className="object-contain w-full rounded-xl"
                        alt={props.product.name}
                        loading="lazy"
                      />
                      <AvatarFallback className="h-[25rem] rounded-lg">Loading...</AvatarFallback>
                    </Avatar>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="flex flex-col h-full justify-center gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-8 text-slate-600">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-2xl font-medium">{props.product.name}</p>
                  <p className="cursor-default text-sm font-medium">{props.product.categoryNm}</p>
                </div>
                <div>
                  <Badge variant={'destructive'} className="rounded-sm">
                    {`\u20B9` + ' ' + indianPrice.format(price)}
                  </Badge>
                </div>
              </div>
              <p className="text-xl font-medium">{props.product.description}</p>
            </div>
            <Separator />
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div>
              <div className="flex gap-4 items-center px-4 md:border rounded-lg h-full">
                <button
                  disabled={formik.values.quantity <= 0}
                  onClick={() => formik.setValues((prevQty) => ({ quantity: prevQty.quantity - 1 }))}
                >
                  <Minus className="w-4" />
                </button>
                <span className="cursor-default">{formik.values.quantity}</span>
                <button onClick={() => formik.setValues((prevQty) => ({ quantity: prevQty.quantity + 1 }))}>
                  <Plus className="w-4" />
                </button>
              </div>
            </div>
            <Button
              disabled={props.cartProdDetailData.cartData === undefined ? false : !formik.dirty}
              size={'lg'}
              type="submit"
              className="flex gap-4 items-center"
              onClick={formik.submitForm || updateAddCartIsPending || addToCartIsPending}
            >
              {addToCartIsPending || updateAddCartIsPending ? <Spinner /> : <ShoppingCart className="w-4" />}
              <span>{props.cartProdDetailData?.cartData === undefined ? 'Add to cart' : 'Update to cart'}</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
