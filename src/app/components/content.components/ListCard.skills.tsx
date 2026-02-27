import { ComponentBaseProps, TagItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card, Tag, TagGroup } from "@heroui/react";
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

        // "max-w-fit",
        // "max-h-100",
        "",
        "",
        "",

        className,
      )}
    >
      <Tabs className="w-full  gap-0 ">
        <h2 className="text-secondary/85 self-center">Skills </h2>
        <Tabs.ListContainer className="flex gap-2 h-fit bg-transparent">
          <Tabs.List
            aria-label="Options"
            className={cn(
              "h-fit",
              // "glass",
              "bg-transparent",
              "mt-0.5",
              "text-sm",
              "text-secondary/85",

              "",
            )}
          >
            <Tabs.Tab
              id="hard-skills"
              className="h-fit text-secondary/85 font-normal"
            >
              Hard
              <Tabs.Indicator
              // className="glass bg-glass-light-gray"
              />
            </Tabs.Tab>
            <Tabs.Tab
              id="soft-skills"
              className="h-fit text-secondary/85 font-normal"
            >
              Soft
              <Tabs.Indicator
              // className="glass bg-glass-light-gray"
              />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
        <Tabs.Panel id="hard-skills">
          <TagGroup
            variant="surface"
            aria-label="Tags"
            selectionMode="single"
            className={cn("overflow-auto max-h-48", "", "")}
          >
            <TagGroup.List>
              {hardSkills.map((skill: TagItem) => (
                <Tag
                  key={skill.id}
                  id={skill.id}
                  textValue={skill.name}
                  className="font-light! px-2 py-0"
                >
                  {skill.name}
                </Tag>
              ))}
            </TagGroup.List>
          </TagGroup>
        </Tabs.Panel>

        <Tabs.Panel className="pt-4 px-0" id="soft-skills">
          <TagGroup
            size="sm"
            variant="surface"
            aria-label="Tags"
            selectionMode="single"
          >
            <TagGroup.List className={cn("overflow-auto h-fit")}>
              {softSkills.map((skill: TagItem) => (
                <Tag
                  key={skill.id}
                  id={skill.id}
                  textValue={skill.name}
                  className="font-light! px-2 py-0 text-nowrap"
                >
                  {skill.name}
                </Tag>
              ))}
            </TagGroup.List>
          </TagGroup>
        </Tabs.Panel>
      </Tabs>
    </Card>
  );
}
