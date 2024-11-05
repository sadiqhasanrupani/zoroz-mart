import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function makeInitial(name: string) {
  if (!name || typeof name !== "string") {
    return "";
  }

  const words = name.split(" ");

  //^ Get the initial letter of the first word
  const firstInitial = words.length > 0 ? words[0].charAt(0) : "";

  //^ Get the initial letter of the last word
  const lastInitial = words.length > 1 ? words[words.length - 1].charAt(0) : "";

  //^ Combine the initial letters
  const initials = firstInitial + lastInitial;

  return initials;
}

export function shortenString(str: string, maxLen: number) {
  if (str.length <= maxLen) {
    return str;
  } else {
    return str.slice(0, maxLen - 1) + "...";
  }
}

export function loadScript(src: string) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}
