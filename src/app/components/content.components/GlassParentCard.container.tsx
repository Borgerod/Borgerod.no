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
        "",
        "",
      )}
      {...props}
    >
      <Card
        id="left-side container visual-overlay"
        /*  
          This is a visual overlay, that will overlap parent.
          purpose: prevents backdrop-blur issue where glass-children of glass-parents loose their glass-effects () 
        */
        className={cn(
          "glass",
          "glass-white",
          "-m-4",

          /* * grid placement * */
          "col-start-1",
          "col-span-2",
          "row-start-1",
          "row-span-full",

          /* * grid  * */
          "grid",
          "grid-cols-subgrid",
          "grid-rows-subgrid",
          "gap-y-0",
          "",
          "",
        )}
      >
        <div
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
        ></div>
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
          )}
        />
      </Card>
      {children}
    </Card>
  );
}
