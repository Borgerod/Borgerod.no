import { cn } from "@/lib/utils";
import { Card } from "@heroui/react";
import { ComponentBaseProps } from "@/lib/types";

export default function StatCard({ className }: ComponentBaseProps) {
  return (
    <Card
      id="stats-card"
      className={cn(
        "bg-green-100",

        /* * grid placement * */
        "col-start-2",
        "col-span-1",
        "row-start-",
        "row-span-1",
        "",
      )}
    ></Card>
  );
}
