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
        "glass",
        "glass-gray",
        "gap-1",
        "h-50",
        "md:h-full",
        className,
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
          ////* grid
          "grid",
          "grid-cols-3",
          "sm:grid-cols-4",
          "md:grid-cols-3",
          "lg:grid-cols-4",
          "bg-glass-gray/10",
          "drop-shadow-sm",
          "shadow-md",
        )}
      >
        {projects.slice(0, maxProjects).map((project: ProjectItem) => (
          <Link
            id={`${project.id} portfolio-grid-button url-redirect portfolio-page-route`}
            href={project.url}
            key={project.id}
            className={cn(
              "h-full",
              "w-full",
              "font-light",
              "p-2",
              "gap-0",
              "rounded-none",
              "group",
              "bg-transparent",
              "hover:shadow-md",
              "shadow-md",
              "bg-glass-gray-light-2",
              "hover:bg-glass-gray-light-2-hover",
              "grid",
              "grid-rows-2",
              "",
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card className="contents">
              <Card.Header
                className={cn(
                  "max-w-7",
                  "min-w-5",
                  "relative",
                  "h-5",
                  "w-full",
                  "place-self-center",
                  "",
                  "",
                )}
              >
                <Image
                  src={project.icon}
                  alt={project.alt}
                  sizes="64px"
                  fill
                  className={cn(
                    "object-contain",
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
          className={cn(
            "h-full",
            "w-full",
            "font-light",
            "p-2",
            "gap-0",
            "rounded-none",
            "group",
            "bg-transparent",
            "shadow-md",
            "hover:shadow-md",
            "shadow-sm",
            "drop-shadow-sm",
            "shadow shadow-1",
            "bg-glass-gray-light-2",
            "hover:bg-glass-gray-light-2-hover",
            "grid",
            "grid-rows-2",
            "",
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Card className="contents">
            <Card.Header
              className={cn(
                "h-5",
                "max-w-7",
                "min-w-5",
                "aspect-auto",
                "place-self-center",
                // deviates from sibling:
                "self-end",
                "text-xl",
                "font-semibold",
                "text-accent-foreground-muted",
                "group-hover:text-accent-foreground",
                "opacity-60",
                "group-hover:opacity-100",
                "group-hover:text-accent-foreground",
              )}
            >
              <IoIosMore />
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
              See all
            </Card.Content>
          </Card>
        </Link>
      </Card.Content>
    </Card>
  );
}
