import { useNavigate } from "react-router-dom";
import { ArrowUpFromDot } from "lucide-react";
import { motion } from "framer-motion";

//^ lib
import { shortenString } from "@/lib/utils";

//^ http types
import { Product } from "@/http/get/types";

//^ shadcn-ui
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ProductCard = {
  product: Product;
};

export default function ProductCard(props: ProductCard) {
  const navigate = useNavigate();

  const image = props.product?.prodImages as string[];
  const price = parseInt(props.product.price);
  const indianPrice = Intl.NumberFormat("en-IN");

  return (
    <motion.div>
      <Card className="min-h-[35rem] p-10 h-full">
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-6 justify-center">
            <div className="flex items-center justify-center">
              <Avatar
                className="w-full h-[15rem] rounded-xl border cursor-pointer"
                onClick={() => navigate(`product-details/${props.product.id}`)}
              >
                <AvatarImage src={image[0]} className="object-cover w-full" alt={props.product.name} loading="lazy" />
                <AvatarFallback className="h-[15rem] rounded-none">Loading...</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col gap-4 text-slate-600">
              <div className="flex flex-col">
                <p className="font-medium">{props.product.name}</p>
                <p>{"\u20B9" + indianPrice.format(price)}</p>
              </div>
              <p className="italic">{shortenString(props.product.description as string, 150)}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <Badge className="cursor-default">{props.product.categoryNm}</Badge>
            </div>
            <Button type="button" onClick={() => navigate(`product-details/${props.product.id}`)} variant={"link"}>
              <motion.div
                initial={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
                animate={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
                whileHover={{ scale: 1, opacity: 0.8, gap: "0.9rem" }}
              >
                <p>View Details</p>
                <span>
                  <ArrowUpFromDot className="rotate-90 w-4" />
                </span>
              </motion.div>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
