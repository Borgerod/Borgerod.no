"use client";
import { Card, Chip, cn, LinkIcon } from "@heroui/react";
import { ComponentBaseProps } from "@/lib/types";
import Link from "next/link";
export default function RepoRef({ className }: ComponentBaseProps) {
  return (
    <Card
      className={cn(
        // position
        "md:left-5",
        "md:bottom-5",
        "md:z-10",
        "pointer-events-auto",

        // MOBILE
        "flex-row",
        "w-full",
        "items-center",
        "unset-card",
        "unset-glass",
        "bg-transparent",
        "border-none",
        "shadow-none",
        "backdrop-filter-none",
        "outline-none",

        // IPAD
        "sm:glass",
        "sm:glass-black",
        "sm:card",

        // DESKTOP
        "md:w-fit",
        "md:unset-card",
        "md:unset-glass",
        "md:bg-transparent",
        "md:border-none",
        "md:shadow-none",
        "md:backdrop-filter-none",
        "md:outline-none",
        "md:flex",
        "md:fixed",

        "",
        "",
        className,
      )}
    >
      <Card.Header className="text-accent-foreground-muted">
        Check out the project
      </Card.Header>
      <Card.Content
        className={cn(
          "flex flex-row",
          "gap-5",
          "justify-end",
          "sm:justify-end",
          "md:justify-start",
          "",
          "",
        )}
      >
        <Link
          href={
            "https://www.figma.com/proto/dZKNNG3wQZE5HT7eX24oRU/Business-card?node-id=31-1813&t=krSgU4GTxJLkC5By-1"
          }
        >
          <Chip
            size="lg"
            id={`Figma redirect`}
            className={cn(
              "items-center",
              "justify-center",
              "select-none",
              "font-light",
              "md:bg-glass-green-base md:hover:bg-glass-green-base-hover",
              "bg-glass-gray-light hover:bg-glass-gray-dark",
              "text-accent-foreground",
              "text-shadow-accent-soft-hover",
              "",
            )}
          >
            <Chip.Label className="flex items-center text-center gap-1 p-0">
              <span className="text-nowrap">Figma</span>
              <LinkIcon className="size-2.5 " />
            </Chip.Label>
          </Chip>
        </Link>
        <Link href={"https://github.com/Borgerod/Borgerod.github.io"}>
          <Chip
            size="lg"
            id={`github redirect`}
            className={cn(
              "items-center",
              "justify-center",
              "select-none",
              "font-light",
              "md:bg-glass-green-base md:hover:bg-glass-green-base-hover",
              "bg-glass-gray-light hover:bg-glass-gray-dark",
              "text-accent-foreground",
              "text-shadow-accent-soft-hover",
              "",
            )}
          >
            <Chip.Label className="flex items-center text-center gap-1 p-0">
              <span className="text-nowrap">GitHub</span>
              <LinkIcon className="size-2.5 " />
            </Chip.Label>
          </Chip>
        </Link>
      </Card.Content>
    </Card>
  );
}
