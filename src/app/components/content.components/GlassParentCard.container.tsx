"use client";
import { ComponentBaseProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card } from "@heroui/react";
import { ReactNode } from "react";
import StylizedCircle from "../design.components/StylizedCircle";

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
        className,
        "py-5",
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
          "-left-10",
          "col-start-1",
          "col-span-1",
          "row-span-full",
          "z-1",
          "w-[calc(50%-1rem)]",
          "md:w-[calc(50%-2rem)]",
          "border-none",
          "shadow-none",
          "-z-10",
          "bg-cover",
          "bg-transparent",
          "hidden",
          "md:glass",
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
          "-m-4",
          "md:glass",
          "md:glass-white",
          "md:card",
          "hidden",
          "gap-y-0",

          /* * grid placement * */
          "col-start-1",
          "col-span-2",
          "row-start-1",
          "row-span-full",

          /* * grid * */
          "md:grid",
          "grid-cols-subgrid",
          "grid-rows-subgrid",

          "",
          "",
        )}
      >
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
            "hidden",
            "md:block",
            "",
            "",
          )}
        />
      </Card>
      {children}
    </Card>
  );
}
