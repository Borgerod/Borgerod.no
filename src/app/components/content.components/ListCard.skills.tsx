import { ComponentBaseProps, TagItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card, ScrollShadow, Tag, TagGroup } from "@heroui/react";
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
      <Tabs className="w-full  gap-0 ">
        <Card.Header>
          <Card.Title className="text-secondary/85 self-center">
            Skills
          </Card.Title>
          <Card.Description>
            <Tabs.ListContainer className="flex gap-2 h-fit bg-transparent">
              <Tabs.List
                aria-label="Options"
                className={cn(
                  "h-fit",
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
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab
                  id="soft-skills"
                  className="h-fit text-secondary/85 font-normal"
                >
                  Soft
                  <Tabs.Indicator />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>
          </Card.Description>
        </Card.Header>
        <Card.Content className="p-0">
          <Tabs.Panel id="hard-skills" className="px-0">
            <TagGroup
              variant="surface"
              aria-label="Tags"
              selectionMode="single"
              className={cn("overflow-auto max-h-48", "", "")}
            >
              {" "}
              <ScrollShadow visibility="auto" size={20}>
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
                </TagGroup.List>{" "}
              </ScrollShadow>
            </TagGroup>
          </Tabs.Panel>

          <Tabs.Panel className="pt-4 px-0" id="soft-skills">
            <TagGroup
              size="sm"
              variant="surface"
              aria-label="Tags"
              selectionMode="single"
            >
              <ScrollShadow visibility="auto" size={20}>
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
              </ScrollShadow>
            </TagGroup>
          </Tabs.Panel>
        </Card.Content>
      </Tabs>
    </Card>
  );
}
