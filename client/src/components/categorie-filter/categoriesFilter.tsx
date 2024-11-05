import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

//^ http request
import { getProductCategoriesHandler } from '@/http/get';
import { GetProductCategoriesRes } from '@/http/get/types';

//^ redux actions
import { productActions } from '@/store/slice/product-slice';

//^ component
import ErrorAlert from '../error-message';
import DropDown, { Options } from '../ui-component/dropdown/DropDown';

type CategoryFilterProps = React.HTMLAttributes<HTMLDivElement>;

export default function CategoriesFilter(props: CategoryFilterProps) {
  const [prodCategoriesOpt, setProdCategoriesOpt] = useState<Options>();
  const [prodCategoryValue, setProdCategoryValue] = useState<number | null>();

  const dispatch = useDispatch();

  //^ get product category query function
  const {
    data: productCategoriesData,
    isLoading: productCategoriesIsLoading,
    isRefetching: _productCategoriesIsRefetching,
    isError: productCategoriesIsError,
    error: productCategoriesError,
    refetch: productCategoriesRefetch,
  } = useQuery<GetProductCategoriesRes, any>({
    queryKey: ['get-product-categories'],
    queryFn: ({ signal }) => getProductCategoriesHandler({ signal }),
    gcTime: 0,
    staleTime: Infinity,
  });
  useEffect(() => {
    if (!productCategoriesIsLoading) {
      const productCategoriesOptions = productCategoriesData?.productCategories.map((prodCategory) => ({
        label: prodCategory.name,
        value: prodCategory.id,
      }));
      productCategoriesOptions?.push({ label: 'All', value: 0 });

      setProdCategoriesOpt(productCategoriesOptions);
    }
  }, [productCategoriesData, productCategoriesIsLoading]);

  const handleCategoriesDropDown = useCallback(
    (value?: string | number) => {
      if (typeof value === 'number') {
        if (!productCategoriesIsLoading) {
          if (value !== 0) {
            dispatch(productActions.addProdCategoryId(value));
          } else {
            dispatch(productActions.addProdCategoryId(undefined));
          }

          setProdCategoryValue(value);
        }
      }
    },
    [prodCategoryValue, productCategoriesIsLoading],
  );

  return (
    <>
      {productCategoriesIsError && (
        <ErrorAlert
          title={`Error code: ${productCategoriesError?.code || 500}`}
          subTitle={`Message: ${
            productCategoriesError?.info?.error?.message
              ? productCategoriesError?.info?.error?.message
              : (productCategoriesError?.info && productCategoriesError?.info?.message) || 'Something went wrong'
          }`}
          onConformed={() => {
            productCategoriesRefetch();
          }}
          clg={productCategoriesError?.info}
        />
      )}
      <div {...props}>
        <DropDown
          onDropDown={handleCategoriesDropDown}
          value={prodCategoryValue as number}
          options={prodCategoriesOpt}
          label="Select Category"
          commandClassName="h-full"
          placeholder="Search Category"
        />
      </div>
    </>
  );
}
