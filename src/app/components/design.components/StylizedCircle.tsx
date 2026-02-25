import { cn } from "@/lib/utils";
import { Card } from "@heroui/react";
import { ComponentBaseProps } from "@/lib/types";

export default function StylizedCircle({ className }: ComponentBaseProps) {
  return (
    <Card
      className={cn(
        // "absolute",
        // "relative",
        "aspect-square",
        "w-full",
        "h-full",
        // "h-fit",
        // "w-fit",

        "max-w-fit",
        "max-h-fit",
        "max-w-80",
        "max-h-80",

        "min-w-0",
        "min-h-0",

        "rounded-full",
        "justify-self-center",
        "self-center",
        "bg-linear-to-r",
        "from-green-light",
        "to-green-dark",
        className,
        "",
        "",
      )}
    />
  );
}
