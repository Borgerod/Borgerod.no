import { ComponentBaseProps, TagItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card, Tag, TagGroup } from "@heroui/react";
// import hardTools from "@data/tools.hard.json";
import tools from "@data/tools.json";
import { Tabs } from "@heroui/react";

export default function ToolCard({ className }: ComponentBaseProps) {
  return (
    <Card id="tools" className={cn("glass", "glass-white", className, "", "")}>
      <h2 className="text-secondary/85 self-center">Tools</h2>

      <TagGroup
        variant="surface"
        aria-label="Tags"
        selectionMode="single"
        className={cn("overflow-x-hidden")}
      >
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
      </TagGroup>
    </Card>
  );
}
