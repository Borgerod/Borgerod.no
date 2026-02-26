import { ComponentBaseProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card } from "@heroui/react";

export default function COMPONENTNAME({ className }: ComponentBaseProps) {
  return (
    <Card
      id="project-display"
      className={cn(
        "glass",
        "glass-gray",

        className,
        "",
        "",
      )}
    ></Card>
  );
}
