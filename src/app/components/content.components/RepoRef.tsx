"use client";
import { Avatar, Button, Card, cn } from "@heroui/react";
import { useRouter } from "next/navigation";
import CallMeButton from "./CallMeButton";
import { ComponentBaseProps } from "@/lib/types";
import Link from "next/link";
export default function RepoRef({ className }: ComponentBaseProps) {
  return (
    <Card>
      <Card.Header>Check out the project</Card.Header>
      <Card.Content>
        <Link
          href={
            "https://www.figma.com/proto/dZKNNG3wQZE5HT7eX24oRU/Business-card?node-id=31-1813&t=krSgU4GTxJLkC5By-1"
          }
        >
          <Button
            id="email-button"
            type="button"
            isIconOnly
            className={cn(
              "bg-glass-gray-dark hover:bg-glass-gray-dark-hover",
              "text-accent-foreground", //*due to the thin weight, the color of "text-accent-foreground" visually looks identical to "text-accent-foreground-muted"
              "text-sm!",
              "font-light",
              "lg:text-base lg:w-full lg:h-full",
              "lg:min-w-none",
              "lg:min-h-none",
              "lg:aspect-auto",
              "h-full",
              "w-fit",
              "min-w-7",
              "min-h-7",
              "aspect-square",
              "p-2",
              "xl:px-auto",
              "text-base lg:w-full lg:h-full",
              "xl:w-full! xl:min-w-0",
              "min-w-none",
              "min-h-none",
              "aspect-auto",
              "w-full",
              "",
              "",
            )}
          >
            Figma
          </Button>
        </Link>
        <Link href={"https://github.com/Borgerod/Borgerod.github.io"}>
          <Button
            id="email-button"
            type="button"
            isIconOnly
            className={cn(
              "bg-glass-gray-dark hover:bg-glass-gray-dark-hover",
              "text-accent-foreground", //*due to the thin weight, the color of "text-accent-foreground" visually looks identical to "text-accent-foreground-muted"
              "text-sm!",
              "font-light",
              "lg:text-base lg:w-full lg:h-full",
              "lg:min-w-none",
              "lg:min-h-none",
              "lg:aspect-auto",
              "h-full",
              "w-fit",
              "min-w-7",
              "min-h-7",
              "aspect-square",
              "p-2",
              "xl:px-auto",
              "text-base lg:w-full lg:h-full",
              "xl:w-full! xl:min-w-0",
              "min-w-none",
              "min-h-none",
              "aspect-auto",
              "w-full",
              "",
              "",
            )}
          >
            GitHub
          </Button>
        </Link>
      </Card.Content>
    </Card>
  );
}
