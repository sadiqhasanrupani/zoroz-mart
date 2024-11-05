import { ShoppingCart } from 'lucide-react';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import { AppUseSelector } from '@/store';

//^ shadcn ui
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

//^ table
import { CartTable } from '@/table/table';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  const navigate = useNavigate();
  const totalItems = AppUseSelector((state) => state.product.cartCount);
  const subTotalPrice = AppUseSelector((state) => state.product.productSubTotalPrice);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr,0.7fr] items-start gap-7">
      <Card className="relative">
        <CardHeader>
          <CardTitle className="flex gap-2 items-center text-xl text-slate-600">
            <span>Shopping Cart</span>
            <span>
              <ShoppingCart className="w-6" />
            </span>
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-5">
          <CardDescription className="flex flex-col">
            <CartTable />
            <Separator className="mb-5" />
            <div className="flex justify-between items-center">
              <div className="flex justify-end items-center gap-2">
                <p className="text-lg">{`Subtotal (${totalItems} ${totalItems > 1 ? 'items' : 'item'}):`}</p>
                <p className="font-bold text-lg">{`\u20B9${subTotalPrice}`}</p>
              </div>
              <Button size={'lg'} onClick={() => navigate('/checkout')} disabled={subTotalPrice === 0}>
                Proceed to buy
              </Button>
            </div>
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
      <Card className="rounded-lg max-h-[10rem] h-full w-full">
        <CardContent className="pt-5 h-full">
          <CardDescription className="flex flex-col justify-between h-full">
            <div className="flex justify-between items-center gap-2">
              <p className="text-lg whitespace-nowrap">{`Subtotal (${totalItems} ${totalItems > 1 ? 'items' : 'item'}):`}</p>
              <p className="font-bold text-lg">{`\u20B9${subTotalPrice}`}</p>
            </div>
            <Button size={'lg'} onClick={() => navigate('/checkout')} disabled={subTotalPrice === 0}>
              Checkout
            </Button>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
