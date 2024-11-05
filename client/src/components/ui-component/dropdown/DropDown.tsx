import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

//^ lib
import { cn } from "@/lib/utils";
import { shortenString } from "@/lib/utils";

//^ shadcn-ui
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

//^ types
export type Options = {
  value: number | string;
  label: string | React.ReactNode;
}[];
type OnComboBox = (value: string | number | undefined) => void;
export type Side = "bottom" | "left" | "right" | "top";
export type DropDownProps = {
  options?: Options;
  label?: string;
  className?: string;
  defaultValue?: string;
  id?: string;
  onDropDown: OnComboBox;
  commandClassName?: string;
  value?: string | number;
  placeholder?: string;
  noFoundText?: string;
  side?: Side;
} & React.RefAttributes<HTMLButtonElement>;

const DropDown = React.forwardRef<HTMLButtonElement, DropDownProps>((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<number | string>(props.value || "");

  React.useEffect(() => {
    props.onDropDown(value);
  }, [value]);

  React.useEffect(() => {
    setValue(props.value || "");
  }, [props.value]);

  const popoverTriggerRef = ref || React.createRef<HTMLButtonElement>();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger ref={popoverTriggerRef} asChild>
        <Button
          ref={popoverTriggerRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(`w-[200px] justify-between overflow-hidden h-full`, [props.className, props.commandClassName])}
        >
          {shortenString(typeof value === "string" ? value : value.toString(), 2)
            ? props.options?.find((framework) => framework.value === value)?.label
            : `${props.label}`}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" side={props.side || "bottom"} className={cn(`w-full p-0 ${props.className}`)}>
        <Command className="max-h-[20rem]">
          <CommandInput placeholder={`${props.placeholder || "Search items"}`} className="h-9" />
          <CommandEmpty>{props.noFoundText || "not found"}</CommandEmpty>
          <CommandGroup className="overflow-y-auto">
            {props.options?.map((framework) => {
              return (
                <CommandItem
                  className="flex justify-between gap-2 w-full"
                  id={props.id}
                  key={framework.value}
                  value={framework.value as any}
                  onSelect={() => {
                    setValue(framework.value);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <CheckIcon
                    className={cn("ml-auto h-4 w-4", value === framework.value ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
});

export default DropDown;
