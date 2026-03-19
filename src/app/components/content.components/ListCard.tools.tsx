import { ComponentBaseProps, TagItem } from "@/lib/types";
import { cn } from "@heroui/react";
import { Card } from "@heroui/react";
import tools from "@data/tools.json";
import { Chip } from "@heroui/react";

export default function ToolCard({ className }: ComponentBaseProps) {
  return (
    <Card
      id="tools"
      className={cn(
        "bg-transparent",
        "shadow-none",
        "sm:glass",
        "sm:glass-white",
        "px-0",
        "sm:px-5",
        className,
        "",
        "",
      )}
    >
      <Card.Header className="text-glass-black">
        <Card.Title className="text-start sm:text-center text-glass-black  text-[16px] font-normal">
          Tools
        </Card.Title>
      </Card.Header>
      <Card.Content className="p-0 overflow-x-hidden ">
        <div className="flex pb-2 gap-1 flex-wrap h-full items-start content-start">
          {tools.map((tool: TagItem) => (
            <Chip
              size="sm"
              variant="soft"
              key={tool.id}
              id={tool.id}
              className={cn(
                "font-light",
                "px-2",
                "bg-glass-gray-light",
                "select-none",
                "group-hover:bg-glass-green-base!",
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
