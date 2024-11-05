import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { LogOut, ShoppingCart } from 'lucide-react';

//^ lib
import { cn, makeInitial } from '@/lib/utils';

//^ http request
import { getAllProductsHandler, getUserHandler } from '@/http/get';
import { GetProductsRes, GetUserRes, Products } from '@/http/get/types';

//^ shadcn-ui
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

//^ ui-component
import ErrorAlert from '@/components/error-message';
import SearchBar from '@/components/ui-component/button/search-bar';
import CategoriesFilter from '@/components/categorie-filter/categoriesFilter';
import ShowCart from '@/components/cart/show-cart/ShowCart';

type SearchMenuProps = {
  productItems: Products;
} & React.HTMLAttributes<HTMLDivElement>;

export function CommandMenu(props: SearchMenuProps) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const productFilteredList = (props.productItems as any).reduce((acc: any, product: any) => {
    const categoryIndex: any = acc.findIndex((item: any) => item.categoryNm === product.categoryNm);
    if (categoryIndex !== -1) {
      acc[categoryIndex].categoryWiseData.push({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        prodImages: product.prodImages,
      });
    } else {
      acc.push({
        categoryNm: product.categoryNm,
        categoryWiseData: [
          {
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            prodImages: product.prodImages,
          },
        ],
      });
    }
    return acc;
  }, []);

  return (
    <>
      <div className={cn('text-sm text-muted-foreground', props.className)}>
        <SearchBar
          onClick={() => setOpen((open) => !open)}
          className="w-[15rem] justify-start gap-2 rounded-lg h-[2.5rem]"
          searchPlaceHolder={
            <div className="flex w-full justify-between">
              <span>Search...</span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">CTRL</span>
                {' + '}K
              </kbd>
            </div>
          }
        />
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type product name..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {props.productItems && props.productItems.length > 0 ? (
            <>
              {productFilteredList.map((prodFilteredList: any, index: number) => {
                return (
                  <React.Fragment key={index}>
                    <CommandGroup heading={prodFilteredList.categoryNm}>
                      {prodFilteredList.categoryWiseData.map((subList: any, index: number) => {
                        return (
                          <CommandItem
                            key={index}
                            onSelect={() => {
                              setOpen(false);
                              navigate(`/product-details/${subList.id}`);
                            }}
                          >
                            {subList.name}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                    <CommandSeparator />
                  </React.Fragment>
                );
              })}
            </>
          ) : null}
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default function Header() {
  const navigate = useNavigate();

  const {
    data: getUserData,
    isLoading: getUserIsLoading,
    isRefetching: getUserIsRefetching,
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
    data: allProductData,
    isError: allProductIsError,
    error: allProductError,
    refetch: allProductRefetch,
  } = useQuery<GetProductsRes, any>({
    queryKey: ['get-all-product'],
    queryFn: ({ signal }) => getAllProductsHandler({ signal }),
    staleTime: Infinity,
  });

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate('/login');
  };

  return (
    <>
      {getUserIsError && (
        <ErrorAlert
          title={`Error code: ${getUserError?.code || 500}`}
          subTitle={`Message: ${
            getUserError?.info?.error?.message
              ? getUserError?.info?.error?.message
              : (getUserError?.info && getUserError?.info?.message) || 'Something went wrong'
          }`}
          onConformed={() => {
            getUserRefetch();
          }}
          clg={getUserError?.info}
        />
      )}
      {allProductIsError && (
        <ErrorAlert
          title={`Error code: ${allProductError?.code || 500}`}
          subTitle={`Message: ${
            allProductError?.info?.error?.message
              ? allProductError?.info?.error?.message
              : (allProductError?.info && allProductError?.info?.message) || 'Something went wrong'
          }`}
          onConformed={() => {
            allProductRefetch();
          }}
          clg={allProductError?.info}
        />
      )}
      <Card className={'px-6 py-4 rounded-none w-full'} id="header">
        <div className="flex justify-between">
          <div className="flex gap-3 text-slate-600 items-center cursor-pointer" onClick={() => navigate('/')}>
            <ShoppingCart strokeWidth={2} className="w-8 h-8" />
            <p className="font-medium text-2xl protest-riot">Zoroz Mart</p>
          </div>
          <div className="flex gap-6 items-center">
            <CategoriesFilter className="hidden lg:block" />
            <CommandMenu className="hidden lg:block" productItems={allProductData?.products || []} />
            <ShowCart />

            {getUserIsLoading || getUserIsRefetching ? (
              <Skeleton className="w-12 h-12 rounded-full" />
            ) : (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger className="cursor-pointer" asChild>
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      className="object-cover"
                      src={getUserData?.userData.image as string}
                      alt={getUserData?.userData.name}
                    />
                    <AvatarFallback>{makeInitial(getUserData?.userData.name as string)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex gap-2 items-center text-slate-600">
                    <span>
                      <LogOut className="w-4" />
                    </span>
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </Card>
    </>
  );
}
