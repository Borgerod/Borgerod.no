import { ComponentBaseProps, TagItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card, Chip } from "@heroui/react";
import hardSkills from "@data/skills.hard.json";
import softSkills from "@data/skills.soft.json";
import { Tabs } from "@heroui/react";

export default function SkillCard({ className }: ComponentBaseProps) {
  return (
    <Card
      id="skills"
      className={cn(
        "glass",
        "glass-white",
        "w-full",
        "",
        "",

        className,
      )}
    >
      <Tabs className="w-full gap-0 h-full">
        <Card.Header>
          <Card.Title className="text-secondary/85 self-center">
            Skills
          </Card.Title>
          <Card.Description>
            <Tabs.ListContainer
              className={cn(
                "flex",
                "gap-2",
                "h-fit",
                "bg-transparent",

                "",
                "",
              )}
            >
              <Tabs.List
                aria-label="Options"
                className={cn(
                  "h-fit",
                  "bg-transparent",
                  "bg-glass-offwhite",
                  "mt-0.5",
                  "text-sm",
                  "text-secondary/85",

                  "",
                )}
              >
                <Tabs.Tab
                  id="hard-skills"
                  className="h-fit text-secondary/85 font-normal focus:text-primary"
                >
                  Hard
                  <Tabs.Indicator className="bg-glass-gray/50 " />
                  {/* <Tabs.Indicator className="bg-glass-gray/50 border border-glass-light-gray" /> */}
                </Tabs.Tab>
                <Tabs.Tab
                  id="soft-skills"
                  className="h-fit text-secondary/85 font-normal focus:text-primary"
                >
                  Soft
                  <Tabs.Indicator className="bg-glass-gray/50 " />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>
          </Card.Description>
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
                  "font-light px-2 py-0 h-4 w-fit",
                  "bg-glass-gray/50", //todo custom color!
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
                  "font-light px-2 py-0 h-4 w-fit",
                  "bg-glass-gray/50", //todo custom color!
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
