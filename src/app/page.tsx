import { cn } from "@/lib/utils";
import { Card } from "@heroui/react";
import ProfileCard from "./components/content.components/ProfileCard";
import StatCard from "./components/content.components/StatCard";
import WorkHistoryCard from "./components/content.components/WorkHistoryCard";
import PortfolioCard from "./components/content.components/PortfolioCard";
import SocialLinksCard from "./components/content.components/SocialLinksCard";
import ToolCard from "./components/content.components/ListCard.tools";
import SkillCard from "./components/content.components/ListCard.skills";
import GlassParentCard from "./components/content.components/GlassParentCard.container";
// import StylizedCircle from "./components/design.components/StylizedCircle";

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
        // "h-full",
        // "max-w-4xl",
        // "max-w-7xl",
        // "min-h-fit",
        // "max-h-50",
        // "max-w-4/5",
        // "max-w-3/5",
        // "max-w-4/5",
        // "max-w-none",
        // "py-0",

        "px-10",
        "xs:px-20",
        // "px-5",

        "sm:px-30",
        // "sm:px-25",
        "sm:px-20",
        // "md:px-10",
        "md:px-5",
        "py-10",
        "lg:px-20",
        "md:px-10",

        // "pb-20",
        // "h-fit",
        // "h-fit!",
        "h-fit", //! dont delete
        // "sm:h-165",
        // "h-300",
        "md:h-165",
        "md:h-175",
        // "md:h-full",
        // "xl:h-full",

        // "sm:px-0",
        // "xl:p-0",
        // "xl:p-0", //!
        "lg:p-0", //!
        "md:py-0", //!
        // "xl:max-w-3/5",
        // "2xl:max-w-5xl",
        // "xl:max-w-5xl",
        "lg:px-5", //!
        "xl:max-w-4xl",
        "lg:max-w-4xl",
        "lg:max-w-5xl",
        "xl:max-w-5xl",
        // "max-w-4/6",
        // "h-200",
        // "h-150", //! dont delete
        // "h-175", //! dont delete
        // "h-165", //! dont delete

        // "h-full",
        // "max-h-2/5",
        // "max-h-fit",
        "gap-5",

        /* * grid * */
        "grid",
        // "sm:grid-cols-5",
        "md:grid-cols-5",
        "grid-cols-1",
        // "grid-rows-5",
        // "grid-rows-[auto_auto]",
        // "grid-rows-2",

        "",
        "",
      )}
    >
      <GlassParentCard
        /* NOTE: this is a special contaier that contains a glass-effect-overlay, read more in the component */

        id="left-side-container | mobile:top-side-container"
        className={cn(
          /* * grid placement * */
          "col-start-1",
          "col-span-3",

          /* * grid * */
          "grid",
          "grid-cols-2",

          "grid-cols-[3fr_4fr]",
          // "grid-cols-[2fr_3fr]",
          // "xs:grid-cols-[3fr_3fr]",
          "sm:grid-cols-[2fr_3fr]",
          "sm:grid-cols-[auto_auto]",
          "md:grid-cols-[3fr_4fr]",
          "lg:grid-cols-[2fr_3fr]",
          // "grid-cols-[3fr_4fr]",
          "xl:grid-cols-[2fr_3fr]",
          // "2xl:grid-cols-[2fr_auto]",
          // "2xl:grid-cols-[2.5fr_auto]",
          // "2xl:grid-cols-[3fr_auto]",
          // "2xl:grid-cols-2",
          "gap-x-5",
          "grid-rows-3",
          // "grid-rows-[auto_auto_auto]",
          "grid-rows-[auto_1fr_auto]",

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
            //
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
        id="right-side-container |mobile:bottom-side-container"
        className={cn(
          "col-start-2",
          "col-span-1",
          "min-h-100",
          "h-full",
          "w-full",

          /* * grid placement * */
          // "col-start-4",
          // "col-span-full",
          "col-span-2!",

          /* * grid * */
          "grid",
          // "grid-cols-auto",
          // "grid-cols-1",
          // "grid-cols-3",
          // "grid-cols-[auto_1fr]",
          // // "grid-cols-[auto_1fr_1fr]",
          // "grid-rows-[auto_auto_auto]",
          // "md:grid-rows-3",

          "grid-cols-1",
          "grid-cols-3",
          "grid-cols-[auto_1fr]",
          // "grid-cols-[auto_1fr_1fr]",
          // "sm:grid-rows-[auto_auto_auto]",
          "md:grid-rows-3",
          "grid-rows-[auto_auto_auto_auto]",
          //
          // "md:grid-rows-[1fr_2fr_2fr]",
          // "sm:grid-rows-[1fr_2fr_2fr]",
          // "sm:grid-rows-[2fr_2fr_2fr]",
          // "grid-rows-[auto_auto_auto]",
          "gap-5",

          "",
          "",
        )}
        // variant="transparent"
      >
        <PortfolioCard
          className={cn(
            /* * grid placement * */
            "col-start-1",
            "col-span-full",
            "row-start-1",
            "row-span-1",

            "sm:col-start-1",
            "sm:col-span-full",
            "sm:row-start-",
            "sm:row-span-",

            "",
            "",
          )}
        />

        <SocialLinksCard
          className={cn(
            /* * grid placement * */
            "col-start-1",
            "col-span-full",
            "row-start-4",
            "row-span-1",
            // "row-span-full",

            "sm:col-start-1",
            "sm:col-span-1",
            "sm:row-start-2",
            "sm:row-span-full",

            "",
            "",
          )}
        />

        <div
          id="sub-grid"
          className={cn(
            // "bg-gray-800",

            /* * grid placement * */
            "col-start-1",
            "col-span-full",
            "row-start-2",
            "row-span-2",

            "sm:col-start-2",
            "sm:col-span-full",
            "sm:row-start-2",
            "sm:row-span-full",

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
