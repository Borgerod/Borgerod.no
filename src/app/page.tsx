import { cn } from "@/lib/utils";
import { Card } from "@heroui/react";
import ProfileCard from "./components/content.components/ProfileCard";
import StatCard from "./components/content.components/StatCard";
import WorkHistoryCard from "./components/content.components/WorkHistoryCard";
import ProjectDisplayCard from "./components/content.components/ProjectDisplayCard";
import SocialLinksCard from "./components/content.components/SocialLinksCard";
import ToolCard from "./components/content.components/ListCard.tools";
import SkillCard from "./components/content.components/ListCard.skills";
import GlassParentCard from "./components/content.components/GlassParentCard.container";
import StylizedCircle from "./components/design.components/StylizedCircle";

export default function Home() {
  return (
    <main
      id="bento-box main container grid"
      className={cn(
        // keep this for now
        // "w-full h-screen content-center justify-items-center",
        "",
        "",
        "w-full",
        "h-full",
        // "max-w-4xl",
        // "max-w-7xl",
        // "min-h-fit",
        // "max-h-50",
        "max-w-4/5",
        "h-200",
        // "max-h-fit",
        "gap-5",

        /* * grid * */
        "grid",
        "grid-cols-5",
        // "grid-rows-5",

        "",
        "",
      )}
    >
      <GlassParentCard
        /* NOTE: this is a special contaier that contains a glass-effect-overlay, read more in the component */

        id="left-side container"
        className={cn(
          /* * grid placement * */
          "col-start-1",
          "col-span-3",

          /* * grid * */
          "grid",
          "grid-cols-2",
          "grid-rows-3",
          // "bg-background/50",
          // "bg-glass-white",
          // "bg-glass-black",
          // "bg-glass-white",

          "",
        )}
      >
        <ProfileCard
          className={cn(
            /* * grid placement * */
            "col-start-1",
            "col-span-1",
            "row-start-",
            "row-span-full",

            "",
            "",
          )}
        />

        <StatCard
          className={cn(
            /* * grid placement * */
            "col-start-2",
            "col-span-1",
            "row-start-1",
            "row-span-1",
            "",
            "",
          )}
        />

        <WorkHistoryCard
          className={cn(
            /* * grid placement * */
            "col-start-2",
            "col-span-1",
            "row-start-3",
            "row-span-1",
            "",
            "",
          )}
        />
        {/* </Card> */}
      </GlassParentCard>
      <div
        id="right-side"
        className={cn(
          "col-start-2",
          "col-span-1",
          "min-h-100",
          "h-full",
          "w-full",

          /* * grid placement * */
          "col-start-4",
          "col-span-full",

          /* * grid * */
          "grid",
          "grid-cols-auto",
          "grid-cols-3",
          "grid-cols-[auto_1fr_1fr]",
          "grid-rows-3",
          "gap-5",
          "",
          "",
        )}
        // variant="transparent"
      >
        <ProjectDisplayCard
          className={cn(
            /* * grid placement * */
            "col-start-1",
            "col-span-full",
            "row-start-",
            "row-span-",
            "",
            "",
          )}
        />

        <SocialLinksCard
          className={cn(
            /* * grid placement * */
            "col-start-",
            "col-span-",
            "row-start-2",
            "row-span-full",
            "",
            "",
          )}
        />

        <div
          id="sub-grid"
          className={cn(
            // "bg-gray-800",

            /* * grid placement * */
            "col-start-2",
            "col-span-full",
            "row-start-2",
            "row-span-full",
            /* * grid * */
            "grid",
            "grid-cols-1",
            "grid-rows-5",
            "gap-5",
            "",
            "",
          )}
        >
          <ToolCard
            className={cn(
              /* * grid placement * */
              "col-start-",
              "col-span-",
              "row-start-1",
              "row-span-2",
              "",
              "",
            )}
          />

          <SkillCard
            className={cn(
              /* * grid placement * */
              "col-start-",
              "col-span-",
              "row-start-3",
              "row-span-3",
              "",
              "",
            )}
          />
        </div>
      </div>
    </main>
  );
}
