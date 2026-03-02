import { ComponentBaseProps, ProjectButton } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card } from "@heroui/react";
import { Separator } from "@heroui/react";
import projects from "@data/projects.json";
import Image from "next/image";
import Link from "next/link";
export default function COMPONENTNAME({ className }: ComponentBaseProps) {
  return (
    <Card
      id="project-display"
      className={cn("glass", "glass-gray", "gap-1", className, "", "")}
    >
      {/* <h2 className="text-accent-foreground/80">Project portfolio</h2> */}
      {/* <h2 className="text-accent-foreground/80">My projects</h2> */}
      {/* <h2 className="text-accent-foreground/80">MY PROJECTS</h2> */}
      {/* <h2 className="text-accent-foreground/80">PROJECTS</h2> */}
      {/* <h2 className="text-accent-foreground/80">PORTFOLIO</h2> */}
      <h2 className="text-accent-foreground/80">Portfolio</h2>
      <Separator variant="secondary" className="pb-0" />

      <Card
        id="project container grid"
        className={cn(
          "bg-transparent",
          "p-0",
          "gap-1",
          "rounded-xl",
          "overflow-hidden",
          "shadow-none",
          ////* grid
          "grid",
          "grid-rows-2",
          "grid-cols-4",

          "",
          "",
        )}
      >
        {projects.slice(0, 7).map((project: ProjectButton) => (
          <Link
            href={project.url}
            key={project.id}
            id={project.id}
            className="contents"
          >
            <Card
              key={project.id}
              className={cn(
                "font-light",
                "p-2",
                "h-full",
                "w-full",
                "grid",
                "grid-rows-2",
                "justify-center",
                "justify-items-center",
                "content-center",
                "gap-0",
                "",
                "rounded-none",
                "group",
                "bg-glass-gray-undertone/50",
                "hover:bg-glass-gray-undertone",
                "hover:shadow-md",
                "shadow-sm",
                "drop-shadow-sm",
                "",
                "",
              )}
            >
              <Image
                src={project.icon}
                alt={project.alt}
                width="64"
                height="64"
                className="h-full w-fit opacity-60 group-hover:opacity-100 group-hover:text-white p-1 self-end"
              />
              <span
                className={cn(
                  "text-xs",
                  "wrap-anywhere",
                  "break-normal",
                  "text-center",
                  "text-accent-foreground/80",
                  "group-hover:text-accent-foreground",
                  "group-hover:opacity-110",
                  "",
                  "",
                )}
              >
                {project.name}
              </span>
            </Card>
          </Link>
        ))}
        <Link href="./projects" className="contents">
          <Card
            className={cn(
              "font-light",
              "p-2",
              "h-full",
              "w-full",
              "grid",
              "grid-rows-2",
              "justify-center",
              "justify-items-center",
              "content-center",
              "gap-0",
              "",
              "rounded-none",
              "group",
              "bg-glass-gray-undertone/50",
              "hover:bg-glass-gray-undertone",
              "hover:shadow-md",
              "shadow-sm",
              "drop-shadow-sm",
              "",
              "",
            )}
          >
            <p className="text-xl font-semibold text-center text-nowrap text-accent-foreground/80 group-hover:text-white">
              ...
            </p>
            <p
              className={cn(
                "text-xs",
                "whitespace-normal",
                "text-center",
                "text-accent-foreground/80",
                "group-hover:text-white",
                "",
              )}
            >
              see more
            </p>
          </Card>
        </Link>
      </Card>
    </Card>
  );
}
