"use client";
import { ComponentBaseProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card } from "@heroui/react";
import { ReactNode } from "react";
import StylizedCircle from "../design.components/StylizedCircle";
// import { useRouter } from "next/navigation";

interface GlassParentCardProps extends ComponentBaseProps {
  children: ReactNode;
  id?: string;
}

export default function GlassParentCardCard({
  className,
  children,
  id,
  ...props
}: GlassParentCardProps) {
  // const circleDiameter = 60;
  // const circleRadius = Math.round(circleDiameter / 2);
  // const rectangleHeight = Math.round((circleDiameter * 2) / 3);
  // const rectangleWidth = Math.round((((circleDiameter * 16) / 9) * 2) / 3);
  // const router = useRouter();

  /*  
    This is a special parent-container that has a overlay on top of it. 
    The overlay is a an ideltical sized card that sits on top of parent, 
    which will contain all of the "visual-styling", including (most importantly) the 'glass-effect'.
    
    purpose: prevents backdrop-blur issue where glass-children of glass-parents loose their glass-effects () 
  */

  return (
    <Card
      id={id}
      className={cn(
        "h-full",
        "w-full",
        "overflow-visible",
        "bg-transparent",

        /* * grid placement* */
        "col-start-1",
        "col-span-1",
        "min-h-100",
        "min-h-130",
        //  "-left-5",
        className,

        // "h-full!",
        // "max-h-full",
        "py-5",
        // "w-140",
        "",
        "",
      )}
      {...props}
    >
      <Card
        /*
        SOLUTION TO BUG-[1.1]
        created an empty copy of ProfilePage on undeaneath GlassParentCard

        */
        id="profile-card visual-underlay"
        className={cn(
          "md:flex",
          "-left-10",
          "col-start-1",
          "col-span-1",
          "row-span-full",
          "z-1",
          "w-[calc(50%-1rem)]",
          "border-none",
          "shadow-none",
          "-z-10",
          "bg-cover",
          // "card!",
          "hidden!",
          "md:flex!",
          // "md:glass-white",
          "bg-transparent",
          "md:glass",
          // "md:glass-upper",
          "md:w-[calc(50%-2rem)]",
          // "md:hidden!",

          // "bg-amber-200!",
          "",
          "",
          className,
        )}
      />

      <Card
        id="left-side container visual-overlay"
        /*  
          This is a visual overlay, that will overlap parent.
          purpose: prevents backdrop-blur issue where glass-children of glass-parents loose their glass-effects () 
        */
        className={cn(
          // "glass",
          // "glass-white",
          "-m-4",

          /* * grid placement * */
          "col-start-1",
          "col-span-2",
          "row-start-1",
          "row-span-full",

          /* * grid * */
          "grid",
          "grid-cols-subgrid",
          "grid-rows-subgrid",
          "gap-y-0",
          "",
          "",
          // TEST
          // "border-0",
          // "border-transparent",
          // "border-none",
          // "shadow-none",
          // "bg-transparent",
          // "hidden",

          //> NEW CHANGES
          // "unset-glass",
          // "unset-card",

          "md:glass",
          "md:glass-white",
          "md:card",
          "hidden",
          // "hidden!",
          "md:grid",

          // "bg-red-200!",

          "",
          "",
        )}
      >
        {/* <div
          id="invisible-spacers"
          className={cn(
            "col-start-2",
            "col-span-1",
            "row-start-1",
            "row-span-1",
            "overflow-clip",
            "h-45",

            "",
            "",
          )}
        ></div>
        <div
          id="invisible-spacers"
          className={cn(
            "",
            "self-end",
            "col-start-2",
            "col-span-1",
            "row-start-3",
            "row-span-1",
            "h-45",
            "",
            "",
          )}
        ></div> */}
        <StylizedCircle
          className={cn(
            /* * grid placement * */
            "col-start-1",
            "col-span-full",
            "row-start-2",
            "row-span-1",
            "col-span-full",
            "absolute",
            "left-[20%]",
            "right-[40%]",
            "",
            "",

            //> NEW CHANGES
            "hidden",
            // "md:block",
            "md:grid",
            "md:absolute",
          )}
        />
      </Card>
      {children}
    </Card>
  );
}
