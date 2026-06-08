import { Button, cn } from "@heroui/react";
import StylizedCircle from "../components/design.components/StylizedCircle";

export default function Home() {
  return (
    <main
      id="main container grid"
      className={cn(
        "w-100",
        "h-100",
        "grid",
        "items-center",
        "justify-center",
        "",
        "",
        "",
        "bg-white",

        // "p-20",
        // "p-20",
        "",
        "",
      )}
    >
      {/* <Button isIconOnly>YO</Button> */}
      <div
      //   className="m-10 p-20 h-50 w-50"
      >
        <StylizedCircle
          className={cn(
            "blur-xs",
            "aspect-square",
            "rounded-full",
            "bg-linear-to-br",
            "opacity-90",

            "h-30",
            "w-30",
          )}
        />
      </div>
    </main>
  );
}
