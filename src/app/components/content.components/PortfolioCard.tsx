"use client";
import { ComponentBaseProps, ProjectItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card } from "@heroui/react";
import { Separator } from "@heroui/react";
import projects from "@data/projects.json";
import Image from "next/image";
import Link from "next/link";
import { IoIosMore } from "react-icons/io";
import { useEffect, useState } from "react";

export default function COMPONENTNAME({ className }: ComponentBaseProps) {
  const [maxProjects, setMaxProjects] = useState<number>(7);

  useEffect(() => {
    /*limits the grid items based on screen size*/
    const update = () => {
      const w = window.innerWidth;
      // if (w >= 1024) setMaxProjects(4 * 2 - 1);
      // else if (w >= 768) setMaxProjects(3 * 2 - 1);
      if (w >= 1024) setMaxProjects(7);
      else if (w >= 768) setMaxProjects(5);
      // else if (w >= 480) setMaxProjects(3);
      else if (w >= 640) setMaxProjects(7);
      // else setMaxProjects(2 * 2 - 1);
      // else setMaxProjects(4 * 2 - 1);
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
        "glass",
        "glass-gray",
        // "borderless",
        "gap-1",
        "h-50",
        "md:h-full",
        className,
        "",
        "",
      )}
    >
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
          "grid-cols-3",
          "sm:grid-cols-4",
          // "grid-rows-2",
          // "grid-cols-3",
          // "xs:grid-cols-4",
          // "grid-cols-2",
          "md:grid-cols-3",
          "lg:grid-cols-4",
          "",
        )}
      >
        {projects.slice(0, maxProjects).map((project: ProjectItem) => (
          <Link
            href={project.url}
            key={project.id}
            id={`${project.id} url-redirect`}
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
                // "glass",
                // "glass-upper",
                // "bg-glass-gray-2",

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
                    "group-hover:text-white",

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
                  "text-accent-foreground/80",
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

        <Link id="github url-redirect" href="./portfolio" className="contents">
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
            <Card.Header
              // className={cn(
              //   "text-xl",
              //   "font-semibold",
              //   "text-accent-foreground/80",
              //   "group-hover:text-white",
              //   "w-fit",
              //   "h-full",
              //   "opacity-60",
              //   "group-hover:opacity-100",
              //   "group-hover:text-white",
              //   "",
              //   "",
              // )}
              className={cn(
                "text-xl",
                "font-semibold",
                "text-accent-foreground/80",
                "group-hover:text-white",
                "w-fit",
                "h-fit",
                // "place-self-end",
                // "mt-auto",
                "pt-3",
                "opacity-60",
                "group-hover:opacity-100",
                "group-hover:text-white",

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
                "text-accent-foreground/80",
                "group-hover:text-white",
                "",
              )}
            >
              See all
            </Card.Content>
          </Card>
        </Link>
      </Card>
    </Card>
  );
}
