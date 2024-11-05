import { useNavigation } from "react-router-dom";

//^ ui-component
import Spinner from "@/components/ui-component/spinner/Spinner";

//^ component
import ProductDetail from "@/components/products-section/product-detail/ProductDetail";

export default function ProductDetailsPage() {
  const navigate = useNavigation();
  const isLoading = navigate.state === "loading";

  return <div>{isLoading ? <Spinner /> : <ProductDetail />}</div>;
}
