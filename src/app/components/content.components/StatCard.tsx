import { cn } from "@/lib/utils";
import { Card } from "@heroui/react";
import { ComponentBaseProps } from "@/lib/types";

export default function StatCard({ className }: ComponentBaseProps) {
  return (
    <Card
      id="stats-card"
      className={cn(
        "bg-green-100",

        className,
      )}
    ></Card>
  );
}
