import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { Info } from "lucide-react";

import { cn } from "@/lib/utils";

// shadcn
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export enum InputType {
  text = "text",
  number = "number",
  email = "email",
  password = "password",
  date = "date",
  checkbox = "checkbox",
  radio = "radio",
  select = "select",
  file = "file",
  textarea = "textarea",
  url = "url",
  color = "color",
  range = "range",
  search = "search",
  tel = "tel",
  time = "time",
}

export type TextFieldProps = {
  label?: string;
  htmlFor?: string;
  type?: keyof typeof InputType;
  labelClassName?: string;
  className?: string;
  inputClassName?: string;
  hasError?: boolean;
  errorMessage?: string | ReactNode;
  value?: string | number;
  disabled?: boolean;
  required?: boolean;
  info?: ReactNode | string;
  name?: string;
} & HTMLAttributes<HTMLInputElement>;

const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  return (
    <div className={cn(`flex flex-col ${props.required ? "gap-1" : "gap-3"} ${props.className}`)}>
      {props.label && (
        <Label htmlFor={props.htmlFor} className={props.labelClassName}>
          <span className="flex gap-2 items-center">
            <span className="flex gap-1 items-center">
              {props.label} {props.required && <span className="text-red-500 text-base">*</span>}
            </span>
            {props.info && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 text-slate-600" />
                  </TooltipTrigger>
                  <TooltipContent align="start" side="bottom" className="w-[15rem]">
                    <p>{props.info}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </span>
        </Label>
      )}
      <div className={`flex flex-col justify-between h-full gap-1`}>
        <Input
          ref={ref}
          disabled={props.disabled}
          required={props.required}
          type={props.type}
          placeholder={props["aria-placeholder"]}
          id={props.htmlFor}
          onChange={props.onChange}
          onBlur={props.onBlur}
          value={props.value}
          className={cn(
            `${props.inputClassName} ${
              props.hasError
                ? "border border-red-500 placeholder:text-red-500 text-red-500 focus-visible:ring-red-500"
                : ""
            }`
          )}
          name={props.name}
          {...props}
        />
        {props.hasError ? <p className="text-xs text-red-500">{props.errorMessage}</p> : ""}
      </div>
    </div>
  );
});

export default TextField;
