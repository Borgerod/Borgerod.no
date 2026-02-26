import { ComponentBaseProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card } from "@heroui/react";

export default function ToolCard({ className }: ComponentBaseProps) {
  return (
    <Card
      id="tools"
      className={cn(
        "glass",
        "glass-white",
        className,

        "",
        "",
      )}
    ></Card>
  );
}
