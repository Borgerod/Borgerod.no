"use client";
import { JobItem } from "@/lib/types";
import { Card, cn } from "@heroui/react";
import Masonry from "react-masonry-css";
import { BentoBoxBuilder } from "./BentoBoxBulder";
import { useState } from "react";

export default function ResponsibilitiesCard({
  job,
  isLongLayout,
  respCardLayout,
}: {
  job: JobItem;
  isLongLayout?: boolean;
  respCardLayout: string;
}) {
  // const [tooBigForGrid, setTooBigForGrid] = useState<boolean>(() =>
  //   checkSizeOfArray(job.responsibilities),
  // );

  // function checkSizeOfArray(jobArray: string[]): boolean {
  //   /* checks the total string-length of the array and compares it to a set limit */
  //   const totalArrayLength = jobArray.reduce(
  //     (acc, curr) => acc + curr.length,
  //     0,
  //   );
  //   const lengthLimit = 600;
  //   return totalArrayLength > lengthLimit;
  // }

  const rows = BentoBoxBuilder(job.responsibilities);

  // checkSizeOfArray(job.responsibilities, setTooBigForGrid);
  // function checkSizeOfArray(  items: string[],

  return (
    <Card
      className={cn(
        //// "bg-transparent md:bg-glass-white shadow-none md:shadow md:glass md:glass-white w-full p-4 col-start-1 row-start-4 col-span-2",
        // // "md:col-start-2 md:row-start-4 col-start-1 row-start-5 col-span-2 md:col-span-1 w-full",
        // // isLongLayout
        // //   ? "" //
        // //   : "md:col-start-2 md:row-start-4 md:col-span-full",
        // // tooBigForGrid ? "" : "md:col-start-1 md:row-start-5 md:col-span-full",
        // // // : "max-w-2xl md:col-start-2 md:row-start-4 md:col-span-full",
        // // // ? "md:col-start-1 md:row-start-4 md:col-span-2 max-w-none"
        // // // : "max-w-2xl md:col-start-2 md:row-start-3 md:col-span-1",
        // // // : "",
        // // isLongLayout ? "" : "md:row-span-2",
        // // " md:w-full md:max-w-none",
        // // isLongLayout ? "md:row-span-2" : "w-full max-w-none",
        // // "col-start-1 row-start-4 col-span-2 md:col-start-2 md:row-start-4 md:col-span-1 md:row-span-1",

        //// "bg-transparent md:bg-glass-white shadow-none md:shadow md:glass md:glass-white max-w-2xl w-full",

        "bg-transparent md:bg-glass-white shadow-none md:shadow md:glass md:glass-white w-full h-full p-4",

        // " md:w-full md:max-w-none",
        respCardLayout,
        "",
        "",
      )}
    >
      {/* <h1
        className={cn("text-lg font-semibold mb-3", "", "")}
        // TEMP
      >
        respCardLayout: {respCardLayout}
      </h1> */}

      <h3 className={cn("text-lg font-semibold mb-3", "", "")}>
        responsibilities
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
        const totalSpan = row.reduce((acc, item) => acc + item.span, 0);

        return (
          <div
            key={rowIdx}
            className={cn(
              "grid grid-rows-1 gap-2 mb-2 items-start",
              colsClass[totalSpan],
              "",
            )}
          >
            {row.map((item, i) => (
              <Card
                key={i}
                className={cn(
                  "h-full rounded-xl flex justify-center items-center",
                  spanClass[item.span],
                  "",
                )}
              >
                {item.text}
              </Card>
            ))}
          </div>
        );
      })}
      {/* <Masonry
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
      </Masonry> */}
    </Card>
  );
}
