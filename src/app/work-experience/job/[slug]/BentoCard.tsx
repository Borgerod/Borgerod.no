import { BentoItem } from "@/lib/types";
import { Card } from "@heroui/react";
import { cn } from "@heroui/styles";

export default function BentoCard(
  item: BentoItem,
  idx: number,
  span: string,
): React.ReactElement {
  return (
    <Card
      id="row-item box bento-box"
      key={idx}
      className={cn(
        "h-full rounded-xl flex justify-center items-center",
        span || "row-span-1",
        "text-center",
        "",
        "",
      )}
    >
      {Array.isArray(item.text) ? item.text[idx] : item.text}
    </Card>
  );
}
