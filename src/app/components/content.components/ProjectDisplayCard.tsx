import { ComponentBaseProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card } from "@heroui/react";

export default function COMPONENTNAME({ className }: ComponentBaseProps) {
  return (
    <Card
      id="project-display"
      className={cn(
        "bg-gray-400",

        className,
        "",
        "",
      )}
    ></Card>
  );
}
