import { ComponentBaseProps, TagItem } from "@/lib/types";
import { cn } from "@heroui/react";
import { Card } from "@heroui/react";
import tools from "@data/tools.json";
import { Chip } from "@heroui/react";
//> NOTE: To furure self - next time you do a bug report / debugging, make a branch out of it.
/* ! BUG: Mysterious shadowBox when scrolling 
  When scrolling, there is some sort of shadowbox visible outside of component, 
  it overflows and shows on a sibling component 'SocialLinks'.

  - It becomes visible when scrolling (mouse wheel or scrollbar)
  - It dissapears once; 
    - User clicks outside of ToolCard
    - Another hover-effects takes place (i.e.: a button changes bg on hover..), including the scrollbar in ToolCard.**
      ** this does not apply for all hover-effects however. here is a list of those i have noticed.
      o DOES make shadowBox dissapear:
        - hovering scroll-bar in ToolCard (has hover-effect)
        - hovering any social-button in SocialLinksCard (has hover-effect)
        - hovering any portfolio-button in PortfolioCard (has hover-effect)
        
      o DONT make shadowBox dissapear:
        - hovering scroll-bar in SkillCard (has hover-effect)
        - hovering tabs-buttons in SkillCard (has hover-effect)
        - hovering any read-more-buttons in WorkHistoryCard (has NO hover-effect)
        - hovering any email-buttons or call-me-button in ProfileCard (has NO hover-effect)

  NOTE: it is only visible for ToolCard, and not SkillCard, which is odd since they are basicly the same component and have the same sibling.
  test [complete]: swapping the places of ToolCard and SkillCard, report any changes.
                    > results: swapping the places of ToolCard and SkillCard, made SkillCard create the Shadowbox, and not ToolCard.
                    > indicating that the issue might not be rooted in these two cards, but perhaps with SocialLinksCard.
  test [complete]: swapping the places of SocialLinksCard with another Component (or make a new one), report any changes.
                    > results: no changes, issue remains the same. 
  test [complete]: try removing "glass" feature for relevant components, report issue.
                    > results: found culprit, it is the @layer components "glass" (tailwind, css) [ref: globals.css]
    test [complete]: investigate further; try changing values like backdrop-blur, backdrop-saturate, and shadow. 
                    > results:
                          ! remove - 'backdrop-saturate-150' (no effect)
                          * remove - 'shadow-sm' (has effect)
                          * remove - 'backdrop-blur-xl' (has effect)
                    TESTING SIBLLING-CARD
                    > test [complete] see if its the 'shadow' effect in "Card that scrolls" or in "Sibling Card" that is causing it 
                      > results: 
                      >  - setting SocialLinksCard shadow to ['-none', '-0', '-transparent'] including focring "..!" made no changes.
                      >  - funny enough, forcing SocialLinksCard to "shadow-xl" or larger, removes the bug..
                    > test [complete] see if its the 'blur' effect in "Card that scrolls" or in "Sibling Card" that is causing it 
                      > results: 
                      >  - setting SocialLinksCard 'blur' to ['-none'] including focring "..!" removes the bug.
                      >  - setting SocialLinksCard 'blur' to ['2xl'] or larger - made no change.
                      >  - setting SocialLinksCard 'blur' to ['md'] or smaller - did not remove the bug, but made the shadow smaller.
                   TESTING SCROLL-CARD
                   > test [complete] see if its the 'shadow' effect in "Card that scrolls" or in "Sibling Card" that is causing it 
                     > results:
                     >  - setting ToolCard 'shadow' to ['-none','xl(or bigger)'] - removes the bug.
                     >  - setting ToolCard 'shadow' to ['-transparent','-xs(or smaller)'] - made no change.
                   > test [complete] see if its the 'blur' effect in "Card that scrolls" or in "Sibling Card" that is causing it 
                     > results: 
                     >  - setting ToolCard 'blur' to ['-transparent','-md(or smaller)','2xl(or bigger)'] - made no change.
                     >  - setting ToolCard 'blur' to ['-none'] - removes the bug.
  * SOLUTION: 
  * [ ](1): easiest solution is to manually remove shadow from one of the components. (this does not however solve the root cause)          
  * [ ](2): (NOTE: need further testing of HeroUI scrollbar) whrer a potential solution would be making your own scroll bar. 

  */
export default function ToolCard({ className }: ComponentBaseProps) {
  return (
    <Card id="tools" className={cn("glass", "glass-white", className, "", "")}>
      <Card.Header className="text-secondary/85 self-center">Tools</Card.Header>

      <Card.Content className="p-0 overflow-x-hidden ">
        <div className="flex pb-2 gap-1 flex-wrap h-full items-start content-start">
          {tools.map((tool: TagItem) => (
            <Chip
              size="sm"
              variant="soft"
              key={tool.id}
              id={tool.id}
              className={cn(
                "font-light px-2 py-0 h-4 w-fit",
                "bg-glass-gray/50", //todo custom color!
                "select-none",
                "",
              )}
            >
              <Chip.Label>{tool.name}</Chip.Label>
            </Chip>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
}
