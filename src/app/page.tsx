import { cn } from "@heroui/react";
import ProfileCard from "./components/content.components/ProfileCard";
import StatCard from "./components/content.components/StatCard";
import WorkHistoryCard from "./components/content.components/WorkHistoryCard";
import PortfolioCard from "./components/content.components/PortfolioCard";
import SocialLinksCard from "./components/content.components/SocialLinksCard";
import ToolCard from "./components/content.components/ListCard.tools";
import SkillCard from "./components/content.components/ListCard.skills";
import GlassParentCard from "./components/content.components/GlassParentCard.container";

export default function Home() {
  return (
    <main
      id="main container grid"
      className={cn(
        "",
        "",
        "w-full",
        "px-10",
        "pr-5",
        "px-0",
        "pl-5",
        "py-10",
        "pt-5",
        "pr-5",
        "pl-10",
        "xs:px-20",
        "sm:px-30",
        "sm:px-20",
        "md:px-5",
        "lg:px-20",
        "md:px-10",
        "h-fit", //! dont delete
        "md:h-165",
        "md:h-175",
        "lg:p-0", //!
        "md:py-0", //!
        "lg:px-5", //!
        "xl:max-w-4xl",
        "lg:max-w-4xl",
        "lg:max-w-5xl",
        "xl:max-w-5xl",
        // "h-150", //! dont delete
        // "h-175", //! dont delete
        // "h-165", //! dont delete

        "gap-5",

        /* * grid * */
        "grid",
        "md:grid-cols-5",
        "grid-cols-1",

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
          "sm:grid-cols-[2fr_3fr]",
          "sm:grid-cols-[auto_auto]",
          "md:grid-cols-[3fr_4fr]",
          "lg:grid-cols-[2fr_3fr]",
          "xl:grid-cols-[2fr_3fr]",
          "gap-x-5",
          "grid-rows-3",
          "grid-rows-[auto_1fr_auto]",
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

          "col-span-2!",

          /* * grid * */
          "grid",

          "grid-cols-1",
          "grid-cols-3",
          "grid-cols-[auto_1fr]",
          "md:grid-rows-3",
          "grid-rows-[auto_auto_auto_auto]",
          "gap-5",

          "",
          "",
        )}
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
