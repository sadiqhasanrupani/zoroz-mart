import React from "react";
import { motion } from "framer-motion";

//^ http request
import { Products } from "@/http/get/types";

//^ component
import ProductCard from "./product-card/ProductCard";

type ProductsSectionProps = {
  products: Products;
};

export default function ProductsSection(props: ProductsSectionProps) {
  return (
    <motion.div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {props.products.map((product, index) => {
        return (
          <React.Fragment key={index}>
            <ProductCard product={product} />
          </React.Fragment>
        );
      })}
    </motion.div>
  );
}
