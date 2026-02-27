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
      className={cn(
        "glass",
        "glass-gray",

        className,
        "",
        "",
      )}
    >
      <h2 className="text-accent-foreground"> Project portfolio </h2>
      <Separator />

      <Card
        className={cn(
          "grid",
          "grid-rows-2",
          "grid-cols-4",

          "",
          "",
        )}
      >
        {projects.slice(0, 7).map((project: ProjectButton) => (
          <div
            key={project.id}
            id={project.id}
            className={cn("font-light px-2 py-0", "", "")}
          >
            <Image src={project.icon} alt={"project-icon"} />
            <p className="text-sm">{project.name}</p>
          </div>
        ))}
        <div>
          <Link href="./projects">see more..</Link>
        </div>
      </Card>
    </Card>
  );
}
