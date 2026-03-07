"use client";
import { JobItem } from "@/lib/types";
import { Card, cn } from "@heroui/react";
import Masonry from "react-masonry-css";

export default function AchievementsCard({
  job,
  isLongLayout,
}: {
  job: JobItem;
  isLongLayout?: boolean;
}) {
  const items = job.achievements.map((achievement, index) => ({
    id: index + 1,
    name: achievement,
  }));

  const rows: (typeof items)[] = [];
  const unplaced = [...items];

  while (unplaced.length > 0) {
    const currentRow: typeof items = [];
    let currentRowWeight = 0;

    for (let i = 0; i < unplaced.length; i++) {
      const item = unplaced[i];
      let weight = 1;

      if (item.name.length >= 120) {
        weight = 4;
      } else if (item.name.length >= 35) {
        weight = 2;
      }

      if (currentRowWeight + weight <= 4) {
        currentRow.push(item);
        currentRowWeight += weight;
        unplaced.splice(i, 1);
        i--;
      }
    }

    if (currentRow.length > 0) {
      rows.push(currentRow);
    }
  }

  return (
    <Card
      className={cn(
        "bg-transparent md:bg-glass-white shadow-none md:shadow md:glass md:glass-white w-full p-4 col-start-1 row-start-4 col-span-2",
        isLongLayout
          ? "md:col-start-1 md:row-start-4 md:col-span-2 max-w-none"
          : "max-w-2xl md:col-start-2 md:row-start-3 md:col-span-1",
        "",
        "",
      )}
    >
      <h3 className={cn("text-lg font-semibold mb-3", "", "")}>Achievements</h3>
      <Masonry
        breakpointCols={1}
        className={cn("flex w-auto flex-col", "", "") as string}
      >
        {rows.map((row, rowIdx) => {
          const gridColsClass =
            row.length === 1
              ? "grid-cols-[auto]"
              : row.length === 2
                ? "grid-cols-[auto_auto]"
                : "grid-cols-[auto_auto_auto]";

          return (
            <div
              key={rowIdx}
              className={cn(
                `grid grid-rows-1 ${gridColsClass} gap-2 mb-2 items-stretch`,
                "",
                "",
              )}
            >
              {row.map((item) => (
                <Card
                  key={item.id}
                  className={cn(
                    "w-full h-full rounded-xl  flex justify-center items-center",
                    "",
                    "",
                  )}
                >
                  {item.name}
                </Card>
              ))}
            </div>
          );
        })}
      </Masonry>
    </Card>
  );
}
