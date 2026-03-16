"use client";
import { ComponentBaseProps, ProjectItem } from "@/lib/types";
import { cn } from "@heroui/react";
import { Card } from "@heroui/react";
import { Separator } from "@heroui/react";
import projects from "@data/projects.json";
import Image from "next/image";
import Link from "next/link";
import { IoIosMore } from "react-icons/io";
import { useEffect, useState } from "react";

// TODO: change color of portfolio-grid-button - on I don't like the hover colors on the Buttons

export default function COMPONENTNAME({ className }: ComponentBaseProps) {
  const [maxProjects, setMaxProjects] = useState<number>(7);

  useEffect(() => {
    /*limits the grid items based on screen size*/
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1024) setMaxProjects(7);
      else if (w >= 768) setMaxProjects(5);
      else if (w >= 640) setMaxProjects(7);
      else setMaxProjects(5);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <Card
      id="project-display"
      className={cn(
        // "unset-glass",
        // "bg-transparent",

        "glass",
        "glass-gray",
        "gap-1",
        "h-50",
        "md:h-full",
        className,

        // "border-none",
        // "border-transparent",
        // "bg-transparent",
        // "outline-none",
        // "outline-transparent",
        // "outline-offset-0",
        // "backdrop-filter-none",
        // "shadow-none",
        // "shadow-transparent",
        // "md:glass",
        // "md:glass-gray",
        // "md:glass",
        // "md:glass-gray",
        // "unset-glass",
        // "unset-glass",
        // "bg-transparent",
        // "unset-card",
        // "md:card",
        "glass-black",
        "bg-glass-black",
        "rounded-none",
        "p-5",
        "h-60",
        "md:h-full",
        // "rounded-none",
        // "glass-black!",
        "md:glass-gray",
        "sm:card",
        // "md:rounded-3xl",
        // "md:h-50",
        "md:p-5",
        // "p-5",
        // "h-fit",

        // "md:bg-amber-300", //to test that it is working

        "",
        "",
      )}
    >
      <Card.Header>
        <Card.Title className="text-accent-foreground-muted text-[16px] font-normal">
          Portfolio
        </Card.Title>
      </Card.Header>
      <Separator variant="secondary" className="pb-0" />

      <Card.Content
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
          "grid-cols-3",
          "sm:grid-cols-4",
          "md:grid-cols-3",
          "lg:grid-cols-4",
          "bg-glass-gray/10", //todo remove custom color
          "shadow shadow-1",
          "",
        )}
      >
        {projects.slice(0, maxProjects).map((project: ProjectItem) => (
          <Link
            id={`${project.id} portfolio-grid-button url-redirect portfolio-page-route`}
            href={project.url}
            key={project.id}
            className="contents"
            target="_blank"
            rel="noopener noreferrer"
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
                "rounded-none",
                "group",
                "bg-transparent",
                "hover:shadow-md",
                "shadow-sm",
                "drop-shadow-sm",
                "hover:bg-glass-gray-undertone",
                "bg-glass-light-gray/40", //todo custom color
                // // "md:hover:bg-glass-gray-undertone",
                // // "md:bg-glass-light-gray/40", //todo custom color

                // "glass",
                // "glass-gray",
                // "bg-glass-gray/40",
                // "outline outline-black/10 ",
                // "border border-black/5",
                "hover:bg-glass-black",
                // // "glass-black!",
                // "hover:glass-black",
                // // "bg-glass-light-gray/40", //todo custom color
                // "shadow shadow-1",
                "",
              )}
            >
              <Card.Header>
                <Image
                  src={project.icon}
                  alt={project.alt}
                  width="64"
                  height="64"
                  className={cn(
                    "w-fit",
                    "h-full",
                    "py-1",
                    "opacity-60",
                    "group-hover:opacity-100",
                    "group-hover:text-accent-foreground",
                    "",
                    "",
                  )}
                />
              </Card.Header>
              <Card.Content
                className={cn(
                  "text-[9px]",
                  "wrap-anywhere",
                  "break-normal",
                  "text-center",
                  "text-accent-foreground-muted",
                  "group-hover:text-accent-foreground",
                  "group-hover:opacity-110",
                  "",
                  "",
                )}
              >
                {project.name}
              </Card.Content>
            </Card>
          </Link>
        ))}

        <Link
          id="see-all-button portfolio-grid-button url-route portfolio-page-route"
          href="./portfolio"
          className="contents"
        >
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
              "rounded-none",
              "group",
              "bg-glass-gray-undertone/50",
              "hover:bg-glass-gray-undertone",
              "hover:shadow-md",
              "shadow-sm",
              "drop-shadow-sm",
              "bg-glass-light-gray/40",
              "",
              "",
            )}
          >
            <Card.Header
              className={cn(
                "text-xl",
                "font-semibold",
                "text-accent-foreground-muted",
                "group-hover:text-accent-foreground",
                "w-fit",
                "h-fit",
                "pt-3",
                "opacity-60",
                "group-hover:opacity-100",
                "group-hover:text-accent-foreground",
                "",
                "",
              )}
            >
              <IoIosMore />
            </Card.Header>
            <Card.Content
              className={cn(
                "text-[9px]",
                "whitespace-normal",
                "text-center",
                "text-accent-foreground-muted",
                "group-hover:text-accent-foreground",
                "",
              )}
            >
              See all
            </Card.Content>
          </Card>
        </Link>
      </Card.Content>
    </Card>
  );
}
