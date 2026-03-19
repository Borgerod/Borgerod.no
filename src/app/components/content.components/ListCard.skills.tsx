import { ComponentBaseProps, TagItem } from "@/lib/types";
import { cn } from "@heroui/react";
import { Card, Chip } from "@heroui/react";
import hardSkills from "@data/skills.hard.json";
import softSkills from "@data/skills.soft.json";
import { Tabs } from "@heroui/react";

export default function SkillCard({ className }: ComponentBaseProps) {
  return (
    <Card
      id="skills"
      className={cn(
        "bg-transparent",
        "shadow-none",
        "sm:glass",
        "sm:glass-white",
        "px-0",
        "sm:px-5",
        "h-70",
        "h-65", // not a fan of static values but switching between hard and soft skills made both ListCards expand which was annoying to look at.
        className,
        "",
        "",
      )}
    >
      <Tabs className="w-full gap-0 h-full">
        <Card.Header className="text-glass-black">
          <Card.Title className="text-start sm:text-center text-glass-black  text-[16px] font-normal">
            Skills
          </Card.Title>
          <Tabs.ListContainer
            className={cn("flex", "gap-2", "h-fit", "bg-transparent", "", "")}
          >
            <Tabs.List
              aria-label="Options"
              className={cn(
                "h-fit",
                "bg-transparent",
                "bg-glass-white-muted",
                "mt-0.5",
                "text-sm",
                "",
              )}
            >
              <Tabs.Tab
                id="hard-skills"
                className={cn(
                  "h-fit",
                  "font-normal",
                  "focus:text-primary",
                  "text-secondary",
                  "",
                )}
              >
                Hard
                <Tabs.Indicator className="bg-glass-green-base" />
              </Tabs.Tab>
              <Tabs.Tab
                id="soft-skills"
                className={cn(
                  "h-fit",
                  "font-normal",
                  "focus:text-primary",
                  "text-secondary",
                  "",
                )}
              >
                Soft
                <Tabs.Indicator className="bg-glass-green-base" />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>
        </Card.Header>

        <Card.Content className="p-0 overflow-x-hidden ">
          <Tabs.Panel
            id="hard-skills"
            className="px-0 gap-1 flex flex-wrap h-full items-start content-start"
          >
            {hardSkills.map((skill: TagItem) => (
              <Chip
                size="sm"
                variant="soft"
                key={skill.id}
                id={skill.id}
                className={cn(
                  "font-light",
                  "px-2",
                  "bg-glass-gray-light",
                  "select-none",
                  "",
                )}
              >
                <Chip.Label>{skill.name}</Chip.Label>
              </Chip>
            ))}
          </Tabs.Panel>

          <Tabs.Panel
            id="soft-skills"
            className="px-0 gap-1 flex flex-wrap h-full items-start content-start"
          >
            {softSkills.map((skill: TagItem) => (
              <Chip
                size="sm"
                variant="soft"
                key={skill.id}
                id={skill.id}
                className={cn(
                  "font-light",
                  "px-2",
                  "bg-glass-gray-light",
                  "select-none",
                  "",
                )}
              >
                <Chip.Label>{skill.name}</Chip.Label>
              </Chip>
            ))}
          </Tabs.Panel>
        </Card.Content>
      </Tabs>
    </Card>
  );
}
