import { useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import Swal from 'sweetalert2';

//^ http request
import { deleteCartHandler } from '@/http/delete';
import { DeleteCartContext } from '@/http/delete/types';
import { queryClient } from '@/http';

//^ shadcn-ui
import { Button } from '@/components/ui/button';
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

type ActionsProps = {
  id: number;
};

export default function Actions(props: ActionsProps) {
  const {
    isPending: deleteCartIsPending,
    isError: deleteCartIsError,
    error: deleteCartError,
    mutate: deleteCartMutate,
    reset: deleteCartReset,
  } = useMutation<any, any, DeleteCartContext>({
    mutationKey: ['delete-cart'],
    mutationFn: deleteCartHandler,
    onSuccess: (data) => {
      toast.success('200', { description: data.message });
      deleteCartReset();
      queryClient.invalidateQueries({
        queryKey: ['get-cart-count'],
        exact: true,
        type: 'active',
      });

      queryClient.invalidateQueries(['get-all-shopping-carts'] as any);
    },
    onSettled: () => {
      Swal.close();
    },
  });

  const handleDeleteSwalPending = () => {
    if (deleteCartIsPending) {
      Swal.fire({
        title: `Cart deletion in progress...`,
        didOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.hideLoading();
        },
      });
    } else {
      Swal.close();
    }
  };

  useEffect(() => {
    handleDeleteSwalPending();
  }, [deleteCartIsPending]);

  return (
    <>
      {deleteCartIsError && (
        <>
          {() => deleteCartReset()}
          <ErrorAlert
            title={`Error code: ${deleteCartError?.code || 500}`}
            subTitle={`Message: ${
              deleteCartError?.info?.error?.message
                ? deleteCartError?.info?.error?.message
                : (deleteCartError?.info && deleteCartError?.info?.message) || 'Something went wrong'
            }`}
            onConformed={() => {
              deleteCartReset();
            }}
            clg={deleteCartError?.info}
          />
        </>
      )}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(props.id.toString())}>
            Copy Cart ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex gap-2 items-center" onClick={() => deleteCartMutate({ cartId: props.id })}>
            <span>
              <Trash2 className="w-4 text-red-500" />
            </span>
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
