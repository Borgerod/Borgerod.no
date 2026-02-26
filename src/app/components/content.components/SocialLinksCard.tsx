import { ComponentBaseProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card } from "@heroui/react";

export default function COMPONENTNAME({ className }: ComponentBaseProps) {
  return (
    <Card
      id="social-links"
      className={cn(
        "bg-glass-black",
        "glass",

        className,

        "",
        "",
      )}
    ></Card>
  );
}
