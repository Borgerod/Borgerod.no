import { ComponentBaseProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card } from "@heroui/react";

export default function WorkHistoryCard({ className }: ComponentBaseProps) {
  return (
    <Card
      id="word-history"
      className={cn(
        "self-end",
        "bg-green-base/80",
        "h-45",
        "w-full",
        // "bg-linear-to-r",
        "bg-radial",
        // "from-green-light/50",
        // "to-green-dark/50",
        "to-green-light/50",
        "from-green-dark/50",
        // "bg-radial-[at_15%_15%] from-green-light/50 to-green-dark/50 to-75%",
        "bg-radial-[at_30%_10%] from-green-light-2/50 to-green-dark-2/50 to-75%",

        className,
      )}
    ></Card>
  );
}
