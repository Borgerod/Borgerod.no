import { Card } from "@heroui/react";
import { cn } from "@heroui/styles";
import { ReactNode } from "react";
/* CAN BE DELETED */
export default function GlassCard(className: string, children: ReactNode) {
  <Card
    className={cn(
      "p-3 h-auto w-fit",
      // "w-[calc(100%-8px)]",
      //  "h-50 w-50",
      "flex",
      "items-center",
      "justify-between",
      // GLASS
      "shadow-sm",
      "justify-self-center",
      "self-center",
      "relative",
      "rounded-3xl",
      "backdrop-blur-xl",
      "max-w-7xl mx-auto border-0 bg-container sm:p-2.5 lg:p-2",
      "border border-border/20 border-t-border/40 border-l-border/40",
      "before:bg-white/10",
      "bg-background/10",
      "backdrop-saturate-150",
      "outline-1",
      "outline-outline/20 -outline-offset-1",
      "border",
      className,
    )}
    variant="transparent"
  >
    {children}
  </Card>;
}
