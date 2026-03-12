import { ComponentBaseProps, TagItem } from "@/lib/types";
import { cn } from "@heroui/react";
import { Card } from "@heroui/react";
import tools from "@data/tools.json";
import { Chip } from "@heroui/react";
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
        - hovering any social-button in SocialCard (has hover-effect)
        - hovering any portfolio-button in PortfolioCard (has hover-effect)
        
      o DONT make shadowBox dissapear:
        - hovering scroll-bar in SkillCard (has hover-effect)
        - hovering tabs-buttons in SkillCard (has hover-effect)
        - hovering any read-more-buttons in WorkHistoryCard (has NO hover-effect)
        - hovering any email-buttons or call-me-button in ProfileCard (has NO hover-effect)

  NOTE: it is only visible for ToolCard, and not SkillCard, which is odd since they are basicly the same component and have the same sibling.
  test []: swapping the places of ToolCard and SkillCard, report any changes. 
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
