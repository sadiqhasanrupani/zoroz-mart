import { ColumnDef } from "@tanstack/react-table";

//^ shadcn-ui
import { Checkbox } from "@/components/ui/checkbox";
import Actions from "./actions";
import ProductImage from "./comp/ProductImage";

export type CartTable = {
  id: number;
  prodId: number;
  prodName: string;
  prodImg: string[];
  prodQty: string;
  prodPrice: string;
  isCheck: boolean;
};

export const columns: ColumnDef<CartTable>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(!!value);
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => {
      const isCheck = row.original.isCheck;

      return (
        <Checkbox
          checked={isCheck || row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "prodImg",
    header: () => {
      return (
        <div className="w-[20rem]">
          <p>Image</p>
        </div>
      );
    },
    cell: ({ row }) => {
      const image = row.original.prodImg[0];

      return <ProductImage image={image} prodId={row.original.prodId} prodName={row.original.prodName} />;
    },
  },
  {
    accessorKey: "prodName",
    header: "Product Name",
  },
  {
    accessorKey: "prodQty",
    header: "Quantity",
  },
  {
    accessorKey: "prodPrice",
    header: "Price",
    cell: ({ row }) => {
      const price = row.original.prodPrice;

      return <p>{`\u20B9 ${price}`}</p>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <Actions id={row.original.id} />;
    },
  },
];
