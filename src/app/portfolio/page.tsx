import { cn } from "@/lib/utils";
import { Breadcrumbs, Button, Card, Chip, Separator } from "@heroui/react";
import projects from "@data/projects.json";
import { ProjectItem } from "@/lib/types";
import { Avatar, Description, Label, ListBox, Header } from "@heroui/react";
import { TbBrandGithubFilled } from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";
export default function Portfolio() {
  return (
    <main className={cn("p-0", "sm:p-20", "sm:px-1")}>
      <Link className="contents" href="/">
        <Button
          variant="ghost"
          className={cn(
            "absolute",
            "top-5 left-5 z-10",
            "h-12 w-12",
            "hover:bg-glass-green-base",
            "p-2",
          )}
        >
          <Image
            src="/assets/images/ab_logo_demo.png"
            width={500}
            height={500}
            alt="Picture of the author"
            className={cn("size-full")}
          />
        </Button>
      </Link>
      <Card
        className={cn(
          "glass",
          "glass-white",
          "w-fit",
          "flex",
          "flex-0",
          "max-w-2xl",
          "min-w-sm",
          "rounded-none",
          "sm:rounded-3xl",
          "pt-24",
          "sm:pt-4",
        )}
      >
        <Breadcrumbs>
          <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
          <Breadcrumbs.Item>portfolio</Breadcrumbs.Item>
        </Breadcrumbs>
        <ListBox>
          <ListBox.Section id="portfolio-list-full" className="">
            <Header className="text-xl ">Portfolio</Header>
            {projects.map((project: ProjectItem) => (
              <ListBox.Section key={project.id} className="w-full">
                <Separator variant="secondary" className="pb-0 " />
                <ListBox.Item
                  key={project.id}
                  id={project.id}
                  textValue={project.name}
                  href={project.url}
                  target="_blank"
                  className="my-2 p-4 hover:bg-glass-green-base group w-full"
                >
                  <Avatar
                    size="sm"
                    variant="soft"
                    className={cn(
                      "bg-glass-green-dark-2",
                      "place-self-start",
                      "h-15 w-15",
                    )}
                  >
                    <Avatar.Image
                      alt={project.alt}
                      src={project.icon}
                      width="64"
                      height="64"
                      className="object-contain px-2 py-2.5"
                    />

                    <Avatar.Fallback>{project.name.charAt(0)}</Avatar.Fallback>
                  </Avatar>

                  <div className="w-full">
                    <Label className="flex w-full">
                      {project.name.replace(/-/g, "")}

                      <span
                        className={cn(
                          "ml-auto font-semibold text-xs text-secondary",
                        )}
                      >
                        {project.coretool.split("(")[0]}
                      </span>
                    </Label>
                    <Description className="text-secondary">
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
                      <div className={cn("flex flex-row gap-1 flex-wrap", "")}>
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
                                "bg-glass-gray/50", //todo custom color!
                                "select-none",
                                "group-hover:bg-glass-green-base!",
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
                        <ul className="flex gap-1 flex-wrap">
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
                                "group-hover:bg-glass-green-base!",
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
            <Header className="text-xl">View more</Header>

            <ListBox.Item
              id="github-redirect-button url-redirect"
              textValue="GitHub"
              href="http://github.com/Borgerod"
              className="hover:bg-glass-green-base"
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
      </Card>
    </main>
  );
}
