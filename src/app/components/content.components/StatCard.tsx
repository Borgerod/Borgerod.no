import { cn } from "@/lib/utils";
import { Card } from "@heroui/react";
import { ComponentBaseProps } from "@/lib/types";
import StylizedCircle from "../design.components/StylizedCircle";
import { ReactNode } from "react";
import Image from "next/image";
// function getContent(): ReactNode {
//   return (
//     <>
//       <h3 className="text-xm">MY NUMBERS</h3>

//       <div className="flex flex-row justify-start gap-5">
//         <div className="flex flex-col justify-start gap-0 h-fit">
//           <div className="flex flex-col">
//             <p className="text-xl">944</p>
//             <p className="text-xs">GitHub sm:leading-2.5 contributions</p>
//           </div>

//           <div className="flex flex-col">
//             <p className="text-xl">5+</p>
//             <p className="text-xs">Years sm:leading-2.5 experience</p>
//           </div>

//           <div className="flex flex-col">
//             <p className="text-xl">50</p>
//             <p className="text-xs">Leetcode sm:leading-2.5 submissions</p>
//           </div>
//         </div>

//         <div className="flex flex-col justify-start gap-0 h-fit">
//           <div className="flex flex-col">
//             <p className="text-xl">39</p>
//             <p className="text-xs">Repositories sm:leading-2.5</p>
//           </div>
//           <div className="flex flex-col">
//             <p className="text-xl">3+</p>
//             <p className="text-xs">Years sm:leading-2.5 as professional</p>
//           </div>
//           <div className="flex flex-col">
//             <p className="text-xl">Beats 61.7%</p>
//             <p className="text-xs">of sm:leading-2.5 other participants</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

function getContent(): ReactNode {
  return (
    <div
      className={cn(
        //* style
        "w-full",
        // "text-nowrap",
        "gap-x-1",
        "gap-y-3",

        // * grid
        "grid",
        "grid-rows-auto",
        "grid-cols-2",
        // "grid-cols-3",
        // "overflow-visible",
        "grid-rows-auto",
        // "text-nowrap",
        // "w-full",
        "",
        "",
      )}
    >
      <h3
        className={cn(
          //Style
          "text-xs",
          "font sm:leading-2.5-normal",

          //* Grid placement
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
        {/* <span className="text-xs leading-3 sm:leading-2.5">GitHub contributions</span> */}
      </div>
      <div className="grid grid-cols-subgrid gap-0 h-fit ">
        <span className="text-xl font-light text-primary sm:leading-none leading-none text-nowrap self-baseline ">
          39
        </span>
        <span className="text-xs leading-none sm:leading-2.5 ">
          Repositories
        </span>
        {/* <span className="text-xs leading-3 sm:leading-2.5">Repositories</span> */}
      </div>

      <div className="grid grid-cols-subgrid gap-0 h-fit ">
        <span className="text-xl font-light text-primary sm:leading-none leading-none text-nowrap self-baseline ">
          5+
        </span>
        <span className="text-xs leading-none sm:leading-2.5 ">
          Years experience
        </span>
        {/* <span className="text-xs leading-3 sm:leading-2.5">Years experience</span> */}
      </div>
      <div className="grid grid-cols-subgrid gap-0 h-fit ">
        <span className="text-xl font-light text-primary sm:leading-none leading-none text-nowrap self-baseline ">
          3+
        </span>
        <span className="text-xs leading-none sm:leading-2.5 ">
          Years as professional
        </span>
        {/* <span className="text-xs leading-3 sm:leading-2.5">Years as professional</span> */}
      </div>
      <div className="grid grid-cols-subgrid gap-0 h-fit ">
        <span className="text-xl font-light text-primary sm:leading-none leading-none text-nowrap self-baseline ">
          52
        </span>
        <span className="text-xs leading-none sm:leading-2.5 ">
          Leetcode submissions
        </span>
        {/* <span className="text-xs leading-3 sm:leading-2.5">Leetcode submissions</span> */}
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

      {/* <div className="grid grid-cols-subgrid gap-0 h-fit ">
        <span className="text-xl font-light text-primary sm:leading-none leading-none text-nowrap self-baseline">
          Beats 66.07%
        </span>
        <span className="text-xs leading-none sm:leading-2.5">of other participants</span>
      </div> */}
    </div>
  );
}
export default function StatCard({ className }: ComponentBaseProps) {
  return (
    // <Card
    //   id="stats-card"
    //   className={cn(
    //     "bg-white/50",
    //     "h-45",
    //     "w-full",

    //     className,
    //   )}
    // ></Card>

    <Card
      // disableInnerWrapper
      className={cn(
        "p-0",
        "pt-2",
        "shadow-none",
        // "m-0",
        // "rounded-2xl",
        "rounded-none",

        "text-black/10",
        "font-light",
        // "p-0",
        // "m-0",
        // "bg-transparent",
        "overflow-clip",
        "h-fit",
        "w-full",
        "h-full",
        "min-h-0",

        "grid",
        "grid-rows-auto",
        // "grid-cols-3",
        "grid-rows-1",
        "grid-cols-2",
        "grid-cols-[2fr_1fr]",
        // "grid-cols-[auto_1fr]",
        // "grid-cols-[1fr_auto]",
        // "grid-cols-2",
        // "[grid-template-areas:'stack']",
        // "grid-rows-[1fr]",
        // "grid-cols-[1fr]",
        // "place-items-center",
        // ---------------------
        "h-45",
        // "relative rounded-2xl    p-0 m-0 ",
        "w-full",

        //* STYLE
        // "p-2",
        "bg-white/50",
        "bg-transparent",
        // "text-black/50",
        // "text-default-100!", //todo: should not be like this
        // "text-eclipse",
        // "text-defult-100",
        "text-secondary",
        "font-light",
        className,
      )}
    >
      <StylizedCircle
        className={cn(
          //* STYLE
          "blur-xs",
          "aspect-square",
          "rounded-full",
          "bg-linear-to-br",
          // "place-self-end",
          "",
          // "translate-y-1/10",
          "opacity-90",
          // "filter",

          //* SIZE
          // "h-[80%]",
          "h-4/5",
          "h-2/3",
          "h-3/5",
          "w-fit",

          //* PLACEMENT
          "col-start-2",
          // "col-row-2",
          "row-start-1",

          "justify-self-start",
          "self-start",
          // "translate-x-1/3",
          // "-translate-y-1/8",
          // "translate-y-1/10",

          // "translate-x-3/6",
          // "translate-x-1/7",
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
          //* STYLE
          // "blur-xs",
          "aspect-square",
          // "rounded-full",
          "bg-linear-to-br",
          // "place-self-end",
          "",
          // "translate-y-1/10",
          "opacity-90",
          // "filter",

          //* SIZE
          // "h-[80%]",
          "h-2/6",
          // "h-fit",
          "w-fit",

          //* PLACEMENT
          "col-start-2",
          "row-start-1",

          "justify-self-center",
          "self-start",
          // "translate-x-1/3",
          "-translate-y-1/8",

          // "translate-x-3/6",

          "",
          "",
        )}
      />

      <div
        className={cn(
          // "[grid-area:stack] relative z-10 w-full h-full p-0 m-0",

          /* * grid placement * */
          "col-start-1",
          "row-start-1",
          // * grid position
          "col-start-1",
          "col-span-full",
          "row-start-1",
          "row-span-full",

          /* * grid * */
          "grid",

          // "", //temp
          // "bg-transparent", //temp
          // "text-secondary",
          "w-full h-full p-0 m-0",
        )}
      >
        {getContent()}
      </div>
    </Card>
  );
}
