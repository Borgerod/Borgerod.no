"use client";
import { JobItem } from "@/lib/types";
import { Card, cn, Separator } from "@heroui/react";
import { BentoBoxBuilder } from "./BentoBoxBuilder";
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
  const rows = BentoBoxBuilder(job.responsibilities, isHalved);

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
        "",
        "",
      )}
    >
      <Separator variant="tertiary" className="md:hidden" />
      <h3 className={cn("text-lg font-semibold mb-3", "", "")}>
        Responsibilities
      </h3>
      {rows.map((row, rowIdx) => {
        const spanClass: Record<number, string> = {
          1: "col-span-1",
          2: "col-span-2",
          3: "col-span-3",
          4: "col-span-4",
        };
        const colsClass: Record<number, string> = {
          1: "grid-cols-1",
          2: "grid-cols-2",
          3: "grid-cols-3",
          4: "grid-cols-4",
        };
        const rowsClass: Record<number, string> = {
          1: "grid-rows-1",
          2: "grid-rows-2",
          3: "grid-rows-3",
          4: "grid-rows-4",
          5: "grid-rows-5",
          6: "grid-rows-6",
        };
        const rowSpanClass: Record<number, string> = {
          1: "row-span-1",
          2: "row-span-2",
          3: "row-span-3",
          4: "row-span-4",
        };

        const totalSpan = row.reduce(
          (acc, item) => acc + (Array.isArray(item.span) ? 1 : item.span),
          0,
        );

        return (
          <div
            key={rowIdx}
            className={cn(
              "grid grid-rows-1 gap-2 items-stretch",
              colsClass[totalSpan],
              "h-full",
              "",
            )}
          >
            {row.map((item, i) => {
              if (Array.isArray(item.span)) {
                return (
                  <div
                    id="row bento-box"
                    key={i}
                    className={cn(
                      "col-span-1 grid grid-cols-1 gap-2",
                      rowsClass[item.span.length] || "grid-rows-1",
                      "h-full",
                      "",
                      "",
                      "",
                    )}
                  >
                    {item.span.map((subSpan, subIdx) =>
                      BentoCard(item, subIdx, rowSpanClass[subSpan]),
                    )}
                  </div>
                );
              }

              return BentoCard(item, i, spanClass[item.span]);
            })}
          </div>
        );
      })}
    </Card>
  );
}
