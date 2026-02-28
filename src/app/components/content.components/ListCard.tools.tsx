import { ComponentBaseProps, TagItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card, ScrollShadow, Tag, TagGroup } from "@heroui/react";
// import hardTools from "@data/tools.hard.json";
import tools from "@data/tools.json";
import { Tabs } from "@heroui/react";
// TODO: https://v3.heroui.com/docs/react/components/chip ??
// TODO: https://v3.heroui.com/docs/react/components/tag ??
import { Chip } from "@heroui/react";

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
