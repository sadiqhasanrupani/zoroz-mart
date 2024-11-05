import clsx, { ClassValue } from "clsx";
import { Loader2 } from "lucide-react";
import { twMerge } from "tailwind-merge";

export const Icons = {
  spinner: Loader2,
};

export type SpinnerProps = {
  className?: string;
};

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Spinner: React.FC<SpinnerProps> = ({ className }) => {
  return <Icons.spinner className={cn(`h-5 w-5 animate-spin`, className)} />;
};

export default Spinner;
