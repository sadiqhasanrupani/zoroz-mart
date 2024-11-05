import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

type ProductImage = {
  prodName: string;
  prodId: number;
  image: string;
};

export default function ProductImage(props: ProductImage) {
  const navigate = useNavigate();

  return (
    <Avatar className="w-[20rem] h-[15rem] rounded-xl cursor-pointer" onClick={() => navigate(`/product-details/${props.prodId}`)}>
      <AvatarImage src={props.image} className="object-contain w-[20rem]" alt={props.prodName} loading="lazy" />
      <AvatarFallback className="h-[15rem] rounded-none">Loading...</AvatarFallback>
    </Avatar>
  );
}
