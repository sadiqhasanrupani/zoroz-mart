import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

//^ http request
import { GetCartDataRes } from '@/http/get/types';
import { getAllCartsHandler } from '@/http/get';

//^ redux action
import { productActions } from '@/store/slice/product-slice';

//^ ui
import { columns } from './column';

//^ components
import DataTableSkeletonLoading from '@/components/ui-component/loading/skeleton-loading/data-table-skeleton-loading/DataTableSkeletonLoading';
import { DataTable } from './data-table';
import ErrorAlert from '@/components/error-message';

export function CartTable() {
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (!cartsIsLoading) {
      let sumOfPrices = 0.0;

      cartsData?.carts.forEach((cart) => {
        const cartPrice = parseFloat(cart.prodPrice) * cart.prodQty;

        sumOfPrices += cartPrice;
      });

      dispatch(productActions.addProdSubTotalHandler(sumOfPrices));
    }

    // eslint-disable-next-line
  }, [cartsData, cartsIsLoading]);

  return (
    <>
      {cartsIsError && (
        <ErrorAlert
          title={`Error code: ${cartsError?.code || 500}`}
          subTitle={`Message: ${
            cartsError?.info?.error?.message
              ? cartsError?.info?.error?.message
              : (cartsError?.info && cartsError?.info?.message) || 'Something went wrong'
          }`}
          onConformed={() => {
            cartsRefetch();
          }}
          clg={cartsError?.info}
        />
      )}
      <div className="w-full">
        {cartsIsLoading ? (
          <DataTableSkeletonLoading />
        ) : (
          <>
            <DataTable columns={columns} data={cartsData?.carts || []} />
          </>
        )}
      </div>
    </>
  );
}
