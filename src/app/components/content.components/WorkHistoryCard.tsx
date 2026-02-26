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
        "bg-radial",
        // "to-green-light/50",
        // "from-green-dark/50",
        "bg-green-base/20",
        "bg-radial-[at_30%_10%] from-green-light-2/50 to-green-dark-2/50 to-75%",

        // "bg-glass-green-base/10",
        // "bg-radial-[at_30%_10%] from-glass-green-light-2/80 to-glass-green-dark-2/80 to-75%",

        "bg-glass-green-base",
        "bg-radial-[at_30%_10%] from-glass-green-light-2 to-glass-green-dark-2 to-75%",

        "backdrop-saturate-80!",
        className,
      )}
    ></Card>
  );
}
