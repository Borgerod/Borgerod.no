import { ComponentBaseProps, TagItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card, ScrollShadow, Tag, TagGroup } from "@heroui/react";
// import hardTools from "@data/tools.hard.json";
import tools from "@data/tools.json";
import { Tabs } from "@heroui/react";
// TODO: https://v3.heroui.com/docs/react/components/chip ??
// TODO: https://v3.heroui.com/docs/react/components/tag ??

export default function ToolCard({ className }: ComponentBaseProps) {
  return (
    <Card id="tools" className={cn("glass", "glass-white", className, "", "")}>
      <Card.Header className="text-secondary/85 self-center">Tools</Card.Header>

      <TagGroup
        variant="surface"
        aria-label="Tags"
        selectionMode="single"
        className={cn("overflow-x-hidden")}
      >
        <ScrollShadow visibility="auto" size={20}>
          {/* <ScrollShadow hideScrollBar className="pb-4" size={20}> */}
          <Card.Content className="p-0">
            <TagGroup.List>
              {tools.map((tool: TagItem) => (
                <Tag
                  key={tool.id}
                  id={tool.id}
                  textValue={tool.name}
                  className="font-light! px-2 py-0"
                >
                  {tool.name}
                </Tag>
              ))}
            </TagGroup.List>
          </Card.Content>
        </ScrollShadow>
      </TagGroup>
    </Card>
  );
}
