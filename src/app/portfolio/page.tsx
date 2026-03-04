// TODO: MAKE THIS
import { cn } from "@/lib/utils";
import { Card, Chip, Kbd, Separator } from "@heroui/react";
// import { ListBox, Label, Description,  } from "@heroui/react";
import projects from "@data/projects.json";
// import Link from "react";
import { ProjectItem } from "@/lib/types";
import {
  Avatar,
  Description,
  Label,
  ListBox,
  Surface,
  Header,
} from "@heroui/react";
import { TbBrandGithubFilled } from "react-icons/tb";
import Link from "next/link";

//> insert this
{
  /* 
  <Link href={project.url} key={project.id} id={project.id} className="contents">
    <Card id={project.id}></Card>
  </Link>; 
  */
}
//> dont forget this
{
  /* 
  <ListBox.Section key={project.id}>
    {children}
  </ListBox.Section>; 
  */
}
export default function Portfolio() {
  return (
    <main className={cn("p-10", "")}>
      <Surface className="w-fit rounded-3xl shadow-surface p-5">
        <ListBox>
          <ListBox.Section id="portfolio-list-full" className="">
            <Header className="text-xl">Portfolio</Header>
            {projects.map((project: ProjectItem) => (
              <ListBox.Section key={project.id} className="w-full max-w-2xl">
                <Separator />
                <ListBox.Item
                  key={project.id}
                  id={project.id}
                  textValue={project.name}
                  className="my-2 p-4"
                >
                  <Avatar
                    size="sm"
                    variant="soft"
                    className="bg-glass-green-dark-2 place-self-start h-15 w-15"
                  >
                    <Avatar.Image
                      alt={project.alt}
                      src={project.icon}
                      className="h-fit w-full py-auto p-3 "
                    />
                    <Avatar.Fallback>{project.name.charAt(0)}</Avatar.Fallback>
                  </Avatar>

                  <div className="flex flex-col w-full">
                    <Label className="flex w-full">
                      {project.name}
                      <span className={cn("ml-auto font-semibold text-xs")}>
                        {project.coretool.split("(")[0]}
                      </span>
                    </Label>
                    <Description>
                      {project.description
                        .split("Demonstrates capabilities of:")[0]
                        ?.split(". ")
                        .map((line: string, index: number, array: string[]) => (
                          <p key={`desc-${index}`}>
                            {line}
                            {index < array.length - 1 && "."}
                          </p>
                        ))}
                      <br />
                      <p>Demonstrates capabilities of:</p>
                      <div
                        className={cn("flex flex-row gap-1 flex-wrap", "", "")}
                      >
                        {project.description
                          .split("Demonstrates capabilities of:")[1]
                          ?.split(",")
                          .map((capability: string, index: number) => (
                            <Chip
                              size="sm"
                              variant="soft"
                              key={`capability-demo-list-${index}`}
                              id={`capability-demo-list-${index}`}
                              className={cn(
                                "font-light px-2 py-0 h-4 w-fit",
                                "bg-glass-gray/50",
                                "select-none",
                                "",
                                "",
                              )}
                            >
                              {capability.trim()}
                            </Chip>
                          ))}
                      </div>
                      <br />
                      <p>
                        Core language/framework:{" "}
                        <span className="font-semibold text-md">
                          {project.coretool}
                        </span>
                      </p>
                      <p className="flex gap-1">
                        Tools used:
                        <ul className="flex gap-1">
                          {project.subtools.map((tool: string, i: number) => (
                            <Chip
                              size="sm"
                              variant="soft"
                              key={i}
                              id={`chip-${i} ${project}`}
                              className={cn(
                                "font-light px-2 py-0 h-4 w-fit",
                                "bg-glass-gray/50", //todo custom color!
                                "select-none",
                                "",
                              )}
                            >
                              {tool}
                            </Chip>
                          ))}
                        </ul>
                      </p>
                    </Description>
                  </div>

                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox.Section>
            ))}
          </ListBox.Section>

          <ListBox.Section id="github-link-call-to-action">
            <Separator />
            <Header>View more</Header>

            <ListBox.Item
              id="github-redirect-button url-redirect"
              textValue="GitHub"
              href="http://github.com/Borgerod"
            >
              <Avatar size="sm">
                <TbBrandGithubFilled className="size-5" />
              </Avatar>
              <div className="flex flex-col">
                <Label>GitHub</Label>
                <Description>Check out my Github Profile</Description>
              </div>
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox.Section>
        </ListBox>
      </Surface>
    </main>
  );
}
