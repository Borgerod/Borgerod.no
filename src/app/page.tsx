import { cn, Separator } from "@heroui/react";
import ProfileCard from "./components/content.components/ProfileCard";
import StatCard from "./components/content.components/StatCard";
import WorkHistoryCard from "./components/content.components/WorkHistoryCard";
import PortfolioCard from "./components/content.components/PortfolioCard";
import SocialLinksCard from "./components/content.components/SocialLinksCard";
import ToolCard from "./components/content.components/ListCard.tools";
import SkillCard from "./components/content.components/ListCard.skills";
import GlassParentCard from "./components/content.components/GlassParentCard.container";
import RepoRef from "./components/content.components/RepoRef";

export default function Home() {
  return (
    <main
      id="main container grid"
      className={cn(
        "w-full",
        "py-10",
        "px-5",
        "sm:px-30",
        "sm:px-20",
        "md:px-5",
        "md:py-0",
        "h-fit",
        "md:h-165",
        "md:h-175",
        "xl:max-w-4xl",
        "lg:max-w-4xl",
        "lg:max-w-5xl",
        "xl:max-w-5xl",
        "gap-5",
        "md:gap-10",
        "md:unset-glass",
        // manual extention to unset glass (idk why)
        "md:border-none",
        "md:outline-none",
        "md:outline-offset-0",
        "md:backdrop-filter-none",

        "glass",
        "backdrop-blur-xl",
        "glass-upper",

        /* * grid * */
        "grid",
        "md:grid-cols-[3fr_2fr]",
        "grid-cols-1",

        "",
        "",
        "",
      )}
    >
      <GlassParentCard
        /* NOTE: this is a special contaier that contains a glass-effect-overlay, read more in the component */

        id="left-side-container | mobile:top-side-container"
        className={cn(
          "unset-glass",
          "unset-card",
          "gap-y-10",
          "sm:gap-y-5",
          "sm:gap-y-10",
          "md:pl-10",
          "md:py-4",
          "gap-x-5",

          /* * grid placement * */
          "md:grid",
          "flex flex-col",

          /* * grid * */
          "grid",
          "grid-cols-subgrid",
          "sm:grid-cols-[3fr_5fr]",
          "lg:grid-cols-[2fr_3fr]",
          "xl:grid-cols-[2fr_3fr]",

          "grid-rows-[auto_auto_auto]",
          "sm:grid-rows-[auto_1fr_auto]",

          "",
          "",
        )}
      >
        <ProfileCard
          className={cn(
            /* * grid placement * */
            "col-span-1",
            "row-start-",
            "row-span-full",
            "col-span-full",

            "md:col-start-1",
            "md:col-span-1",
            "md:row-span-full",
            "",
            "",
          )}
        />
        <Separator
          variant="secondary"
          className=" w-full bg-glass-gray-dark flex sm:hidden"
        />
        <StatCard
          className={cn(
            /* * grid placement * */
            "col-span-full",
            "row-start-",
            "row-span-1",

            "sm:col-start-2",
            "sm:col-span-1",
            "sm:row-start-1",
            "sm:row-span-1",

            "md:col-start-2",
            "md:col-span-1",
            "md:row-start-1",
            "md:row-span-1",
            "",
          )}
        />
        <Separator
          variant="secondary"
          className=" w-full bg-glass-gray-dark flex sm:hidden"
        />
        <WorkHistoryCard
          className={cn(
            /* * grid placement * */
            "col-span-full",

            "md:row-start-3",
            "md:col-start-2",
            "md:col-span-1",
            "",
            "",
          )}
        />
      </GlassParentCard>

      <div
        id="right-side-container |mobile:bottom-side-container"
        className={cn(
          "md:col-start-2",
          "col-start-1",
          "min-h-100",
          "h-full",
          "w-full",

          /* * grid * */
          "grid",
          "sm:grid-cols-[auto_1fr]",
          "grid-cols-subgrid",
          "md:grid-rows-3",
          "grid-rows-[auto_auto_auto_auto]",
          "gap-5",
          "h-full!",
          /*
            NOTE:
                I think its because visually right-side-container look like its in the left side of GlassParentCard, but they start off as stacked on top of eachother, then assigned to possitions. 
                so: thenever the animation effect happens in right-side-container (aka button hover effects etc...), then it in some way resets the calculation, leading it to momentarily go back to its start position, by that i mean the element itself, and not its styling, so visually it looks like it is remaining in its itended position, but in reality the element is back to start (phantom element).
                and the phantom-element's position is: (X,Y position) exactly where GlassParentCard is placed, (Z position) ontop of GlassParentCard(visual-overlay) but underneath ProfileCard.
                that is why the bug only stops blurring the GlassParentCards edge, and nothing else. because it is not, it is in fact not blurring THIS elements edge.
                and that is also why it is fixable by either changing the z-position to behind the GlassParentCard, or by moving it slightly to the left. 
                to be exact and to prove my theory: 
                you can solve the issue by doing this; "-translate-x-26" (shift to the right) -> which i bet is the exact width of the element
                you can solve the issue by doing this; "translate-x-5    (shift to the left)-> which i bet is the exact width of the element
                so this means that the bug happens between this area: (translate-x-4 to -translate-x-25) leads to this element to overlap.
                this makes perfect scense when you assume that this elements starts at the same position as the GlassParentCard. 
                ( 
                  in other words; 
                    the edge of SocialLinksCard is perfectly positioned on top of the edge of ProfileCards edge, making it overlap GlassParentsCard edge at translate-x-0
                    at this point and beyond "translate-x-5" this element "right-side-container" is no longer overlapping the edge of GlassParentsCard (the edge that is supposed to be blurred) , and is now within GlassParentsCard's visual overlay.
                    and going in the other direction "-translate-x-26" moves the while length of "right-side-container" outside of GlassParentsCard visual overlay.  

                    Note: that its the invisible parent element (this element) that is doing this, and not the visible children, i am only using as an example to help visualize it
                )  
                so we have three options to solve this. 
                "-translate-x-26", //! this one is creating too much disturbance. 
                "translate-x-5", //* this one creates disturbance but less so.
                "-z-1", //* this one creates no disturbance but introduced another bug BUG-[1.2]
                > BUG-[1.2] : very similar to [1.0] hovering scrollbar gives a flickering white-box-effect on the leftside of GlassParentsCard visual-overlay.
                  note that translating "translate-x-[_some_number] moves the white-box-effect.
                  white-box-effect: similar [1.1] this could be some parent color showing through 
                  note: setting z-axis deeper than -1 does not help and setting it higher than -1 obviously breaks [1.1] solution.

                  test: adding 'transform-gpu,-border.. etc' to see if that helps. 
                    >result: it had not effect on the bug

                  test: adding transform-x-5 in right-side-container, then adding -transform-x-5 for all of its children
                    >result: this only reverted the solution (aka had no effect on the bug)

                  test: adding transform-x-5 in right-side-container, then removing 5 from the gap-5 for the parent. 
                    >result: this only reverted the solution (aka had no effect on the bug)
            */

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
            "grid-rows-[auto_auto_auto_auto_auto]",
            "gap-5",

            "",
            "",
          )}
        >
          <ToolCard
            className={cn(
              /* * grid placement * */
              "col-start-",
              "col-span-full",
              "row-start-1",
              "row-span-2",
              "",
              "",
            )}
          />
          <Separator
            variant="secondary"
            className=" col-span-full row-start-3 w-full bg-glass-gray-dark flex sm:hidden"
          />
          <SkillCard
            className={cn(
              /* * grid placement * */
              "col-start-",
              "col-span-full",
              "row-start-4",
              "sm:row-start-3",
              "row-span-3",
              "",
              "",
            )}
          />
        </div>
      </div>
      <RepoRef
        className={cn("hidden", "sm:flex", "row-start-", "col-span-full")}
      />
    </main>
  );
}
