import { ComponentBaseProps } from "@/lib/types";
import { cn } from "@heroui/react";
import { Button, Card, Separator } from "@heroui/react";
import { SiLeetcode } from "react-icons/si";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import { TbBrandGithubFilled } from "react-icons/tb";

export default function COMPONENTNAME({ className }: ComponentBaseProps) {
  return (
    <Card
      id="social-links"
      className={cn(
        "glass",
        "glass-black",
        "text-accent-foreground",
        "h-full",
        "w-full",
        "sm:max-w-fit",
        "flex",
        "flex-col",
        "sm:flex-col",
        "justify-between",
        "sm:justify-evenly",
        "sm:justify-around",
        "sm:gap-5",
        "",
        className,
      )}
    >
      <Card.Header>
        <Card.Title className="text-accent-foreground/80 sm:self-center">
          Links
        </Card.Title>
        <Separator variant="secondary" className="pb-0 sm:hidden" />
      </Card.Header>
      <Card.Content
        className={cn(
          "sm:contents",
          "flex flex-row",
          "justify-around",
          "justify-between",
          "",
          "",
        )}
      >
        <Button
          isIconOnly
          size="lg"
          variant="primary"
          className={"bg-glass-light-gray hover:bg-glass-gray-dark"}
        >
          <Link
            href={"https://www.linkedin.com/in/borgerod/"}
            className="h-full w-full content-center justify-items-center"
          >
            <FaLinkedinIn />
          </Link>
        </Button>
        <Button
          isIconOnly
          size="lg"
          variant="primary"
          className={"bg-glass-light-gray hover:bg-glass-gray-dark "}
        >
          <Link
            href={"https://www.facebook.com/aleksander.borgerod/"}
            className="h-full w-full content-center justify-items-center"
          >
            <FaFacebookF className="size-5" />
          </Link>
        </Button>
        <Button
          isIconOnly
          size="lg"
          variant="primary"
          className={"bg-glass-light-gray hover:bg-glass-gray-dark "}
        >
          <Link
            href={"http://github.com/Borgerod"}
            className="h-full w-full content-center justify-items-center"
          >
            <TbBrandGithubFilled className="size-5" />
          </Link>
        </Button>
        <Button
          isIconOnly
          size="lg"
          variant="primary"
          className={"bg-glass-light-gray hover:bg-glass-gray-dark "}
        >
          <Link
            href={"https://leetcode.com/u/Borgerod/"}
            className="h-full w-full content-center justify-items-center"
          >
            <SiLeetcode className="size-5" />
          </Link>
        </Button>
      </Card.Content>
    </Card>
  );
}
