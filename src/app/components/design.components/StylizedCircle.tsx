import { cn } from "@/lib/utils";
import { Card } from "@heroui/react";
import { ComponentBaseProps } from "@/lib/types";

export default function StylizedCircle({ className }: ComponentBaseProps) {
  return (
    <Card
      className={cn(
        "aspect-square",

        "w-full",
        "h-full",
        "min-w-0",
        "min-h-0",
        // "max-w-80",
        // "max-h-80",
        "max-h-full",
        "max-w-fit",
        // "max-w-full",
        // "max-h-80",

        "rounded-full",
        "justify-self-center",
        "self-center",

        "bg-linear-to-b",
        "from-glass-green-light",
        "to-glass-green-dark",

        className,
      )}
    />
  );
}
