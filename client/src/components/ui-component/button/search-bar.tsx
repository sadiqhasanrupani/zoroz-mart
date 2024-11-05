import React from "react";
import { Search } from "lucide-react";

//^ Shad cn
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  searchPlaceHolder?: string | React.ReactNode;
} & ButtonProps;

const SearchBar: React.FC<SearchBarProps> = (props) => {
  return (
    <>
      <Button
        inputMode="search"
        type="button"
        variant={"outline"}
        className={cn(`w-full rounded-xl h-10 flex gap-2 justify-start text-slate-500 ${props.className}`)}
        {...props}
      >
        <span>
          <Search className="w-4" />
        </span>
        <span className="w-full">{props.searchPlaceHolder || "Search..."}</span>
      </Button>
    </>
  );
};

export default SearchBar;
