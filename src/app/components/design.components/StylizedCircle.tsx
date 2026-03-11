import { cn } from "@heroui/react";
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
        "max-h-full",
        "max-w-fit",
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
