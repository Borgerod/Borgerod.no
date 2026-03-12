import { cn } from "@heroui/react";
import { Card } from "@heroui/react";
import { ComponentBaseProps } from "@/lib/types";
import StylizedCircle from "../design.components/StylizedCircle";
import { ReactNode } from "react";
import Image from "next/image";

function getContent(): ReactNode {
  return (
    <div
      className={cn(
        /* * placement */
        "w-full",
        "gap-x-1",
        "gap-y-3",

        /* * grid */
        "grid",
        "grid-rows-auto",
        "grid-cols-2",
        "grid-rows-auto",
        "",
        "",
      )}
    >
      <h3
        className={cn(
          /* * style */
          "text-xs",
          "font sm:leading-2.5-normal",

          /* * grid placement */
          "col-start-1",
          "col-span-full",
        )}
      >
        MY NUMBERS
      </h3>

      <div className="grid grid-cols-subgrid gap-0 h-fit ">
        {/* TODO: Make api's for these stats */}
        <span className="text-xl font-light text-primary sm:leading-none leading-none text-nowrap self-baseline ">
          944
        </span>
        <span className="text-xs leading-none sm:leading-2.5 ">
          GitHub contributions
        </span>
      </div>
      <div className="grid grid-cols-subgrid gap-0 h-fit ">
        <span className="text-xl font-light text-primary sm:leading-none leading-none text-nowrap self-baseline ">
          39
        </span>
        <span className="text-xs leading-none sm:leading-2.5 ">
          Repositories
        </span>
      </div>

      <div className="grid grid-cols-subgrid gap-0 h-fit ">
        <span className="text-xl font-light text-primary sm:leading-none leading-none text-nowrap self-baseline ">
          5+
        </span>
        <span className="text-xs leading-none sm:leading-2.5 ">
          Years experience
        </span>
      </div>
      <div className="grid grid-cols-subgrid gap-0 h-fit ">
        <span className="text-xl font-light text-primary sm:leading-none leading-none text-nowrap self-baseline ">
          3+
        </span>
        <span className="text-xs leading-none sm:leading-2.5 ">
          Years as professional
        </span>
      </div>
      <div className="grid grid-cols-subgrid gap-0 h-fit ">
        <span className="text-xl font-light text-primary sm:leading-none leading-none text-nowrap self-baseline ">
          52
        </span>
        <span className="text-xs leading-none sm:leading-2.5 ">
          Leetcode submissions
        </span>
      </div>

      <div className="grid grid-cols-subgrid gap-0 h-fit ">
        <span className="text-xs   leading-none sm:leading-2.5 text-nowrap self-baseline">
          Beats{" "}
          <span className="text-xl font-light text-primary sm:leading-none leading-none text-nowrap self-baseline">
            66.07% {/* (easy only) */}
            {/* 59.88% (all difficulties) */}
          </span>
        </span>
        <span className="text-xs leading-none sm:leading-2.5 ">
          of other participants
        </span>
      </div>
    </div>
  );
}
export default function StatCard({ className }: ComponentBaseProps) {
  return (
    <Card
      className={cn(
        /* * style */
        "bg-transparent",
        "text-secondary",
        "font-light",
        "p-0",
        "pt-2",
        "shadow-none",
        "rounded-none",
        "font-light",
        "overflow-clip",
        "h-fit",
        "w-full",
        "h-full",
        "min-h-0",

        /* * grid */
        "grid",
        "grid-rows-auto",
        "grid-rows-1",
        "grid-cols-2",
        "grid-cols-[2fr_1fr]",
        "h-45",
        "w-full",

        className,
      )}
    >
      <StylizedCircle
        className={cn(
          /* * placement */
          "blur-xs",
          "aspect-square",
          "rounded-full",
          "bg-linear-to-br",
          "",
          "opacity-90",

          /* * size */
          "h-4/5",
          "h-2/3",
          "h-3/5",
          "w-fit",

          /* * placement */
          "col-start-2",
          "row-start-1",
          "justify-self-start",
          "self-start",
          "translate-x-1/5",
          "",
          "",
        )}
      />

      <Image
        src="/assets/images/ab_logo_demo.png"
        width={500}
        height={500}
        alt="Picture of the author"
        className={cn(
          /* * style */
          "aspect-square",
          "bg-linear-to-br",
          "opacity-90",

          /* * size */
          "h-2/6",
          "w-fit",

          /* * placement */
          "col-start-2",
          "row-start-1",

          "justify-self-center",
          "self-start",
          "-translate-y-1/8",
          "",
          "",
        )}
      />

      <div
        className={cn(
          /* * style */
          "w-full h-full p-0 m-0",

          /* * grid placement */
          "col-start-1",
          "row-start-1",

          // * grid position
          "col-start-1",
          "col-span-full",
          "row-start-1",
          "row-span-full",

          /* * grid * */
          "grid",
        )}
      >
        {getContent()}
      </div>
    </Card>
  );
}
