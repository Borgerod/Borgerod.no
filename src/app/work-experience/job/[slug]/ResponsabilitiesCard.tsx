"use client";
import { JobItem } from "@/lib/types";
import { Card, cn, Separator } from "@heroui/react";
import { BentoBoxBuilder, BentoRow } from "./BentoBoxBuilder";
import BentoCard from "./BentoCard";

export default function ResponsibilitiesCard({
  job,
  respCardLayout,
}: {
  job: JobItem;
  isLongLayout?: boolean;
  respCardLayout: string;
}) {
  const isHalved = respCardLayout
    ? !respCardLayout.includes("col-span-2")
    : true;
  const rows: BentoRow[] = BentoBoxBuilder(job.responsibilities, isHalved);

  return (
    <Card
      className={cn(
        "bg-transparent md:bg-glass-white shadow-none md:shadow w-full h-full p-4",
        "rounded-none md:rounded-3xl",
        "border-none md:border",
        "shadow-none md:shadow",
        "md:glass",
        "md:glass-white",
        "m-0",
        "unset-glass",
        "md:glass",
        respCardLayout,
      )}
    >
      <Separator variant="tertiary" className="md:hidden" />
      <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>

      {rows.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className="grid gap-2 items-stretch h-full last:mb-0"
          style={{ gridTemplateColumns: row.gridTemplateColumns }}
        >
          {row.items.map((item, i) => {
            if (Array.isArray(item.span)) {
              // Nested group: vertical stack inside this column
              const nestedTexts = item.text as string[];
              return (
                <div key={i} className="grid grid-rows-1 gap-2 h-full">
                  {nestedTexts.map((text, idx) => (
                    <BentoCard key={idx} text={text} />
                  ))}
                </div>
              );
            }
            // Regular single cell
            return <BentoCard key={i} text={item.text as string} />;
          })}
        </div>
      ))}
    </Card>
  );
}
